"use client";
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
            About Us
          </h1>
          <p
            className="text-lg md:text-xl mb-12 text-center z-10"
            style={{ maxWidth: 500 }}
          >
            Follow us on our journey to serving Muslims worldwide
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
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg mb-4"
        >
          Welcome to Ihsan, your premier destination for thoughtfully curated
          Islamic gifts. Our passion for quality and dedication to excellence
          drive everything we do, from product selection to customer service. At
          Ihsan, we strive to provide a unique shopping experience that embodies
          the essence of Islamic values and traditions.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg mb-4"
        >
          Our team is committed to sourcing the finest products that reflect the
          beauty and richness of Islamic culture. Each item in our collection is
          chosen with care, ensuring it meets the highest standards of quality
          and authenticity. Whether you are looking for the perfect gift for a
          loved one or seeking to enhance your own spiritual journey, you will
          find something special at Ihsan.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg mb-4"
        >
          Our mission is to deliver high-quality products that not only meet but
          exceed the expectations of our customers. We believe in the principles
          of innovation, integrity, and building strong, lasting relationships
          with our clients. Our dedication to these values ensures that every
          interaction with Ihsan is a positive and enriching experience.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg mb-4"
        >
          Thank you for choosing Ihsan. We are honored to serve you and look
          forward to making your experience with us a memorable one. Your trust
          and support inspire us to continuously improve and offer the best in
          Islamic gifts and services.
        </motion.p>
      </div>
    </main>
  );
};

export default page;
