import React from "react";
import { Link } from "react-router";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="h-1 bg-linear-to-r from-primary to-primary-dark animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img
                src="/logo.png"
                alt="RentWheels Logo"
                className="w-10 h-10"
              />
              <h2 className="text-2xl font-heading font-bold text-neutral">
                Rent<span className="text-primary">Wheels</span>
              </h2>
            </div>
            <p className="text-sm text-neutral-medium leading-relaxed font-body">
              Connecting riders with trusted car owners — easy, fast, and
              affordable.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold font-heading text-neutral uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link
                  to="/"
                  className="text-neutral-medium hover:text-primary transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="text-neutral-medium hover:text-primary transition-colors duration-200 text-sm"
                >
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-neutral-medium hover:text-primary transition-colors duration-200 text-sm"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold font-heading text-neutral uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3 font-body text-sm text-neutral-medium">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiMail className="h-5 w-5 text-primary" />
                <a
                  href="mailto:support@rentwheels.com"
                  className="hover:text-primary transition-colors duration-200"
                >
                  support@rentwheels.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiPhone className="h-5 w-5 text-primary" />
                <span>+880 1234-567-890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <HiLocationMarker className="h-5 w-5 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold font-heading text-neutral uppercase mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300"></div>

      <div className="text-center py-6 px-5">
        <p className="text-sm text-neutral-medium font-body">
          © 2025 RentWheels. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
