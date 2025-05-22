const ContactTouchUs = () => {
  return (

    <>

      <div className="section">


        <div className="container max-w-screen-xl mx-auto md:px-10 px-5 py-10 flex flex-col gap-10 ">


          <div className="flex justify-between items-center px-5">

            <h2 className="md:text-[2rem] text-[1.5rem] font-semibold text-gray-700">Stay in touch</h2>

            <a href="https://wa.me/+918347622244"><h2 className="text-[1.5rem] font-semibold text-gray-700">+91 83476 22244</h2></a>


          </div>


          <div className="flex md:flex-row flex-col justify-between gap-10 text-center">
            <div className="flex flex-row gap-5 p-10 relative items-start group md:w-1/2 w-full  rounded-2xl shadow-md/50  transition-all duration-300 ease-in">
              <div className="absolute top-0 left-0 w-full h-0 bg-orange-color -z-10 transition-all duration-500 ease-in-out group-hover:h-full rounded-2xl"></div>
              {/* <MdEmail size={30} className="text-orange-color mt-2 group-hover:text-white" /> */}
              <div className="flex flex-col gap-5 justify-center ">
                <h2 className="text-black font-semibold md:text-[1.5rem] text-[1.3rem] group-hover:text-white">Head office - Ahmedabad</h2>
                <p className="text-gray-500 font-semibold text-[1rem] group-hover:text-white">301, KALING Behind Bata Showroom Opp. Mount Carmel Convent school Ashram Road - 380009</p>
              </div>
            </div>


            <div className="flex flex-row gap-5 p-10 relative items-start group  md:w-1/2 w-full rounded-2xl shadow-md/50  transition-all duration-300 ease-in">
              <div className="absolute top-0 left-0 w-full h-0 bg-orange-color -z-10 transition-all duration-500 ease-in-out group-hover:h-full rounded-2xl"></div>
              {/* <FaPhoneAlt size={30} className="text-orange-color mt-2 group-hover:text-white" /> */}
              <div className="flex flex-col gap-5 justify-center ">
                <h2 className="text-black font-semibold md:text-[1.5rem] text-[1.3rem] group-hover:text-white">Branch office - Gandhinagar</h2>
                <p className="text-gray-500 font-semibold text-[1rem] group-hover:text-white">410, Pramukh Tangent, Above McDonald's, Sargasan Cross Road, Gandhinagar - 382421</p>
              </div>
            </div>
          </div>



        </div>

      </div>

    </>

  )
}

export default ContactTouchUs
