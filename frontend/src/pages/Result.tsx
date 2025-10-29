import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/attachment.png";
import { FaCircleCheck } from "react-icons/fa6";

const Confirmation: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bookingRef } = state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
  {/* ✅ Navbar */}
  <nav className="w-full flex flex-col sm:flex-row items-center sm:items-center justify-between px-6 sm:px-10 py-3 shadow-md bg-white sticky top-0 z-50 space-y-3 sm:space-y-0">
    
    {/* Logo Section */}
    <div className="flex justify-center sm:justify-start w-full sm:w-auto">
      <img
        src={logo}
        alt="BookIt Logo"
        className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
      />
    </div>

    {/* Search Section */}
    <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto space-x-2 sm:space-x-3">
      <input
        type="text"
        placeholder="Search experiences"
        className="border border-gray-300 rounded-sm px-3 py-2 w-56 sm:w-80 outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 text-sm"
      />
      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-sm transition text-sm whitespace-nowrap">
        Search
      </button>
    </div>
  </nav>

  {/* ✅ Booking Confirmation Section */}
  <div className="text-center mt-20">
    <FaCircleCheck className="text-green-500 w-16 h-16 mx-auto mb-6" />
    <h1 className="text-2xl font-semibold">Booking Confirmed</h1>
    <p className="text-gray-600 mt-2">Ref ID: {bookingRef}</p>

    <button
      onClick={() => navigate("/")}
      className="mt-6 bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
    >
      Back to Home
    </button>
  </div>
</div>

  );
};

export default Confirmation;
