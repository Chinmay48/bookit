import React from "react";
import logo from "../assets/attachment.png";

interface NavbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ search, setSearch, onSearch }) => {
  return (
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-sm px-3 py-2 w-44 sm:w-80 outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 text-sm"
        />
        <button
          onClick={onSearch}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-sm transition text-sm whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
