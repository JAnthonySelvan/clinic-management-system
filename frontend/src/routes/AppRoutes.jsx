import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";

import ProtectedRoute from "../components/ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import PublicDoctors from "../pages/public/Doctors";
import Appointment from "../pages/public/Appointment";
import Contact from "../pages/public/Contact";

// Auth Pages
import AdminLogin from "../pages/auth/AdminLogin";
import DoctorLogin from "../pages/auth/DoctorLogin";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Appointments from "../pages/admin/Appointments";
import Messages from "../pages/admin/Messages";
import AddDoctor from "../pages/admin/AddDoctor";
import EditDoctor from "../pages/admin/EditDoctor";

// Doctor Pages
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAppointments from "../pages/doctor/DoctorAppointments";
import DoctorProfile from "../pages/doctor/DoctorProfile";
import DoctorSettings from "../pages/doctor/DoctorSettings";

// Others
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<PublicDoctors />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Login Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="doctors/edit/:id" element={<EditDoctor />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="doctors/add" element={<AddDoctor />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* Doctor Protected Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="settings" element={<DoctorSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
