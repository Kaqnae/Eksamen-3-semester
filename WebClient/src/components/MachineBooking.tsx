import React, { useState, useEffect } from "react";
import {
  generateTimeIntervals,
  isOverlapping,
  generateDateOptions,
} from "../utils/timeUtils";
import { Institution } from "../model/Institution";
import { Resource, ResourceDetails } from "../model/Resource";
import List from "./List";
import "../styles/booking.css";
import ResourcePicture from "../assets/Monoblock-2.jpg";
import ErrorReport from "./MakeErrorReport";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import { fetchInstitutionWithIntervals } from "../utils/institutionUtils";
import { fetchResourceDetails } from "../utils/resourceUtils";
import { createBooking, fetchBookingResource } from "../utils/bookingUtils";
import {
  calculateAvailableEndTimes,
  calculateAvailableStartTimes,
} from "../utils/timeAvailabilityUtils";

const MakeBooking = ({
  instituionId,
  resourceId,
  onErrorReported,
}: {
  instituionId: string;
  resourceId: string;
  onErrorReported: () => void;
}) => {
  // State management
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [resourceDesc, setResourceDesc] = useState<string | null>(null);
  const [intervals, setIntervals] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [showBookings, setShowBookings] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [resources, setResources] = useState<ResourceDetails | null>(null);

  // Functions to toggle model visibility
  const handleOpenModel = () => {
    setIsModelOpen(true);
    setShowBookings(false);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setShowBookings(true);
  };

  // Fetch institution and intervals
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { institution, intervals } = await fetchInstitutionWithIntervals(
          instituionId
        );
        setInstitution(institution);
        setIntervals(intervals);
      } catch (error) {
        console.error("Error fetching institution details: ", error);
      }
    };
    fetchDetails();
  }, [instituionId]);

  // Fetch resource details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { imageUrl, description } = await fetchResourceDetails(
          resourceId
        );
        setResources({ imageUrl, description });
      } catch (error) {
        console.error("Error fetching resource description:", error);
      }
    };
    fetchDetails();
  }, [resourceId]);

  // Fetch bookings whenever the resource ID or date changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetchBookingResource(resourceId, date);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [resourceId, date]);

  // Filter available end times based on selected start time and existing bookings
  const availableEndTimes = () => {
    if (!selectedStartTime) {
      return intervals.filter(
        (interval) =>
          !bookings.some((booking) =>
            isOverlapping(selectedStartTime, interval, [
              {
                date: date,
                startTime: booking.startTime,
                endTime: booking.endTime,
              },
            ])
          )
      );
    }

    return intervals.filter(
      (interval) =>
        interval > selectedStartTime &&
        !isOverlapping(selectedStartTime, interval, bookings)
    );
  };

  // Filter available start times based on existing bookings
  const availableStartTimes = intervals.filter((interval) => {
    return !bookings.some((booking) =>
      isOverlapping(interval, interval, [
        { date: date, startTime: booking.startTime, endTime: booking.endTime },
      ])
    );
  });

  // Update available end times when start time changes
  useEffect(() => {
    if (selectedStartTime) {
      const newAvailableEndTimes = availableEndTimes();
      setSelectedEndTime(newAvailableEndTimes[0] || "");
    }
  }, [selectedStartTime, bookings, intervals]);

  // Adjust selected end time if it's no longer available
  useEffect(() => {
    if (selectedStartTime) {
      const newAvailableEndTimes = availableEndTimes();
      if (!newAvailableEndTimes.includes(selectedEndTime)) {
        setSelectedEndTime(newAvailableEndTimes[0] || "");
      }
    }
  }, [selectedStartTime, bookings, intervals]);

  // Reset selected times when the date changes
  useEffect(() => {
    setSelectedStartTime("");
    setSelectedEndTime("");
  }, [date]);

  // Handle booking creation
  const handleBooking = async () => {
    // Validate that both start and end times are selected
    if (!selectedStartTime || !selectedEndTime) {
      alert("Please select both a start time and end time for your booking");
      return;
    }

    try {
      await createBooking(
        resourceId,
        date,
        selectedStartTime,
        selectedEndTime,
        bookings
      );
      alert("Booking created successfully");

      // Fetch updated bookings after a successful booking
      const updatedBookings = await fetchBookingResource(resourceId, date);
      setBookings(updatedBookings);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      alert(error.message || "Failed to create booking");
    }
  };

  return (
    <div>
      <img
        src={resources?.imageUrl || ResourcePicture}
        alt="Fallback image"
        width="300"
        onError={(e) => {
          // Replace the src with a fallback image if the original image fails to load
          (e.target as HTMLImageElement).src = ResourcePicture;
        }}
      />
      <h2>Booking at {institution?.name}</h2>
      <h3>Description:</h3>
      <p>{resources?.description}</p>
      <DateSelector
        label="Date"
        date={date}
        onDateChange={setDate}
        availableDates={generateDateOptions()}
      />
      <TimeSelector
        label="Start Time"
        time={selectedStartTime}
        onTimeChange={setSelectedStartTime}
        availableTimes={availableStartTimes}
      />
      <TimeSelector
        label="End Time"
        time={selectedEndTime}
        onTimeChange={setSelectedEndTime}
        availableTimes={availableEndTimes()}
      />
      <button className="book-button" onClick={handleBooking}>
        Book
      </button>
      <button className="error-report-button" onClick={handleOpenModel}>
        Report an issue
      </button>
      {isModelOpen && (
        <ErrorReport
          resourceId={resourceId}
          institutionId={instituionId}
          onClose={handleCloseModel}
          onErrorReported={onErrorReported}
        ></ErrorReport>
      )}
      {showBookings && (
        <>
          <h3>Existing Bookings:</h3>
          {bookings.length > 0 ? (
            <List
              items={bookings}
              renderItem={(booking) => (
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()} -{" "}
                  <strong>Time:</strong> {booking.startTime} to{" "}
                  {booking.endTime}
                </div>
              )}
              listClassName="existing-bookings"
            />
          ) : (
            <p>No bookings found for this resource</p>
          )}
        </>
      )}
    </div>
  );
};

export default MakeBooking;
