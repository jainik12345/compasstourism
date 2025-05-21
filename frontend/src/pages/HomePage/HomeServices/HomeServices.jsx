import { NavLink } from "react-router-dom"
import Img1 from "../../../assets/images/637921896094475779.png";
import Img2 from "../../../assets/images/637921896896248600.png";

const HomeServices = () => {
  return (

    <>

      <div className="section">

        <div className="container mx-auto max-w-screen-xl py-10 md:px-10 px-5 flex md:flex-row flex-col justify-center items-center gap-10">

          <div className="flex flex-col md:items-start items-center md:w-2/3 w-full gap-5">

            <h2 className="font-semibold text-2xl ">24/7 Customer Support</h2>

            <p className="font-semibold text-[1rem] text-gray-500">Our team of experienced tour specialists have travelled to hundreds of countries around the globe and have decades of first-hand travel experience to share. Contact us now to have all of your tour-related questions answered!</p>

            <NavLink className="bg-orange-color py-3 px-20 w-fit font-bold text-white rounded-sm" to={""}>
              Contact Us
            </NavLink>

          </div>

          <div className="flex justify-center items-center translate-x-10">

            <img src={Img2} alt="IMG" className="rounded-full z-45 h-20 w-20 " />
            <img src={Img1} alt="IMG" className="rounded-full z-40 h-20 w-20 -translate-x-5" />
            <img src={Img2} alt="IMG" className="rounded-full z-30 h-20 w-20 -translate-x-10" />
            <img src={Img1} alt="IMG" className="rounded-full z-20 h-20 w-20 -translate-x-15" />
            <img src={Img2} alt="IMG" className="rounded-full z-10 h-20 w-20 -translate-x-20" />

          </div>

        </div>

      </div>

    </>

  )
}

export default HomeServices
