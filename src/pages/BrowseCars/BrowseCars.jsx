import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CarsCard from "../../components/CarsCard";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";

const BrowseCars = () => {
  const axios = useAxios();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Browse Cars - RentWheels";
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral mb-4">
            Browse <span className="text-primary">Cars</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-medium font-body max-w-2xl mx-auto">
            Explore available cars from trusted providers near you
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-base-100 rounded-2xl shadow-xl border-2 border-base-300 p-6 mb-12">
          <div className="flex items-center gap-4">
            {/* Search Input - Full Width */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for cars by name, brand, or model..."
                className="input input-bordered bg-base-100 border-base-300 w-full h-14 pl-12 pr-4 text-neutral placeholder:text-neutral-light font-body text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium text-xl" />
            </div>

            {/* Search Button */}
            <button className="btn btn-primary h-14 px-8 text-base font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300">
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Available Cars Section */}
        {cars.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-bold text-neutral text-center mb-8">
              Available <span className="text-primary">Cars</span>
            </h2>

            {/* Car Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cars.map((car) => (
                <CarsCard key={car._id} car={car} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State (Hidden when cars exist) */}
        {cars.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🚗</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-neutral mb-3">
              No Cars Available Right Now
            </h3>
            <p className="text-base text-neutral-medium font-body">
              Check back later for new listings from our trusted providers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
