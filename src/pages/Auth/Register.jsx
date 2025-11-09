import React, { useState } from "react";
import { Link } from "react-router";
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiUser,
  HiPhotograph,
} from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 md:px-8">
      <div className="max-w-md w-full">
        {/* Register Card */}
        <div className="bg-base-100 rounded-lg md:rounded-xl shadow-lg p-6 md:p-8 border border-base-300">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-4xl">🚗</span>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-neutral">
                Rent<span className="text-primary">Wheels</span>
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-neutral mb-2">
              Create Account
            </h2>
            <p className="text-sm text-neutral-medium font-body">
              Sign up to start renting your dream car
            </p>
          </div>

          {/* Register Form */}
          <form className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral mb-2 font-body"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral mb-2 font-body"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-neutral mb-2 font-body"
              >
                Photo URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiPhotograph className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  placeholder="Enter your photo URL"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral mb-2 font-body"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 pr-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {/* Toggle password visibility button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5 text-neutral-light hover:text-neutral transition-colors duration-200" />
                  ) : (
                    <HiEye className="h-5 w-5 text-neutral-light hover:text-neutral transition-colors duration-200" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-neutral-medium font-body">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-12 md:h-14 text-base md:text-lg font-body font-medium text-white border-0 hover:scale-[1.02] transition-transform duration-200 mt-6"
            >
              Create Account
            </button>
            {/* Future: Add loading state and form validation */}
          </form>

          {/* Divider */}
          <div className="divider text-neutral-medium text-sm font-body my-6">
            OR
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="btn btn-outline border-2 border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-300 w-full h-12 md:h-14 text-neutral font-body font-medium transition-all duration-200"
            >
              <FaGoogle className="h-5 w-5 text-error" />
              Sign up with Google
            </button>
            {/* Future: Add Google OAuth functionality */}
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-medium font-body">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-semibold transition-colors duration-200"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-medium font-body">
            By signing up, you agree to our{" "}
            <a
              href="#"
              className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
