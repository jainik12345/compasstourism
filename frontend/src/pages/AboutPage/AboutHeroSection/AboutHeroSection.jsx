import Img from "..//../../assets/images/637921896094475779.png"

const AboutHeroSection = () => {

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

            <h2 className=" mx-auto max-w-screen-2xl text-[1.5rem] font-semibold pl-20  ">About Us</h2>

            { 


                AboutHeroDataArr && AboutHeroDataArr.map((val,idx)=>{

                  return(        

                  <div className="flex py-10 max-w-screen-2xl mx-auto gap-10">


                    <div className="content flex flex-col justify-around items-center pl-20  gap-10 w-1/2">
 
                      {
                        val.para && val.para.map((ParaVal,Index)=>{

                          return(


                            <p className="text-[1rem] text-gray-700 font-[600] text-justify">{ParaVal}</p>


                          )


                        })

                      }


                    </div>

                    <div className="about-img w-1/2">

                      <img src={val.ImgUrl} alt="img" className="h-100 rounded-tl-2xl rounded-bl-2xl"/>

                    </div>

                   </div>
                  )

                })

            }
            

      </div>

    </>
  )
}

export default AboutHeroSection




// <motion.div className="Statue-Img flex flex-col justify-center items-center text-center gap-3" key={ValIdx} initial={{ opacity: 0, x: -50 }}
                                                
//                                                     whileInView={{ opacity: 1, x: 0 }}
//                                                     transition={{ duration: 0.6, delay: ValIdx * 0.2 }}
//                                                     viewport={{ once: true }}>

//                                                     <img src={ValImg.ImgUrl} alt="IMG" className="md:h-50 h-90" />

//                                                     <h3 className="font-[700] text-orange-color xl:text-[1rem] lg:text-[.9rem] md:text-[.7rem] text-[1.5rem]">{ValImg.ImgTitle}</h3>

//                                                     <h4 className="text-gray-600 font-[600] xl:text-[1rem] lg:text-[.9rem] md:text-[.7rem] text-[1.3rem]">{ValImg.Height}</h4>

//                                                 </motion.div>