import React, { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import Drawing from "../assets/tegning.jpg";
import BookingService from "../service/BookingService";
import { Booking } from "../model/Booking";

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleItemClick = (item: Booking) => {
    console.log("Clicked:", item);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingData = await BookingService.getBookings();
        setBookings(bookingData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <div className="dashboard-container">
        <div className="left-sidebar">
          <List
            items={bookings}  
            onItemClick={handleItemClick}  
            renderItem={(booking: Booking) => (
            <span>
              {new Date(booking.date).toLocaleDateString()}  {booking.startTime} - {booking.endTime}
            </span>
        )}
      />
        </div>
        <div className="main-content">
          <div className="form-group">
            <label htmlFor="name">Name</label>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
