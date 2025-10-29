import React from "react";

interface CardProps {
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
  onViewDetails: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  location,
  description,
  price,
  image,
  onViewDetails,
}) => {
     const shortDescription =
    description.split(" ").slice(0, 15).join(" ") +
    (description.split(" ").length > 15 ? "..." : "");
  return (
    <div className="w-[280px] h-[312px]  bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 mx-10 flex flex-col">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="flex flex-col justify-between grow px-3 py-2">
        <div>
          <div className="flex justify-between items-center">
            <h5 className="font-semibold text-gray-800 text-sm">{title}</h5>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {location}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1 leading-tight">
            {shortDescription}
          </p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-gray-800 font-semibold text-sm">
            From <span className="text-black font-bold">₹{price}</span>
          </p>
          <button
            onClick={onViewDetails}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm px-3 py-1 rounded-md"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
