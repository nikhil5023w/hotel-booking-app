import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import MyBookings from "./Pages/MyBookings.jsx";
import RoomDetails from "./Pages/BookingPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import PaymentCancel from "./Pages/PaymentCancel.jsx";
import AdminAnalytics from "./Pages/admin/Analytics/AdminAnalytics.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Profile from "./Pages/Profile.jsx";
import AdminGuests from "./Pages/AdminGuests.jsx";
import Rooms from "./Pages/Rooms.jsx";
import AdminRooms from "./Pages/admin/rooms/AdminRooms.jsx";
import RoomPreview from "./Components/rooms/RoomPreview.jsx";
import Contact from "./Pages/Contact.jsx";

import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ChangePassword from "./Pages/ChangePassword.jsx";
import VerifyEmail from "./Pages/VerifyEmail.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import CheckEmail from "./Pages/CheckEmail.jsx";

function Layout() {
  const location = useLocation();

  const hideFooterRoutes = ["/dashboard"];

  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/check-email" element={<CheckEmail />} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/analytics" element={<AdminAnalytics />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} />
          <Route
            path="rooms"
            element={
              <ProtectedRoute adminOnly>
                <AdminRooms />
              </ProtectedRoute>
            }
          />
          <Route path="bookings" element={<MyBookings />} />
          <Route
            path="analytics"
            element={
              <ProtectedRoute adminOnly>
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="guests"
            element={
              <ProtectedRoute adminOnly>
                <AdminGuests />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/room-preview/:id" element={<RoomPreview />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
      </Routes>

      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
