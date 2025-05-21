/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";

const TermsConditions = () => {
  return (
    <div className="w-full pt-10 pb-10 flex items-center justify-center px-10">
      <motion.div
        className="max-w-[1050px] w-full text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Terms and Conditions Section */}
        <h2
          className="text-2xl md:text-4xl text-[#193531] mb-5 md:mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Terms and Conditions
        </h2>

        <ul className="list-disc text-left text-black space-y-4 mb-18 text-[14px] md:text-[16px]">
          <motion.li
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            You are making a booking with the hotel directly.
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Please review the booking and cancellation policies for the
            bookings. In case you make a change or cancel the booking, the
            cancellation penalties specified may apply.
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            You may be asked to furnish the form of payment and identification
            proofs during check-in.
          </motion.li>
          <motion.li
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Other inclusions not listed as a part of this booking may be
            chargeable.
          </motion.li>
        </ul>

        {/* Cancellation Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-2xl md:text-4xl text-[#193531] mb-5 md:mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Cancellation Rules
          </h2>

          <ul className="list-disc text-left text-black space-y-4 text-[14px] md:text-[16px]">
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              If cancellation is done 7 or more days prior to arrival, then the
              full amount will be refunded.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              If cancellation is done between 5 - 7 days of arrival, then 50% of
              the booking amount will be charged.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              If cancellation is done within 5 days of arrival, then the full
              amount will be charged.
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              If no show, then the full amount will be charged.
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsConditions;
