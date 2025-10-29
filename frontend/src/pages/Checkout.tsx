import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/attachment.png";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const booking = state?.booking;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);

  if (!booking) {
    return (
      <div className="text-center py-10 text-gray-600">
        No booking details found. Please select an experience again.
      </div>
    );
  }

  const { experience, date, time, quantity, subtotal, taxes, total } = booking;

  // 🧾 Apply promo code
 const handleApplyPromo = async () => {
  if (!promoCode) {
    alert("Please enter a promo code before applying.");
    return;
  }

  try {
    setApplying(true);
    const response = await axios.post("http://localhost:5000/api/promo/validate", {
      code: promoCode,
      amount: total,
    });

    const data = response.data;
   
      setDiscountedTotal(data.finalAmount);
      alert(`Promo applied successfully! 🎉 You saved ₹${(total - data.finalAmount).toFixed(2)}`);
    
  } catch (error) {
    console.error("Error applying promo code:", error);
    alert("Something went wrong while applying the promo code.");
  } finally {
    setApplying(false);
  }
};


  // 💳 Handle Pay & Confirm
  const handlePayment = async () => {
    if (!name || !email) {
      alert("Please enter your name and email before confirming.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/bookings", {
        experienceId: experience._id,
        name,
        email,
        date,
        time,
        quantity,
        promoCode,
      });

      if (response.status === 201) {
        navigate("/confirmation", {
          state: {
            bookingRef: response.data.bookingRef,
            totalAmount: response.data.totalAmount,
          },
        });
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Something went wrong while confirming your booking.");
    } finally {
      setLoading(false);
    }
  };

  const displayTotal = discountedTotal ?? total;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-3 shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto mb-3 sm:mb-0">
          <img
            src={logo}
            alt="BookIt Logo"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
          />
        </div>

        <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto space-x-2 sm:space-x-3">
          <input
            type="text"
            placeholder="Search experiences"
            className="border border-gray-300 rounded-sm px-3 py-2 w-52 sm:w-80 outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 text-sm"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-sm transition text-sm whitespace-nowrap">
            Search
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 px-6 sm:px-10 md:px-16 lg:px-24 py-10">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 font-medium flex items-center"
          >
            ← Checkout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl p-6 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <input
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
              <button
                onClick={handleApplyPromo}
                disabled={applying}
                className={`${
                  applying ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                } text-white px-5 py-2 rounded-lg`}
              >
                {applying ? "Checking..." : "Apply"}
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              <p className="text-sm text-gray-600">
                I agree to the terms and safety policy
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-3">Booking Summary</h2>

            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>Experience</span>
                <span>{experience.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between">
                <span>Qty</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-lg font-semibold">
              <span>Total</span>
              <span>₹{displayTotal}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full mt-6 ${
                loading ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
              } py-2 rounded-lg font-medium`}
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
