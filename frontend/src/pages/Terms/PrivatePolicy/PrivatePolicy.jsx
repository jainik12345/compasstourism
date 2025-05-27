// /* eslint-disable no-unused-vars */

// import React from "react";
// import { motion } from "framer-motion";

// const PrivatePolicy = () => {
//   return (
//     <div className="w-full pt-10 pb-10 flex items-center justify-center px-4">
//       <motion.div
//         className="max-w-[1220px] w-full text-center"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         {/* Main Heading */}
//         <h1
//           className="text-3xl md:text-4xl text-[#193531] mb-10"
//           style={{ fontFamily: "'Playfair Display', serif" }}
//         >
//           Privacy Policy
//         </h1>

//         {/* Paragraph */}
//         <p className="text-base md:text-lg text-gray-700 leading-8 mb-16 italic">
//           At Renest Hotels and Resorts, we are committed to protecting the
//           privacy and security of our website visitors' personal information.
//           This Privacy Policy outlines the types of personal information we
//           collect, how we use that information, and the measures we take to
//           protect your privacy.
//         </p>

//         {/* How it Works Section */}
//         <motion.div
//           className="bg-[#193531eb] p-6 md:p-10"
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <h2
//             className="text-2xl md:text-4xl text-white mb-10"
//             style={{ fontFamily: "'Playfair Display', serif" }}
//           >
//             How it Works
//           </h2>

//           <ul className="text-justify pl-4 pr-4 md:pl-10 md:pr-10 text-white space-y-10 text-[14px] md:text-[16px] list-disc">
//             <li>
//               <strong>Collection of Information:</strong> We collect personal
//               information such as your name, email address, phone number, and
//               payment information when you make a reservation or register for
//               our loyalty program. We may also collect information about your
//               browsing behaviour on our website, including your IP address,
//               browser type, and device type.
//             </li>
//             <li>
//               <strong>Use of Information:</strong> We use your personal
//               information to process your reservations, communicate with you
//               about your bookings, and improve our services. We may also use
//               your information to personalize your experience on our website and
//               to send you marketing communications that we think may be of
//               interest to you.
//             </li>
//             <li>
//               <strong>Sharing of Information:</strong> We may share your
//               personal information with third-party service providers, such as
//               payment processors, to process your bookings and payments. We may
//               also share your information with law enforcement or government
//               authorities if required by law or to protect our legal rights.
//             </li>
//             <li>
//               <strong>Security of Information:</strong> We take appropriate
//               measures to protect your personal information from unauthorized
//               access, disclosure, alteration, and destruction. We use
//               industry-standard encryption technology to protect your payment
//               information and take reasonable measures to ensure the security of
//               your personal information.
//             </li>
//             <li>
//               <strong>Cookies:</strong> We use cookies on our website to improve
//               your browsing experience and personalize the content you see.
//               Cookies are small text files that are stored on your device when
//               you visit our website. You can disable cookies in your browser
//               settings, but please note that this may limit your ability to use
//               some features of our website.
//             </li>
//             <li>
//               <strong>Changes to this Policy:</strong> We may update this
//               Privacy Policy from time to time. Any changes will be posted on
//               our website, and we encourage you to review this Policy
//               periodically to stay informed of any updates.
//             </li>
//             <li>
//               <strong>Contact Us:</strong> If you have any questions or concerns
//               about this Privacy Policy or our use of your personal information,
//               please contact us at +91 79 0022 2211.
//             </li>
//           </ul>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default PrivatePolicy;





// /* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BE_URL from "../../../config";
import axios from "axios";

const PrivatePolicy = () => {

  const [policyData, setPolicyData] = useState([]);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/private-policy`);
        setPolicyData(response.data?.data || []); // ✅ safely access nested data

      } catch (error) {
        console.error("Error fetching privacy policy data:", error);
      }
    };

    fetchPolicyData();
  }, []);

  return (
    <div className="w-full pt-10 pb-10 flex items-center justify-center px-4">

      {/* Main Container */}


      <motion.div
        className="max-w-[1220px] w-full text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main Heading */}
        <h1
          className="text-3xl md:text-4xl text-[#193531] mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Privacy Policy
        </h1>

        {/* Paragraph */}
        <p className="text-base md:text-lg text-gray-700 leading-8 mb-16 italic">
          At Renest Hotels and Resorts, we are committed to protecting the
          privacy and security of our website visitors' personal information.
          This Privacy Policy outlines the types of personal information we
          collect, how we use that information, and the measures we take to
          protect your privacy.
        </p>

        {/* How it Works Section */}
        <motion.div
          className="bg-[#193531eb] p-6 md:p-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2
            className="text-2xl md:text-4xl text-white mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How it Works
          </h2>

          <ul className="text-justify pl-4 pr-4 md:pl-10 md:pr-10 text-white space-y-10 text-[14px] md:text-[16px] list-disc">

            {policyData && policyData.map((Item, Idx) => {

              return (

                <li key={Idx} className="flex items-center"><strong className="mr-5">{Item.private_policy_title}:</strong>{Item.private_policy_description}</li>
                
              )

            })}

          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivatePolicy;
