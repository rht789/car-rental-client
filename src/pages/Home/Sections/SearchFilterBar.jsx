import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";

const SearchFilterBar = () => {
  return (
    <section className="relative -mt-20 z-20 px-6">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border-2 border-base-300 p-6 md:p-8"
      >
        <div className="flex items-center gap-4">
          {/* Search Input - Full Width */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for cars by name, brand, or model..."
              className="input input-bordered bg-white border-base-300 w-full h-14 pl-12 pr-4 text-neutral font-body text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-medium text-xl" />
          </div>

          {/* Search Button */}
          <Link to="/browse">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(37, 99, 235, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary h-14 px-8 text-base font-body font-semibold text-white border-0"
            >
              <FaSearch className="mr-2" />
              Search
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default SearchFilterBar;
