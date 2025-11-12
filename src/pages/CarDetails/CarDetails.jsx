import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate, Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaUser,
  FaCar,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaShieldAlt,
  FaClock,
  FaChevronRight,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/Loader";
import AuthContext from "../../contexts/AuthContext";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const { user } = use(AuthContext);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchCarDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (car) {
      document.title = `${car.carName} - RentWheels`;
    }
  }, [car]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/cars/${id}`);
      setCar(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
      toast.error("Failed to load car details");
      navigate("/browse");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !car) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    return days > 0 ? days * Number(car.rentPrice) : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a car");
      navigate("/login", { state: `/car-details/${id}` });
      return;
    }

    if (user.email === car.providerEmail) {
      toast.error("You cannot book your own car");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      toast.error("Start date cannot be in the past");
      return;
    }

    if (end <= start) {
      toast.error("End date must be after start date");
      return;
    }

    const totalPrice = calculateTotalPrice();
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const bookingData = {
      carId: car._id,
      carName: car.carName,
      carImage: car.imageURL,
      rentPrice: car.rentPrice,
      providerId: car.providerId,
      providerName: car.providerName,
      providerEmail: car.providerEmail,
      renterId: user.uid,
      renterName: user.displayName,
      renterEmail: user.email,
      startDate: startDate,
      endDate: endDate,
      totalDays: days,
      totalPrice: totalPrice,
      status: "Confirmed",
      bookingDate: new Date().toISOString(),
    };

    try {
      setBookingLoading(true);
      await axios.post("/bookings", bookingData);
      toast.success("Car booked successfully!");
      setBookingModalOpen(false);
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!car) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm font-body">
            <Link
              to="/"
              className="text-neutral-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <FaChevronRight className="text-neutral-light text-xs" />
            <Link
              to="/browse"
              className="text-neutral-medium hover:text-primary transition-colors"
            >
              Browse Cars
            </Link>
            <FaChevronRight className="text-neutral-light text-xs" />
            <span className="text-neutral font-medium">{car.carName}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl overflow-hidden">
              <div className="relative h-96 overflow-hidden bg-base-200">
                <img
                  src={car.imageURL}
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`badge badge-lg border-0 font-body font-semibold shadow-lg ${
                      car.status === "Available"
                        ? "bg-accent text-white"
                        : "bg-error text-white"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="badge badge-lg bg-base-100 text-neutral border-0 font-body font-medium shadow-lg">
                    {car.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-neutral mb-4">
                {car.carName}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FaUser className="text-xl text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-medium font-body">
                      Owner
                    </p>
                    <p className="text-base font-heading font-semibold text-neutral">
                      {car.providerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-xl">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-xl text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-medium font-body">
                      Location
                    </p>
                    <p className="text-base font-heading font-semibold text-neutral">
                      {car.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-heading font-bold text-neutral mb-3 flex items-center gap-2">
                  <FaCar className="text-primary" />
                  About This Car
                </h2>
                <p className="text-base text-neutral-medium font-body leading-relaxed">
                  {car.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FaCalendarAlt className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-medium font-body">
                        Listed Date
                      </p>
                      <p className="text-sm font-heading font-semibold text-neutral">
                        {new Date(car.dateAdded).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <FaShieldAlt className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-medium font-body">
                        Status
                      </p>
                      <p className="text-sm font-heading font-semibold text-neutral">
                        Verified & Insured
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <FaClock className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-medium font-body">
                        Availability
                      </p>
                      <p className="text-sm font-heading font-semibold text-neutral">
                        {car.status === "Available"
                          ? "Ready to Book"
                          : "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-base-100 rounded-2xl border-2 border-base-300 shadow-xl p-6 sticky top-24">
              <div className="bg-primary/10 rounded-xl p-6 mb-6 border border-primary/20">
                <p className="text-sm text-neutral-medium font-body mb-1">
                  Daily Rental Rate
                </p>
                <p className="text-4xl font-heading font-bold text-primary">
                  ৳{Number(car.rentPrice).toLocaleString()}
                </p>
                <p className="text-xs text-neutral-medium font-body mt-1">
                  per day
                </p>
              </div>

              {car.status === "Available" ? (
                <div className="bg-accent/10 rounded-xl p-4 mb-6 border border-accent/20">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-accent text-xl" />
                    <span className="font-body font-semibold text-accent">
                      Available for Booking
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-error/10 rounded-xl p-4 mb-6 border border-error/20">
                  <div className="flex items-center gap-2">
                    <span className="font-body font-semibold text-error">
                      Currently Unavailable
                    </span>
                  </div>
                </div>
              )}

              {car.status === "Available" && (
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="btn btn-primary w-full h-14 text-lg font-body font-semibold text-white border-0 hover:scale-105 transition-all duration-300"
                >
                  Book Now
                </button>
              )}

              <div className="mt-6 pt-6 border-t border-base-300">
                <h3 className="text-lg font-heading font-bold text-neutral mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>Verified Owner</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>Clean & Well-Maintained</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>24/7 Support</span>
                  </li>
                  <li className="flex items-center gap-2 text-neutral-medium font-body">
                    <FaCheckCircle className="text-accent text-sm" />
                    <span>Flexible Booking</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {bookingModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-md bg-base-100 border-2 border-base-300 shadow-2xl">
            <div className="bg-primary px-6 py-4 -mx-6 -mt-6 mb-6">
              <h3 className="font-heading font-bold text-xl text-white">
                Book {car.carName}
              </h3>
              <p className="text-white/90 font-body text-sm mt-1">
                Select your rental dates
              </p>
            </div>

            <form onSubmit={handleBooking} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral font-body font-medium">
                    Start Date <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="input input-bordered bg-base-100 border-base-300 w-full h-12 text-neutral font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral font-body font-medium">
                    End Date <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={
                    startDate ||
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  }
                  required
                  className="input input-bordered bg-base-100 border-base-300 w-full h-12 text-neutral font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {startDate && endDate && calculateTotalPrice() > 0 && (
                <div className="bg-base-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-neutral-medium font-body">
                    <span>Daily Rate:</span>
                    <span>৳{Number(car.rentPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-medium font-body">
                    <span>Number of Days:</span>
                    <span>
                      {Math.ceil(
                        (new Date(endDate) - new Date(startDate)) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </span>
                  </div>
                  <div className="border-t border-base-300 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-body font-semibold text-neutral">
                        Total Price:
                      </span>
                      <span className="text-2xl font-heading font-bold text-primary">
                        ৳{calculateTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="btn btn-ghost flex-1 h-12 font-body font-semibold text-neutral hover:bg-base-200"
                  disabled={bookingLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="btn btn-primary flex-1 h-12 font-body font-semibold text-white border-0"
                >
                  {bookingLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setBookingModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default CarDetails;
