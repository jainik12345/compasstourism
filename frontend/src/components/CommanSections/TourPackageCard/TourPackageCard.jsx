import { IoMdCheckmark } from "react-icons/io";
import Inquiry from "../../butttons/inquiry";
import { NavLink } from "react-router-dom";

const TourPackageCard = ({ data_title, single_image, night, day, data_description, inclusions, }) => {


  return (

    <>

      <div className="section">

        <div className="tour-package-card-container max-w-screen-xl mx-auto flex flex-col lg:px-10 px-5 py-10">

          <NavLink to={""} className="flex lg:flex-row flex-col hover:shadow-[0px_0px_5px_5px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in">

            <div>

              <img src={single_image} alt={data_title} className="h-80 w-full object-cover" />

            </div>

            <div className="flex flex-col justify-around gap-2 p-3 md:w-2/2 border-t border-gray-400 md:border-b border-r border-l">

              <h2 className="text-[1.5rem] font-semibold text-justify">{data_title}</h2>


              <p className="text-gray-500 text-justify rounded-full border border-gray-400 w-fit py-1 px-3">{night} Nights / {day} Days</p>

              <p className="text-gray-700 text-justify">{data_description}</p>

            </div>

            <div className="lg:w-1/2 md:border-t md:border-l-0 border-l p-2 border-r border-b border-gray-400 bg-gray-100">

              <div className="flex flex-col justify-around px-2 h-full gap-2">

                <h2 className="font-semibold text-[1.3rem] text-gray-600">Inclusions(Customizable)</h2>
                <div className="flex flex-col gap-2">
                  {

                    inclusions && inclusions.map((val, idx) => {


                      return (

                        <p key={idx} className="flex text-[1rem] font-semibold text-gray-700 items-center gap-5 w-full"><IoMdCheckmark className="text-green-500 " size={20} /> {val}</p>

                      )
                    })

                  }
                </div>
                <Inquiry Text="Inquire Now" Route={`/inquiry-now/${data_title}`} />

              </div>

            </div>

          </NavLink>

        </div>

      </div>

    </>

  )
}

export default TourPackageCard
