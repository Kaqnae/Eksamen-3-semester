import React, { useEffect, useState } from "react";
import List from "../../General_Components/List";
import "../dashboard.css";
import TopBar from "../../General_Components/TopBar";
import Drawing from "../../../Images/tegning.jpg";
import BookingService from "../../Service/BookingService";

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