import React, { useEffect } from "react";
import HeroBanner from "./Sections/HeroBanner";
import SearchFilterBar from "./Sections/SearchFilterBar";
import FeaturedCars from "./Sections/FeaturedCars";
import WhyRentWithUs from "./Sections/WhyRentWithUs";
import TopRatedCars from "./Sections/TopRatedCars";
import CustomerTestimonials from "./Sections/CustomerTestimonials";
import Newsletter from "./Sections/Newsletter";

const Home = () => {
  useEffect(() => {
    document.title = "Home - RentWheels";
  }, []);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Banner / Slider */}
      <HeroBanner />

      {/* 2. Search & Filter Bar */}
      <SearchFilterBar />

      {/* 3. Featured Cars (Dynamic) */}
      <FeaturedCars />

      {/* 4. Why Rent With Us */}
      <WhyRentWithUs />

      {/* 5. Top Rated Cars (Dynamic) */}
      <TopRatedCars />

      {/* 6. Customer Testimonials */}
      <CustomerTestimonials />

      {/* 7. Newsletter / Call-To-Action */}
      <Newsletter />
    </div>
  );
};

export default Home;
