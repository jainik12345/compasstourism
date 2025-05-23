// import { useState } from "react";
// import bgimg from "../../../assets/images/counter_bg.png";
// import { FaHotel } from "react-icons/fa6";


// const AboutDetailsPage = () => {

//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);


//   const DetailsDataArr = [

//     {

//       Count: 2000,
//       Title: "Partners",

//     },
//     {

//       Count: 2000,
//       Title: "Listed Hotels",

//     },
//     {

//       Count: 2000,
//       Title: "Destinations",

//     },
//     {

//       Count: 2000,
//       Title: "Booking",

//     },

//   ]

//   return (

//     <>

//       <div className="section relative ">

//         <div className="container max-w-screen mx-auto  gap-10 ">

//           <div className="bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center h-120" style={{ backgroundImage: `url(${bgimg})` }}>


//             <div className="header md:w-[70%] w-full text-center flex flex-col gap-5 md:px-20 px-10">

//               <h2 className="md:text-[2rem] text-[1.5rem] font-semibold text-white">Have you any question? Get A Consultation</h2>
//               <p className="md:text-[1rem] text-[.8rem]  text-gray-200">Our team of experienced tour specialists have travelled to hundreds of countries around the globe and have decades of first-hand travel experience to share. Contact us now to have all of your tour-related questions answered!</p>

//             </div>



//           </div>

//         </div>

//         <div className="lg:py-40 py-10 bg-gray-200  flex justify-center w-full">

//           <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-items-center lg:bg-white items-center md:rounded-2xl rounded-none grid-cols-1 lg:gap-0 gap-5 lg:absolute lg:top-[45%]  md:w-fit w-full ">

//             {

//               DetailsDataArr && DetailsDataArr.map((val, idx) => {

//                 return (

//                   <div className={`flex flex-col justify-center items-center bg-white md:w-60 w-[90%] h-60 gap-5 shadow-md lg:shadow-none ${idx === 0 ? "lg:rounded-tl-2xl lg:rounded-bl-2xl" : ""} ${idx === 3 ? "lg:rounded-tr-2xl lg:rounded-br-2xl" : ""} rounded-2xl`}
//                   >
//                     <FaHotel size={50} className="text-gray-800"/>

//                     <h2 className="text-[1.9rem] tracking-[.6rem] flex justify-center pl-2 font-semibold">{val.Count}</h2>
//                     <p className="text-[1rem] tracking-[.3rem] flex justify-center pl-2 font-semibold">{val.Title}</p>

//                   </div>

//                 )

//               })

//             }

//           </div>

//         </div>

//       </div>

//     </>

//   )
// }

// export default AboutDetailsPage

import { useEffect, useState } from "react";
import bgimg from "../../../assets/images/counter_bg.png";
import { FaHotel } from "react-icons/fa6";

// Counter component for animated count-up
const Counter = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 10); // update every 10ms
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [end, duration]);

  return <span>{count}+</span>;
};

const AboutDetailsPage = () => {

  const DetailsDataArr = [
    { Count: 2000, Title: "Partners" },
    { Count: 2000, Title: "Listed Hotels" },
    { Count: 2000, Title: "Destinations" },
    { Count: 2000, Title: "Booking" },
  ];

  return (
    <div className="section relative">
      <div className="container max-w-screen mx-auto gap-10">
        <div
          className="bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center h-120"
          style={{ backgroundImage: `url(${bgimg})` }}
        >
          <div className="header md:w-[70%] w-full text-center flex flex-col gap-5 md:px-20 px-10">
            <h2 className="md:text-[2rem] text-[1.5rem] font-semibold text-white">
              Have you any question? Get A Consultation
            </h2>
            <p className="md:text-[1rem] text-[.8rem] text-gray-200">
              Our team of experienced tour specialists have travelled to hundreds of countries around the globe and have decades of first-hand travel experience to share. Contact us now to have all of your tour-related questions answered!
            </p>
          </div>
        </div>
      </div>

      <div className="lg:py-40 py-10 bg-gray-200 flex justify-center w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-items-center lg:bg-white items-center md:rounded-2xl rounded-none grid-cols-1 lg:gap-0 gap-5 lg:absolute lg:top-[45%] md:w-fit w-full">
          {DetailsDataArr.map((val, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center items-center bg-white md:w-60 w-[90%] h-60 gap-5 shadow-md lg:shadow-none ${idx === 0 ? "lg:rounded-tl-2xl lg:rounded-bl-2xl" : ""
                } ${idx === 3 ? "lg:rounded-tr-2xl lg:rounded-br-2xl" : ""} rounded-2xl`}
            >
              <FaHotel size={50} className="text-gray-800" />
              <h2 className="text-[1.9rem] tracking-[.6rem] flex justify-center pl-2 font-semibold">
                <Counter end={val.Count} duration={8000} />
              </h2>
              <p className="text-[1rem] tracking-[.3rem] flex justify-center pl-2 font-semibold">
                {val.Title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutDetailsPage;
