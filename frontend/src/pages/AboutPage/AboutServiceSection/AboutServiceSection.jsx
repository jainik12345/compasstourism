// import { FaEarthAmericas } from "react-icons/fa6";
// import { FaMoneyBill } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
// import { TbRosetteDiscountFilled } from "react-icons/tb";

// import BE_URL from "../../../config";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";


// const AboutServiceSection = () => {

//   const [AboutServiceDataArr, setAboutServiceDataArr] = useState([]);

//   useEffect(() => {

//     const FetchAboutServiceData = async () => {

//       try {

//         const Response = await axios.get(`${BE_URL}/aboutServiceSection`);

//         console.log(Response.data.data)

//         if (Response.status === 200) {



//         } else {

//         }

//       } catch (error) {

//         console.error("Error fetching About service data:", error);

//       }
//     }

//     FetchAboutServiceData();

//   })

//   // const ServiceDataArr = [

//   //   {
//   //     Title: "Best services",
//   //     Para: "Phaseus site amet tristique ligua donec iaculis leo sus cipit. Consec tetur adipiscing elit. Incididunt ut dolore."
//   //   },

//   // ]

//   return (

//     <>

//       {/* <div className="section">

//         <div className="container max-w-screen-xl mx-auto py-20 md:px-10 px-5 gap-5 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">

//           {

//             ServiceDataArr && ServiceDataArr.map((Val, Idx) => {


//               return (

//                 <>


//                   <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

//                     <FaEarthAmericas size={30} />

//                     <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

//                     <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>

//                   </div>

//                   <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

//                     <FaMoneyBill size={30} />

//                     <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

//                     <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>


//                   </div>


//                   <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

//                     <FaStar size={30} />

//                     <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

//                     <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>

//                   </div>

//                   <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

//                     <TbRosetteDiscountFilled size={30} />

//                     <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

//                     <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>


//                   </div>

//                 </>

//               )


//             })

//           }

//         </div>

//       </div> */}

//     </>

//   )
// }

// export default AboutServiceSection
import { FaEarthAmericas } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";
import BE_URL from "../../../config";

const AboutServiceSection = () => {
  const [aboutServiceDataArr, setAboutServiceDataArr] = useState([]);

  useEffect(() => {
    const fetchAboutServiceData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/aboutServiceSection`);
        if (response.status === 200) {
          setAboutServiceDataArr(response.data.data);
        }else{

          console.loog

        }
      } catch (error) {
        console.error("Error fetching About service data:", error);
      }
    };

    fetchAboutServiceData();
  }, []);

  return (
    <div className="section">
      <div className="container max-w-screen-xl mx-auto py-20 md:px-10 px-5 gap-5 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {aboutServiceDataArr.map((item, index) => (
          <div
            key={item.id || index}
            className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5"
          >
            <img
              src={`${BE_URL}/Images/AboutImages/AboutServiceSection/${item.image}`}
              alt={item.title}
              className="w-10 h-10 object-cover  rounded-md"
            />
            <h2 className="text-[1.5rem] font-semibold text-gray-800">
              {item.title}
            </h2>
            <p className="text-[1rem] font-semibold text-gray-600 text-justify">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutServiceSection;
