import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const HomePackagesCardinnnerFaqSection = ({ FaqData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const HandleFAQClick = (Idx) => {
    setOpenIndex((prev) => {
      return prev === Idx ? null : Idx;
    });
  };
  return (
    <>
      <div className="FAQ-cont gap-3 flex flex-col ">
        <h2 className="text-[1.5rem] font-semibold text-orange-color mb-4">
          Itinerary
        </h2>

        {FaqData.map((Val, Idx) => {
          return (
            <div
              className="fact-cont relative border border-gray-400 md:w-[65%] rounded-sm  p-2 select-none"
              key={Idx}
              onClick={() => {
                HandleFAQClick(Idx);
              }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openIndex === Idx ? "100%" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-[-1px] left-[-1px] w-[4px] bg-orange-color rounded"
              />

              <div className="faq-title flex justify-between items-center transition-all duration-75 ease-in-out">
                {/* <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-4">{openIndex === Idx ? <FaChevronUp size={30} className="bg-gray-300 p-2 rounded-full" /> : <FaChevronDown size={30} className="bg-gray-300 p-2 rounded-full" />} {Val.FaqTitle}</h3> */}
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-4">
                  <FaChevronUp
                    size={30}
                    className={`bg-gray-300 p-2 rounded-full transition-transform duration-500 ${
                      openIndex === Idx ? "rotate-[180deg]" : ""
                    }`}
                  />
                  {Val.FaqTitle}
                </h3>
              </div>

              <AnimatePresence>
                {openIndex === Idx && (
                  <motion.div
                    key="faq-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 text-gray-600 text-base p-2">
                      {Val.FaqFact}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePackagesCardinnnerFaqSection;
