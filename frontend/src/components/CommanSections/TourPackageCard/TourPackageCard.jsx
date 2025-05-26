import { IoMdCheckmark } from "react-icons/io";



const TourPackageCard = ({ data_title, single_image, night, day, data_description, inclusions, multiple_images, highlight, from_city_id, to_city_id, attraction, faqs }) => {
  return (

    <>

      <div className="section">

        <div className="tour-package-card-container max-w-screen-xl mx-auto flex flex-col gap-5 px-10 py-10">

          <div className="flex flex-row ">

            <div>

              <img src={single_image} alt={data_title} className="h-60 object-cover" />

            </div>

            <div className="flex flex-col justify-around gap-2 px-5 w-2/2 ">

              <h2 className="text-[1.5rem] font-semibold">{data_title}</h2>

              <div>
                <span className="text-gray-500">{night} Nights / {day} Days</span>
              </div>
              <div className="text-gray-700">
                {data_description}
              </div>

            </div>

            <div className="w-1/2 ">

              <div className="flex flex-col  gap-2">

                <h2>Inclusions(Customizable)</h2>

                {

                  inclusions && inclusions.map((val, idx) => {


                    return (

                      <p className="flex  items-center gap-5 w-full"><IoMdCheckmark className="text-green-500 " size={20}/> {val}</p>
 
                    )
                  })

                }

                

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  )
}

export default TourPackageCard
