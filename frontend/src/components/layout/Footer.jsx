import { Link } from "react-router-dom";
import { SITE_LOGO } from "../../constants/images";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#253237] text-[#E0FBFC]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Clinic Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={SITE_LOGO}
                alt="SavioursClinic Logo"
                className="h-10 w-10 rounded-xl object-cover border border-white/20"
              />
              <h2 className="text-3xl font-bold tracking-tight text-white">Saviours<span className="text-[#9DB4C0]">Clinic</span></h2>
            </div>

            <p className="mt-4 leading-7 text-[#C2DFE3]">
              Providing trusted healthcare with experienced doctors, advanced
              facilities, and compassionate patient care.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-[#5C6B73] p-3 transition hover:bg-[#9DB4C0]"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full bg-[#5C6B73] p-3 transition hover:bg-[#9DB4C0]"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-full bg-[#5C6B73] p-3 transition hover:bg-[#9DB4C0]"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="rounded-full bg-[#5C6B73] p-3 transition hover:bg-[#9DB4C0]"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/doctors">Doctors</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/my-appointments">My Appointments</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Services</h3>

            <ul className="space-y-3">
              <li>Cardiology</li>
              <li>Neurology</li>
              <li>Dental Care</li>
              <li>Pediatrics</li>
              <li>General Medicine</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">Contact Us</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1" />
                <span>info@savioursclinic.com</span>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1" />
                <span>Madurai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#5C6B73] pt-8 text-center text-[#C2DFE3]">
          © {new Date().getFullYear()} Saviours Clinic. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;