import LoginForm from "./Login/LoginPage";
import Dashboard from "./Dashboard/DashboardPage";
import ProfilePage from "./Dashboard/Profile/ProfilePage";
import BookingsPage from "../Components/Dashboard/BookingPage/Bookings";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profilepage" element={<ProfilePage />}></Route>
        <Route path="/bookings" element={<BookingsPage />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
