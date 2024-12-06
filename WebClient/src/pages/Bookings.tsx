import React, { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import Drawing from "../assets/tegning.jpg";
import BookingService from "../service/BookingService";

interface Booking {
  id: string;
  userId: string;
  resourceId: string;
  date: number;
  startTime: string;
  endTime: string;
  active: boolean;
}

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleItemClick = () => {
    console.log("Clicked");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingData = await BookingService.fetchBookings();
        setBookings(bookingData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchBookings();
  });

  return (
    <>
      <TopBar></TopBar>
      <div className="dashboard-container">
        <div className="left-sidebar">
          <List
            items={bookings.map((booking) => booking.date)}
            onItemClick={handleItemClick}
            renderItem={(item) => <span>{item}</span>}
          ></List>
        </div>
        <div className="main-content">
          <img src={Drawing} />
          <button className="book-button">Book</button>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
