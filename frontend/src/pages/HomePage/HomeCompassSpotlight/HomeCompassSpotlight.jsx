import Img1 from "../../../assets/images/637921896094475779.png";
import Img2 from "../../../assets/images/637921896896248600.png";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaHandHoldingUsd } from "react-icons/fa";
import { PiShieldCheck } from "react-icons/pi";


import { NavLink } from "react-router-dom";

const HomeCompassSpotlight = () => {
  return (

    <>

      <div className="compass-spotlight-section">

        <div className="container max-w-screen-xl mx-a  uto flex flex-col gap-10 py-10 md:px-10 px-5">

          <div className="header flex flex-col justify-between">
            <h2 className="text-[1.5rem] font-semibold ">Compass Spotlight</h2>
            <p className="text-[1rem] text-gray-600 font-semibold">Find out what's happening at TourRadar - from the latest travel news to our special offers.</p>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1">

            <div className="card-1   flex flex-col  p-5 md:w-90 w-full">

              <img src={Img1} alt="IMG" className="h-40 rounded-tr-2xl rounded-tl-2xl " />

              <div className="content flex flex-col gap-5 p-5 border-1 border-r-gray-300  border-b-gray-300 border-l-gray-300 rounded-bl-2xl rounded-br-2xl">

                <h2 className="text-[1.5rem] font-normal text-gray-800 ">Upcoming Events</h2>
                <p className="text-[1rem] font-semibold text-gray-600">Book your dream trip to the Maldives! Save up to 50%</p>

                <NavLink className="text-blue-700">View Deals </NavLink>

              </div>

            </div>

            <div className="card-2 p-5 md:w-90 w-full flex flex-col  ">

              <img src={Img2} alt="IMG" className="h-40 rounded-tr-2xl rounded-tl-2xl" />

              <div className="content flex flex-col gap-5 p-5 border-1 border-r-gray-300  border-b-gray-300 border-l-gray-300 justify-between rounded-bl-2xl rounded-br-2xl">

                <h2 className="text-[1.5rem] font-normal text-gray-800">Our Presence</h2>
                <p className="text-[1rem] font-semibold text-gray-600">Ready-to-book adventures, personalized.</p>

                <NavLink className="text-blue-700">Learn More</NavLink>

              </div>

            </div>



            <div className="Facilities flex flex-col justify-center items-start gap-10">

              <div className="flex  justify-start rounded-tl-2xl rounded-bl-2xl items-center  w-full shadow-md">

                <div className="p-4  bg-bg-color rounded-tl-2xl rounded-bl-2xl">
                  <PiShieldCheck size={60} className="text-blue-600 " />

                </div>

                <div className="flex flex-col h-full w-full justify-around px-5">

                  <h2>Travel Insurance</h2>
                  <NavLink className="text-blue-600">
                    Learn More
                  </NavLink>

                </div>


              </div>

              <div className="flex  justify-start  items-center rounded-tl-2xl rounded-bl-2xl shadow-md w-full">

                <div className="p-4  bg-bg-color rounded-tl-2xl rounded-bl-2xl">

                  <FaHandHoldingUsd size={60} className="text-blue-600 " />
                </div>

                <div className="flex flex-col h-full w-full justify-around px-5">

                  <h2>Travel, Refer & Earn</h2>
                  <NavLink className="text-blue-600">
                    Learn More
                  </NavLink>

                </div>


              </div>

              <div className="flex  justify-start  items-center rounded-tl-2xl rounded-bl-2xl shadow-md w-full">


                <div className="p-4  bg-bg-color rounded-tl-2xl rounded-bl-2xl">
                  <TfiHeadphoneAlt size={60} className="text-blue-600 " />
                </div>

                <div className="flex flex-col h-full w-full justify-around px-5">

                  <h2>24/7 Customer Support</h2>
                  <NavLink className="text-blue-600">
                    Learn More
                  </NavLink>

                </div>


              </div>


            </div>

          </div>

        </div>

      </div>

    </>

  )
}

export default HomeCompassSpotlight
