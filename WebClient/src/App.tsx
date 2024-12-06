import LoginForm from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import BookingsPage from "./pages/Bookings";
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
