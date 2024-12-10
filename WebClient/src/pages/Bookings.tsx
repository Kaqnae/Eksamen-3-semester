import { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import BookingService from "../service/BookingService";
import { Booking } from "../model/Booking";

const Dashboard = () => {
  // State to store the list of bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  // State to store the currently selected booking
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  // State to store error messages
  const [error, setError] = useState<string | null>(null);

  // Handle click event when a booking is selected from the list
  const handleItemClick = (item: Booking) => {
    setSelectedBooking(item); // Set the selected booking in the state
  };

  // Handle the deletion of a selected booking
  const handleDelete = async () => {
    if (selectedBooking) {
      try {
        // Call the BookingService to delete the booking
        const deleteSuccess = await new BookingService().deleteBooking(selectedBooking.id);
        if (deleteSuccess) {
          alert("Booking deleted successfully!");
          // Update the bookings list by removing the deleted booking
          setBookings((prev) => prev.filter((booking) => booking.id !== selectedBooking.id));
          setSelectedBooking(null); // Clear the selected booking
          setError(null); // Clear any existing error messages
        }
      } catch (error: any) {
        setError(error.message); // Set an error message if deletion fails
      }
    } else {
      setError("No booking selected for deletion"); // Show an error if no booking is selected
    }
  };

  // Fetch bookings when the component is mounted
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Call the BookingService to fetch pending bookings
        const bookingData = await new BookingService().getBookings();
        setBookings(bookingData); // Update the bookings state with the fetched data
      } catch (error: any) {
        setError(error.message); // Set an error message if fetching fails
      }
    };

    fetchBookings(); // Trigger fetching bookings on component mount
  }, []);

  return (
    <>
      {/* Render the top navigation bar */}
      <TopBar></TopBar>
      <div className="dashboard-container">
        {/* Left sidebar containing the list of bookings */}
        <div className="left-sidebar">
          <List
            items={bookings} // Pass the bookings array to the List component
            onItemClick={handleItemClick} // Set the click handler for selecting a booking
            renderItem={(booking: Booking) => (
              <span>
                {/* Format and display the booking date and time */}
                {new Date(booking.date).toLocaleDateString()} {booking.startTime} - {booking.endTime}
              </span>
            )}
          />
        </div>
        {/* Main content area */}
        <div className="main-content">
          {selectedBooking ? (
            <>
              {/* Display details of the selected booking */}
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
              {/* Button to delete the selected booking */}
              <button onClick={handleDelete} className="delete-button">
                Delete Booking
              </button>
            </>
          ) : (
            // Message prompting the user to select a booking
            <p>Select a booking to see details</p>
          )}
          {/* Display any error messages */}
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;