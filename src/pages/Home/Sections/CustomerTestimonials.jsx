import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

const CustomerTestimonials = () => {
  const axios = useAxios();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static review texts
  const reviewTexts = [
    "Excellent service! The booking process was seamless and the car was in perfect condition. Will definitely use RentWheels again for my next trip.",
    "Great selection of vehicles at competitive prices. The customer support team was very helpful and responsive. Highly recommend!",
    "Love how easy it is to find and book the perfect car. The entire experience exceeded my expectations from start to finish.",
  ];

  useEffect(() => {
    fetchRandomUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRandomUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users");
      const allUsers = response.data;

      // Get 3 random users
      const shuffled = [...allUsers].sort(() => 0.5 - Math.random());
      const randomUsers = shuffled.slice(0, 3);

      // Map users to testimonials with static review texts
      const testimonialsData = randomUsers.map((user, index) => ({
        id: user._id || index,
        name: user.displayName || user.name || "Anonymous User",
        role: getRoleFromEmail(),
        image: user.photoURL || `https://i.pravatar.cc/150?img=${index + 5}`,
        rating: 5,
        text: reviewTexts[index] || reviewTexts[0],
      }));

      setTestimonials(testimonialsData);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback to static data if API fails
      setTestimonials([
        {
          id: 1,
          name: "Sarah Johnson",
          role: "Business Traveler",
          image: "https://i.pravatar.cc/150?img=5",
          rating: 5,
          text: reviewTexts[0],
        },
        {
          id: 2,
          name: "Michael Chen",
          role: "Vacation Planner",
          image: "https://i.pravatar.cc/150?img=12",
          rating: 5,
          text: reviewTexts[1],
        },
        {
          id: 3,
          name: "Emily Rodriguez",
          role: "Weekend Explorer",
          image: "https://i.pravatar.cc/150?img=9",
          rating: 5,
          text: reviewTexts[2],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Generate role based on email domain or randomize
  const getRoleFromEmail = () => {
    const roles = [
      "Business Traveler",
      "Vacation Planner",
      "Weekend Explorer",
      "Daily Commuter",
      "Adventure Seeker",
    ];
    return roles[Math.floor(Math.random() * roles.length)];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 px-6 bg-linear-to-br from-base-100 via-primary/5 to-base-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.img
            src="/logo.png"
            alt="RentWheels Logo"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-20 h-20 object-contain mx-auto mb-4"
          />
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral mb-4">
            Customer <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-lg text-neutral-medium font-body max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their experience
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                }}
                className="bg-white rounded-2xl p-8 border-2 border-base-300 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 opacity-5">
                  <FaQuoteLeft className="text-8xl text-primary" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.img
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-primary/20"
                    />
                    <div>
                      <h4 className="text-lg font-heading font-bold text-neutral">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-neutral-medium font-body">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <FaStar className="text-secondary text-lg" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-base text-neutral-medium font-body leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
