import { useParams } from "react-router-dom"
import BlogImg from "../../../../assets/images/637921896094475779.png";
import axios from "axios"
import { useEffect, useState } from "react"
import BE_URL from "../../../../config";


export const HomeBlogInnerPage = () => {

    const BlogInnerDataArr = [

        {

            BlogImg: BlogImg,
            BlogTitle: "A Comprehensive Guide On Planning Your Perfect Trip To The Raan Of Kutch, Gujarat",
            Data: [

                {

                    Heading: "Introduction:",
                    Para: "Embark on a mesmerizing journey to the enchanting Rann of Kutch in Gujarat, where vast expanses of white salt desert stretch as far as the eye can see. This unique destination promises a surreal experience, and with the right planning, your trip can be nothing short of perfect. In this guide, we'll walk you through the essential steps to ensure an unforgettable adventure. Plus, discover the convenience of Kutch Bhuj Tour Packages with Compass Tourism for a seamless and well-organized expedition.",

                },
                {

                    Heading: "Introduction:",
                    Para: "Embark on a mesmerizing journey to the enchanting Rann of Kutch in Gujarat, where vast expanses of white salt desert stretch as far as the eye can see. This unique destination promises a surreal experience, and with the right planning, your trip can be nothing short of perfect. In this guide, we'll walk you through the essential steps to ensure an unforgettable adventure. Plus, discover the convenience of Kutch Bhuj Tour Packages with Compass Tourism for a seamless and well-organized expedition.",

                },
                {

                    Heading: "Introduction:",
                    Para: "Embark on a mesmerizing journey to the enchanting Rann of Kutch in Gujarat, where vast expanses of white salt desert stretch as far as the eye can see. This unique destination promises a surreal experience, and with the right planning, your trip can be nothing short of perfect. In this guide, we'll walk you through the essential steps to ensure an unforgettable adventure. Plus, discover the convenience of Kutch Bhuj Tour Packages with Compass Tourism for a seamless and well-organized expedition.",

                },
                {

                    Heading: "Introduction:",
                    Para: "Embark on a mesmerizing journey to the enchanting Rann of Kutch in Gujarat, where vast expanses of white salt desert stretch as far as the eye can see. This unique destination promises a surreal experience, and with the right planning, your trip can be nothing short of perfect. In this guide, we'll walk you through the essential steps to ensure an unforgettable adventure. Plus, discover the convenience of Kutch Bhuj Tour Packages with Compass Tourism for a seamless and well-organized expedition.",

                },
                {

                    Heading: "Introduction:",
                    Para: "Embark on a mesmerizing journey to the enchanting Rann of Kutch in Gujarat, where vast expanses of white salt desert stretch as far as the eye can see. This unique destination promises a surreal experience, and with the right planning, your trip can be nothing short of perfect. In this guide, we'll walk you through the essential steps to ensure an unforgettable adventure. Plus, discover the convenience of Kutch Bhuj Tour Packages with Compass Tourism for a seamless and well-organized expedition.",

                },


            ]

        }

    ]



    return (

        <>

            {

                BlogInnerDataArr && BlogInnerDataArr.map((Val, Idx) => {

                    return (

                        <div className="container max-w-screen-xl mx-auto py-10 lg:px-20 md:px-10 px-5 flex flex-col items-center gap-10" key={Idx}>

                            <div className="">

                                <img src={Val.BlogImg} alt="IMG" className="h-100  object-cover" />

                            </div>

                            <div className="heading ">

                                <h2 className="heading md:text-[1.5rem] text-[1.3rem] font-[400] text-gray-700">{Val.BlogTitle}</h2>

                            </div>

                            <div className="content flex flex-col gap-5">

                                {

                                    Val.Data && Val.Data.map((DataVal, DataIdx) => {

                                        return (

                                            <div key={DataIdx}>

                                                <h2 className="heading text-[1.2rem] font-semibold text-gray-800 mb-3">{DataVal.Heading}</h2>
                                                <p className="heading text-[.9rem] font-semibold text-gray-600 text-justify">{DataVal.Para}</p>

                                            </div>

                                        )

                                    })

                                }

                            </div>

                        </div>

                    )

                })

            }

        </>

    )
}

export default HomeBlogInnerPage