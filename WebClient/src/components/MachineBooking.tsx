import React, { useState, useEffect } from "react";
import BookingService from "../service/BookingService";
import { Resource } from "../model/Resource";
import { Institution } from "../model/Institution";
import InstitutionService from "../service/InstitutionService";
import List from "./List";
import ResourceService from "../service/ResourceService";
import "../styles/booking.css"


const MakeBooking = ({
  instituionId,
  resourceId,
  
}: {
  instituionId: string;
  resourceId: string;
  
}) => {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [resourceDesc, setResourceDesc] = useState<string | null>(null);
  const [intervals, setIntervals] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchInstitutionDetails = async () => {
      try {
        const data = await InstitutionService.fetchInstitution(instituionId);
        setInstitution(data);

        const { openTime, closeTime, bookingInterval } = data;
        const interval = generateTimeIntervals(openTime, closeTime, bookingInterval);
        setIntervals(interval);

        const resourceDetails = await ResourceService.fetchResourceDescription(resourceId);
        setResourceDesc(resourceDetails);
      } catch (error) {
        console.error("Error fetching institution detuals:", error);
      }
    };
    fetchInstitutionDetails();
  }, [instituionId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await new BookingService().fetchBookingByResource(resourceId);
        setBookings(data);
      }catch(error){
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [resourceId]);

  const generateTimeIntervals = (
    openTime: string,
    closeTime: string,
    interval: number
  ) => {
    const intervals: string[] = [];
    const today = new Date().toISOString().split("T")[0];
    let current = new Date(`${today}T${openTime}:00`);
    const end = new Date(`${today}T${closeTime}:00`);

    while (current < end) {
      intervals.push(current.toTimeString().slice(0, 5));
      current = new Date(current.getTime() + interval * 60000);
    }

    return intervals;
  };

  const generateDateOptions = () => {
    const dateOptions = [];
    const today = new Date();
    for(let i = 0; i < 7; i++){
      const dates = new Date(today);
      dates.setDate(today.getDate() + i);
      dateOptions.push(dates.toISOString().split("T")[0])
    }
    return dateOptions;
  }

  const handleBooking = async () => {
    try {
      await new BookingService().createBooking(
        resourceId,
        date,
        selectedStartTime,
        selectedEndTime,
      );
      alert("Booking created succesfully");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking");
    }
  };

  return (
    <div>
      <h2>Booking at {institution?.name}</h2>
      <h3>Description:</h3>
      <p>{resourceDesc}</p>
      {institution?.imageUrl && (
        <img
          src={institution.imageUrl}
          alt={institution.name}
          width="200"
        ></img>
      )}

      <label>
        Date:
        <select className="select" value={date} onChange={(e) => setDate(e.target.value)}>
        {generateDateOptions().map((d, index) => (
            <option key={index} value={d}>
              {new Date(d).toLocaleDateString()}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Time:
        <select className="select" value={selectedStartTime} onChange={(e) => setSelectedStartTime(e.target.value)}>
            <option value="" disabled>
                Select start time
            </option>
            {intervals.map((interval, index) => (
            <option key={index} value={interval}>
              {interval}
            </option>
          ))}
        </select>
      </label>
      <label>
        End Time:
        <select className="select" value={selectedEndTime} onChange={(e) => setSelectedEndTime(e.target.value)}>
            <option value="" disabled>
                Select end time
            </option>
            {intervals
            .filter((interval) => interval > selectedStartTime)
            .map((interval, index) => (
              <option key={index} value={interval}>
                {interval}
              </option>
            ))}
        </select>
      </label>
      <button onClick={handleBooking}>Book</button>
      <h3>Existing Bookings:</h3>
      {bookings.length > 0 ? (
      <List
        items={bookings}
        renderItem={(booking) => (
          <div>
            <strong>Date:</strong> {booking.date} -{" "}
            <strong>Time:</strong> {booking.startTime} to {booking.endTime}
          </div>
        )}
      />
    ) : (
      <p>No bookings found for this resource</p>
    )}
    </div>
  );
};

export default MakeBooking;
