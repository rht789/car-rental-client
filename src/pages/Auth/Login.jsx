import React from "react";
import { Link } from "react-router";
import { HiMail, HiLockClosed, HiEye } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 md:px-8">
      <div className="max-w-md w-full">
        {/* Login Card */}
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
              Welcome Back!
            </h2>
            <p className="text-sm text-neutral-medium font-body">
              Login to access your account
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4 md:space-y-5">
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
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-base-100 border-base-300 w-full pl-10 pr-10 h-12 md:h-14 text-neutral placeholder:text-neutral-light font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {/* Future: Toggle password visibility button */}
                {/* 
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <HiEye className="h-5 w-5 text-neutral-light hover:text-neutral" />
                                </button>
                                */}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-neutral font-body"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary-dark font-body font-medium transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full h-12 md:h-14 text-base md:text-lg font-body font-medium text-white border-0 hover:scale-[1.02] transition-transform duration-200"
            >
              Login
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
              Continue with Google
            </button>
            {/* Future: Add Google OAuth functionality */}
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-medium font-body">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary-dark font-semibold transition-colors duration-200"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-medium font-body">
            By logging in, you agree to our{" "}
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

export default Login;
