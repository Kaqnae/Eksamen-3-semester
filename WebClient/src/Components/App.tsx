import LoginForm from "./LoginPage";
import Dashboard from "./Dashboard";
import ProfilePage from "./ProfilePage";
import BookingsPage from "./Bookings";
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
