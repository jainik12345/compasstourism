/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Arrow SVG - Up and Down
const ArrowIcon = ({ open }) => (
  <motion.svg
    width="28"
    height="28"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="transition-transform"
    animate={{ rotate: open ? 180 : 0 }}
    viewBox="0 0 24 24"
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
);

const rulesData = {
  quickFacts: [
    {
      label: "Check In",
      value: "After 12:00 pm",
    },
    {
      label: "Check Out",
      value: "Till 11:00 am",
    },
    {
      label: "Rooms",
      value: "24",
    },
    {
      label: "Floors",
      value: "1",
    },
  ],
  statueOfUnity: [
    "Please do not rely on on the spot booking of SOU Tickets.",
    "Consider advance booking from the link: Booking Link",
  ],
  reservation: [
    "Please carry a valid government issued photo identity and address proof with you for Check-In Procedure. PAN Card is not accepted as a valid Identity Card.",
    "For foreigners & NRIs: Passport OR OCI and Visa is mandatory for check-in.",
    "Early check-in & late check-out is subject to availability.",
    "Any modification in the booking will be done in accordance of Cancellation & Amendment policy.",
    "The primary guest must be at least 18 years old to be able to check into the hotel. Guest under 18 years should be accompanied by an adult to stay in the hotel.",
  ],
  cancellation: [
    "10% cancellation charge, if cancelled more than 15 days from the Check-in date.",
    "50% cancellation charge, if cancelled 10 days from the check-in date.",
    "No refund, if cancelled less than 10 days from Check-in date.",
    "Days for cancellation rule will be calculated excluding cancellation request day and Check-in day.",
    "Date amendment charges are applicable as per cancellation Policy above",
    "5% payment processing charge will be deducted in case of refund.",
    "Any refund will take at least 15 working days to process.",
    "**Note: Organiser reserves all rights to make any changes without prior notice.",
  ],
};

const variants = {
  initial: { opacity: 0, y: 30, height: 0 },
  animate: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: { opacity: 0, y: 10, height: 0, transition: { duration: 0.3 } },
};

const DummyRules = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white flex flex-col items-center px-2 py-8 md:py-12">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-10 ml-2 md:ml-0">
            Hotel Rules & Info
          </h2>
          {/* Right: Arrow */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none transition"
            aria-label={open ? "Collapse rules" : "Expand rules"}
          >
            <ArrowIcon open={open} />
          </button>
        </div>
        {/* Main Content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="rules-content"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
              style={{ overflow: "hidden" }}
            >
              {/* Quick Facts */}
              <div className="mt-1 md:mt-0 mb-10">
                <div className="font-semibold text-lg md:text-xl mb-4 mt-2">
                  Quick Facts:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {rulesData.quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border rounded-xl bg-white p-5 flex flex-col items-start min-w-[160px] shadow-sm"
                    >
                      <span className="text-gray-500 mb-1 text-sm">
                        {fact.label}
                      </span>
                      <span className="font-semibold text-lg md:text-xl">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Rules Info */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="md:w-56 font-semibold text-base md:text-lg mb-2 md:mb-0">
                    Statue of Unity Tickets Booking:
                  </div>
                  <ul className="list-disc list-inside pl-2 flex-1 text-gray-700">
                    {rulesData.statueOfUnity.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="md:w-56 font-semibold text-base md:text-lg mb-2 md:mb-0">
                    General reservation policy:
                  </div>
                  <ul className="list-disc list-inside pl-2 flex-1 text-gray-700">
                    {rulesData.reservation.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="md:w-56 font-semibold text-base md:text-lg mb-2 md:mb-0">
                    Cancellation and amendment policy:
                  </div>
                  <ul className="list-disc list-inside pl-2 flex-1 text-gray-700">
                    {rulesData.cancellation.map((item, idx) => (
                      <li key={idx}>
                        {item.startsWith("**") ? (
                          <span className="font-semibold">
                            {item.replace("**", "")}
                          </span>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DummyRules;
