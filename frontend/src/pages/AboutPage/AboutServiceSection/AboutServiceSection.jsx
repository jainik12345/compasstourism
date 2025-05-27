import { FaEarthAmericas } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { TbRosetteDiscountFilled } from "react-icons/tb";


const AboutServiceSection = () => {


  const ServiceDataArr = [

    {
      Title: "Best services",
      Para: "Phaseus site amet tristique ligua donec iaculis leo sus cipit. Consec tetur adipiscing elit. Incididunt ut dolore."
    },

  ]

  return (

    <>

      <div className="section">

        <div className="container max-w-screen-xl mx-auto py-20 md:px-10 px-5 gap-5 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">

          {

            ServiceDataArr && ServiceDataArr.map((Val, Idx) => {


              return (

                <>


                  <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

                    <FaEarthAmericas size={30} />

                    <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

                    <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>

                  </div>

                  <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

                    <FaMoneyBill size={30} />

                    <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

                    <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>


                  </div>


                  <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

                    <FaStar size={30} />

                    <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

                    <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>

                  </div>

                  <div className="shadow-[0px_0px_20px_5px_rgba(0,0,0,0.1)] w-full rounded-2xl flex flex-col gap-5 p-5">

                    <TbRosetteDiscountFilled size={30} />

                    <h2 className="text-[1.5rem] font-semibold text-gray-800">{Val.Title}</h2>

                    <p className="text-[1rem] font-semibold text-gray-600 text-justify">{Val.Para}</p>


                  </div>

                </>

              )


            })

          }

        </div>

      </div>

    </>

  )
}

export default AboutServiceSection
