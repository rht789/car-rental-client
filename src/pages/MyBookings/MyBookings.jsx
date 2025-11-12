import React, { useEffect, useState, use } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaCar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaClock,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../contexts/AuthContext";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyBookings = () => {
  const axios = useAxios();
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Bookings - Car Rental";
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetchMyBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/bookings?renterId=${user.uid}`);

      const bookingsWithCarDetails = await Promise.all(
        response.data.map(async (booking) => {
          try {
            const carResponse = await axios.get(`/cars/${booking.carId}`);
            return {
              ...booking,
              carDetails: carResponse.data,
            };
          } catch (error) {
            console.error(`Failed to fetch car ${booking.carId}:`, error);
            return booking;
          }
        })
      );

      const sortedBookings = bookingsWithCarDetails.sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
      );
      setBookings(sortedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, carId, carName) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: `Are you sure you want to cancel your booking for "${carName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "Keep Booking",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/bookings/${bookingId}`);

        // Update car status back to Available
        await axios.patch(`/cars/${carId}`, { status: "Available" });

        toast.success("Booking cancelled successfully");
        fetchMyBookings();
      } catch (error) {
        console.error("Error cancelling booking:", error);
        toast.error("Failed to cancel booking");
      }
    }
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const getBookingStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return { label: "Upcoming", color: "badge-info" };
    } else if (now >= start && now <= end) {
      return { label: "Active", color: "badge-success" };
    } else {
      return { label: "Completed", color: "badge-neutral" };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaCalendarAlt className="text-4xl text-primary" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral">
              My <span className="text-primary">Bookings</span>
            </h1>
          </div>
          <p className="text-lg text-neutral-medium font-body max-w-2xl mx-auto">
            Manage and track all your car rental bookings in one place
          </p>
        </motion.div>

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-base-100 rounded-2xl border-2 border-base-300 p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-5xl text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-heading font-bold text-neutral mb-3">
              No Bookings Yet
            </h2>
            <p className="text-base text-neutral-medium font-body mb-6 max-w-md mx-auto">
              You haven't made any car bookings yet. Browse our collection and
              find your perfect ride!
            </p>
            <motion.a
              href="/browse"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary text-white border-0 px-8"
            >
              Browse Cars
            </motion.a>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 bg-base-100 rounded-xl p-4 border border-base-300">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaCar className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-sm text-neutral-medium font-body">
                    Total Bookings
                  </p>
                  <p className="text-xl font-heading font-bold text-neutral">
                    {bookings.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FaMoneyBillWave className="text-accent text-xl" />
                </div>
                <div>
                  <p className="text-sm text-neutral-medium font-body">
                    Total Spent
                  </p>
                  <p className="text-xl font-heading font-bold text-neutral">
                    ৳
                    {bookings
                      .reduce((sum, booking) => sum + booking.totalPrice, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6"
            >
              {bookings.map((booking) => {
                const status = getBookingStatus(
                  booking.startDate,
                  booking.endDate
                );
                const days = calculateDays(booking.startDate, booking.endDate);
                const car = booking.carDetails;

                if (!car) {
                  return null;
                }

                return (
                  <motion.div
                    key={booking._id}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    className="bg-base-100 rounded-2xl border-2 border-base-300 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden bg-base-200">
                        <img
                          src={car.imageURL}
                          alt={car.carName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span
                            className={`badge ${status.color} border-0 text-white font-semibold shadow-lg`}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>

                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-heading font-bold text-neutral mb-2">
                              {car.carName}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-medium">
                              <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-primary" />
                                <span className="font-body">
                                  {car.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaClock className="text-secondary" />
                                <span className="font-body">
                                  {days} {days === 1 ? "Day" : "Days"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-neutral-medium font-body mb-1">
                              Total Cost
                            </p>
                            <p className="text-3xl font-heading font-bold text-primary">
                              ৳{booking.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-base-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <FaCalendarAlt className="text-primary" />
                              </div>
                              <div>
                                <p className="text-xs text-neutral-medium font-body">
                                  Rental Period
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-medium font-body">
                                  Start:
                                </span>
                                <span className="font-heading font-semibold text-neutral">
                                  {new Date(
                                    booking.startDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-medium font-body">
                                  End:
                                </span>
                                <span className="font-heading font-semibold text-neutral">
                                  {new Date(booking.endDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-base-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <FaUser className="text-secondary" />
                              </div>
                              <div>
                                <p className="text-xs text-neutral-medium font-body">
                                  Car Owner
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <FaUser className="text-neutral-medium" />
                                <span className="font-body text-neutral">
                                  {car.providerName}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FaEnvelope className="text-neutral-medium" />
                                <span className="font-body text-neutral truncate">
                                  {car.providerEmail}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-base-300">
                          <div className="flex items-center gap-2 text-sm text-neutral-medium">
                            <FaClock />
                            <span className="font-body">
                              Booked on{" "}
                              {new Date(booking.bookingDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleCancelBooking(
                                booking._id,
                                booking.carId,
                                car.carName
                              )
                            }
                            className="btn btn-error btn-sm text-white border-0"
                          >
                            <FaTrash className="mr-2" />
                            Cancel Booking
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
