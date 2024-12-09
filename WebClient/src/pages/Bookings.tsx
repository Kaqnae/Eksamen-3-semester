import React, { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import BookingService from "../service/BookingService";
import { Booking } from "../model/Booking";

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleItemClick = (item: Booking) => {
    setSelectedBooking(item);
  };

  const handleDelete = async () => {
    if (selectedBooking) {
      try {
        const deleteSuccess = await BookingService.deleteBooking(selectedBooking.id);
        if (deleteSuccess) {
          alert("Booking deleted successfully!")
          setBookings((prev) => prev.filter((booking) => booking.id !== selectedBooking.id))
          setSelectedBooking(null);
          setError(null);
        }
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      setError("No booking selected for deletion")
    }
  }

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
          {selectedBooking ? (
            <>
              <h2>Booking Details</h2>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedBooking.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedBooking.startTime} - {selectedBooking.endTime}
              </p>
              <p>
                <strong>Resource ID:</strong> {selectedBooking.resourceId || "N/A"}
              </p>
              <button onClick={handleDelete} className="delete-button">
                Delete Booking
              </button>
            </>
          ) : (
            <p>Select a booking to see details</p>
          )}
          {error && (<p>{error}</p> )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
