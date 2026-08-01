import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ChatWidget from "../components/HealthAssistant/ChatWidget";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />

      <ChatWidget />
    </>
  );
}

export default PublicLayout;
