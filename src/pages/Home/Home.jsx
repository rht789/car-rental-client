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
      <HeroBanner />

      <SearchFilterBar />

      <FeaturedCars />

      <WhyRentWithUs />

      <TopRatedCars />

      <CustomerTestimonials />

      <Newsletter />
    </div>
  );
};

export default Home;
