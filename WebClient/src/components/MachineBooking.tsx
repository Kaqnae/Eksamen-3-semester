import React, { useState, useEffect } from "react";
import BookingService from "../service/BookingService";
import {
  generateTimeIntervals,
  isOverlapping,
  generateDateOptions,
} from "../utils/timeUtils";
import { Institution } from "../model/Institution";
import InstitutionService from "../service/InstitutionService";
import List from "./List";
import ResourceService from "../service/ResourceService";
import "../styles/booking.css";
import ErrorReport from "./MakeErrorReport";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import { fetchInstitutionWithIntervals } from "../utils/institutionUtils";
import { fetchResourceDesc } from "../utils/resourceUtils";
import { createBooking, FetchBookingResource } from "../utils/bookingUtils";
import { calculateAvailableEndTimes, calculateAvailableStartTimes } from "../utils/timeAvailabilityUtils";

const MakeBooking = ({
  instituionId,
  resourceId,
  onErrorReported,
}: {
  instituionId: string;
  resourceId: string;
  onErrorReported: () => void;
}) => {
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

  const handleOpenModel = () => {
    setIsModelOpen(true);
    setShowBookings(false);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setShowBookings(true);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const {institution, intervals} = await fetchInstitutionWithIntervals(instituionId);
        setInstitution(institution);
        setIntervals(intervals);
      }catch(error){
        console.error("Error fetching institution details: ", error)
      }
    };
    fetchDetails();
  }, [instituionId]);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const description = await fetchResourceDesc(resourceId);
        setResourceDesc(description);
      } catch (error) {
        console.error("Error fetching resource description:", error);
      }
    };
    fetchDescription();
  }, [resourceId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await FetchBookingResource(resourceId, date);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [resourceId, date]);

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

  const availableStartTimes = intervals.filter((interval) => {
    return !bookings.some((booking) =>
      isOverlapping(interval, interval, [
        { date: date, startTime: booking.startTime, endTime: booking.endTime },
      ])
    );
  });

  useEffect(() => {
    if (selectedStartTime) {
      const newAvailableEndTimes = availableEndTimes();
      setSelectedEndTime(newAvailableEndTimes[0] || "");
    }
  }, [selectedStartTime, bookings, intervals]);

  useEffect(() => {
    if (selectedStartTime) {
      const newAvailableEndTimes = availableEndTimes();
      if(!newAvailableEndTimes.includes(selectedEndTime)){
        setSelectedEndTime(newAvailableEndTimes[0] || "");
      }
    }
  }, [selectedStartTime, bookings, intervals]);

  useEffect(() => {
    setSelectedStartTime("");
    setSelectedEndTime("");
  }, [date]);

  const handleBooking = async () => {
    try{
      await createBooking(resourceId, date, selectedStartTime, selectedEndTime, bookings);
      alert("Booking created successfully");

      const updatedBookings = await FetchBookingResource(resourceId, date);
      setBookings(updatedBookings);
    }catch(error: any){
      console.error("Error creating booking:", error);
      alert(error.message || "Failed to create booking");
    }
  };

  return (
    <div>
      {institution?.imageUrl && (
        <img
          src={institution.imageUrl}
          alt={institution.name}
          width="200"
        ></img>
      )}
      <h2>Booking at {institution?.name}</h2>
      <h3>Description:</h3>
      <p>{resourceDesc}</p>
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
