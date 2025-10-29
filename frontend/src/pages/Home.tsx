import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

interface Experience {
  _id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get<Experience[]>(
          "http://localhost:5000/api/experiences"
        );
        setExperiences(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  // Function to trigger search manually (on button click)
  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(experiences); // Show all if input is empty
      return;
    }

    const results = experiences.filter((exp) =>
      exp.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with search handler */}
      <Navbar search={search} setSearch={setSearch} onSearch={handleSearch} />

      <div className="container mx-auto mt-10 px-6 sm:px-10 md:px-16 lg:px-24">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No experiences found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {filtered.map((exp) => (
              <Card
                key={exp._id}
                title={exp.title}
                location={exp.location}
                description={exp.description}
                price={exp.price}
                image={exp.image}
                onViewDetails={() =>
                  (window.location.href = `/details/${exp._id}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
