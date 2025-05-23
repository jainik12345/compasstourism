import { useState, useEffect } from "react";
import Img from "..//../../assets/images/637921896094475779.png"
import { motion } from "framer-motion";


const AboutHeroSection = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    handleResize(); // ensure initial load matches the current screen size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const AboutHeroDataArr = [

    {
      ImgUrl: Img,

      para: ["Establishes in 2011, Compass tourism is an Ahmedabad based Destination Management Company handling all the travel related services for Gujarat. We are authorized travel agent from Gujarat tourism and have a rich and varied experience in receiving and entertaining guests from all walks of life and all corner of the world. The company has seen exceptional growth in the past years owing to the quality in services and commitment and also to the overall growth of the Gujarat as a global destination It gives us great pleasure to share that we are not just any travel company, but we are a team of strong willed individual who share a strong sense of love for travelling. And fortunately we are based in a location where life is all about enjoying different colours.",
        "Gujarat is an emerging commercial hub with all kinds of businesses thriving in each corner. Ideally located on the western part of the India, it has pristine and untouched beaches, rare wildlife destinations, exceptional ecosystems and a vast spread history of culture, art, religion, textile, architecture and heritage surrounding the lives of the people around it, and we aim to explore and present the most amazing tour packages for you covering all these tourism aspects. We cater to more than 3000 independent travellers ranging from all parts of the world with several travel needs and have an equally strong group travellers."
      ]
    },


  ]

  return (
    <>

      <div className="section py-20">

        <h2 className=" mx-auto max-w-screen-xl text-[1.5rem] font-semibold text-center  ">About Us</h2>

        {


          AboutHeroDataArr && AboutHeroDataArr.map((val, idx) => {

            const isEven = idx % 2 === 0;


            return (

              <div className={`flex  py-10 max-w-screen-xl mx-auto md:gap-10 gap-0 ${isMobile ? "flex-col" : isEven ? "flex-row" : "flex-row-reverse"}`} key={idx}>



                <motion.div className={`content flex flex-col justify-around items-center  ${isMobile ? "px-5" : isEven ? "pl-20" : "pr-20"}  gap-10 xl:w-1/2 w-full`} initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}>

                  {
                    val.para && val.para.map((ParaVal, Index) => {

                      return (


                        <p className="text-[1rem] text-gray-700 font-[600] text-justify" key={Index}>{ParaVal}</p>


                      )


                    })

                  }


                </motion.div>

                <motion.div className="about-img xl:w-1/2 w-full flex justify-center" initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}>

                  <img src={val.ImgUrl} alt="img" className={`h-100 rounded-2xl lg:p-0 p-2`} />

                </motion.div>

              </div>
            )

          })

        }


      </div>

    </>
  )
}

export default AboutHeroSection




// <motion.div className="Statue-Img flex flex-col justify-center items-center text-center gap-3" key={ValIdx}
//
//                                                     initial={{ opacity: 0, x: -50 }}
//                                                     whileInView={{ opacity: 1, x: 0 }}
//                                                     transition={{ duration: 0.6, delay: ValIdx * 0.2 }}
//                                                     viewport={{ once: true }}>

//                                                     <img src={ValImg.ImgUrl} alt="IMG" className="md:h-50 h-90" />

//                                                     <h3 className="font-[700] text-orange-color xl:text-[1rem] lg:text-[.9rem] md:text-[.7rem] text-[1.5rem]">{ValImg.ImgTitle}</h3>

//                                                     <h4 className="text-gray-600 font-[600] xl:text-[1rem] lg:text-[.9rem] md:text-[.7rem] text-[1.3rem]">{ValImg.Height}</h4>

//                                                 </motion.div>