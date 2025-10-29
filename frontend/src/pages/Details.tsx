import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/attachment.png";
interface Slot {
  time: string;
  seatsLeft: number;
  isSoldOut: boolean;
}

interface DateOption {
  date: string;
  slots: Slot[];
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  dates: DateOption[];
}

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get<Experience>(
          `https://bookit-yjux.onrender.com/api/experiences/${id}`
        );
        setExperience(res.data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id]);

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (!experience)
    return (
      <div className="text-center py-10 text-gray-600">
        Experience not found.
      </div>
    );

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    const booking = {
      experience,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      taxes,
      total,
    };

    navigate("/checkout", { state: { booking } });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-3 shadow-md bg-white sticky top-0 z-50">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="BookIt Logo"
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
          />
        </div>

        {/* Search Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <input
            type="text"
            placeholder="Search experiences"
            className="border border-gray-300 rounded-sm px-3 py-2 w-44 sm:w-80 outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 text-sm"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-sm transition text-sm whitespace-nowrap">
            Search
          </button>
        </div>
      </nav>
      {/* Image and Price Section */}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-10">
        {/* Left - Image */}
        <div className="w-full lg:w-3/5">
          <img
            src={experience.image}
            alt={experience.title}
            className="rounded-xl shadow-md w-full h-80 object-cover"
          />
          <h1 className="text-2xl font-semibold mt-6">{experience.title}</h1>
          <p className="text-gray-600 mt-2">{experience.description}</p>

          {/* Date & Time Selection */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h2 className="font-semibold mb-2">Choose date</h2>
            <div className="flex flex-wrap gap-2">
              {experience.dates && experience.dates.length > 0 ? (
                experience.dates.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`px-4 py-2 rounded-lg border-gray-600 ${
                      selectedDate === d.date
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {new Date(d.date).toDateString().slice(4, 10)}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No available dates</p>
              )}
            </div>

            <h2 className="font-semibold mt-4 mb-2">Choose time</h2>
            <div className="flex flex-wrap gap-2">
              {selectedDate ? (
                experience.dates
                  .find((d) => d.date === selectedDate)
                  ?.slots.map((s) => (
                    <button
                      key={s.time}
                      onClick={() => !s.isSoldOut && setSelectedTime(s.time)}
                      disabled={s.isSoldOut}
                      className={`px-4 py-2 rounded-lg border-gray-600 ${
                        s.isSoldOut
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : selectedTime === s.time
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {s.time}{" "}
                      {!s.isSoldOut && (
                        <span className="text-sm text-red-500 ml-1">
                          {s.seatsLeft} left
                        </span>
                      )}
                    </button>
                  ))
              ) : (
                <p className="text-gray-500 text-sm">Select a date first</p>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All times are in IST (GMT +5:30)
            </p>

            <div className="mt-6">
              <h2 className="font-semibold mb-1">About</h2>
              <p className="text-gray-600 text-sm">
                Scenic routes, trained guides, and safety briefing. Minimum age
                10.
              </p>
            </div>
          </div>
        </div>

        {/* Right - Price Summary */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:ml-10 bg-white shadow-md rounded-xl p-6 h-fit">
          <p className="text-gray-600">Starts at</p>
          <h2 className="text-2xl font-bold mb-4">₹{experience.price}</h2>

          <div className="flex items-center justify-between border-y border-gray-200 py-3">
            <span className="text-gray-700">Quantity</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-1 text-gray-700">
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
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={!selectedDate || !selectedTime}
            className={`w-full mt-5 py-2 rounded-md text-white font-medium ${
              !selectedDate || !selectedTime
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
