"use client";
import React from "react";
import { motion } from "framer-motion";
const page = () => {
  return (
    <main>
      <section
        className="bg-gray-900 text-white py-44"
        style={{
          backgroundImage: "url('/images/pages-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container mx-auto flex flex-col items-center justify-center relative
        
        "
        >
          {/* Overlay for better readability */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center z-10">
            Reach out to us
          </h1>
          <p
            className="text-lg md:text-xl mb-12 text-center z-10"
            style={{ maxWidth: 500 }}
          >
            We are looking forward to discuss your needs
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg mb-4"
        >
          If you have any questions, feel free to reach out to us. We're here to
          help!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-lg">
            <strong>Email:</strong> support@example.com
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-lg">
            <strong>Address:</strong> 1234 Example St, City, Country
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-lime-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-lime-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium">
              Message
            </label>
            <textarea
              id="message"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-lime-500"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-lime-600 text-white font-medium rounded-md shadow-sm hover:bg-lime-700 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-lime-600"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </main>
  );
};

export default page;
