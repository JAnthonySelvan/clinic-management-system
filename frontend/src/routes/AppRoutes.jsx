import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

// Import pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import Appointment from "../pages/public/Appointment";
import Contact from "../pages/public/Contact";
import AdminLogin from "../pages/auth/AdminLogin";
import DoctorLogin from "../pages/auth/DoctorLogin";
import NotFound from "../pages/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Appointments from "../pages/admin/Appointments";
import Messages from "../pages/admin/Messages";
import AddDoctor from "../pages/admin/AddDoctor";
import DoctorLayout from "../layouts/DoctorLayout";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAppointments from "../pages/doctor/DoctorAppointments";
import DoctorProfile from "../pages/doctor/DoctorProfile";
import DoctorSettings from "../pages/doctor/DoctorSettings";
function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="messages" element={<Messages />} />
      </Route>
      <Route path="/admin/doctors/add" element={<AddDoctor />} />

      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="settings" element={<DoctorSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
