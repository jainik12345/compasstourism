import { NavLink } from "react-router-dom"
import BE_URL from "../../../config"
import axios from "axios";
import { useEffect, useState } from "react";


const HomeServices = () => {

  const [HomeServiceData, setHomeServiceData] = useState();

  useEffect(() => {

    const FetchHomeSerivceData = async () => {

      try {

        const Response = await axios.get(`${BE_URL}/homeServices`);

        if (Response.status === 200) {

          setHomeServiceData(Response.data.data);

        } else {

          console.log("Unable to Fetch the APi data ", Response.statusText)

        }


      } catch (error) {

        console.log("Unable To Fetch The Data Of Home Service Section:- ", erro)

      }

    }

    FetchHomeSerivceData();

  })

  return (

    <>

      <div className="section">

        <div className="container mx-auto max-w-screen-xl py-10 md:px-10 px-5 flex md:flex-row flex-col justify-center items-center gap-10">

          <div className="flex flex-col md:items-start items-center md:w-2/3 w-full gap-5">

            <h2 className="font-semibold text-2xl ">{HomeServiceData?.heading}</h2>

            <p className="font-semibold text-[1rem] text-gray-500">{HomeServiceData?.description}</p>

            <NavLink className="bg-orange-color py-3 px-20 w-fit font-bold text-white rounded-sm" to={""}>
              Contact Us
            </NavLink>

          </div>

          <div className="flex justify-center items-center ps-20 w-fit">

            {

              HomeServiceData?.images && HomeServiceData?.images.map((val, idx) => {

                return (

                  <img src={`${BE_URL}/Images/HomeImages/HomeServices/${val}`} alt="IMG" className={`rounded-full z-40 h-20 w-20  object-cover ${idx === 1 ? "-translate-x-5" : idx === 2 ? "-translate-x-10 " : idx === 3 ? "-translate-x-15" : idx === 4 ? "-translate-x-20" : ""}`} key={idx} />


                )

              })

            }

          </div>

        </div>

      </div>

    </>

  )
}

export default HomeServices
