import CardBgImg from "../../../assets/images/big_banner.png"
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import BE_URL from "../../../config";


const BestHotelsSection = () => {

    const [BestHotelsCards, setBestHotelsCards] = useState([]);

    useEffect(() => {

        const FetchBestHotelData = async () => {

            try {

                //fetching the data from api and storing in the variable 
                const FetchResponse = await axios.get(`${BE_URL}/hotelCityName`);
                const FormattedResponse = FetchResponse.data.data;

                if (FetchResponse.status === 200) {

                    setBestHotelsCards(FormattedResponse)

                } else {

                    console.error("bad request code received :- ", FetchResponse.status)

                }


            } catch (error) {

                console.log("Unable to fetch the search bar cities data from this api:- ", error);

            }

        }

        FetchBestHotelData();

    }, [])

    console.log(BestHotelsCards);

    return (
        <>

            {/* Banner */}
            <div className="max-w-screen-xl  mx-auto py-10 flex flex-col gap-10">
                <div className="bg-[#e7ebc3] rounded-md text-center p-4 text-gray-800 font-medium ">
                    Due to the huge influx of tourists in India, We offers a wide range of luxury, deluxe and budget hotels to them. Choose to stay in luxury and comfort with greatest discounts available. BEST PRICE on all Hotel Booking with Increased Commission
                </div>
            </div>

            {/* //Book Hotels at Popular Destinations */}


            <div className="section">
                <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-5">
                    Book Hotels at Popular Destinations
                </h2>
                <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-screen-xl mx-auto px-5 py-5">

                    {BestHotelsCards &&
                        BestHotelsCards.map((val, idx) => (
                            <NavLink
                                // to={`${hotelNameSlag}/${val.city_name.toLowerCase().replace(/\s+/g, "-")}`}
                                  to={`/hotel/${val.city_name.toLowerCase().replace(/\s+/g, "-")}`}
                                className="card-cont bg-white flex flex-col rounded-xl border border-gray-300 overflow-hidden shadow-none transition hover:shadow-md"
                                key={idx}
                            >
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <img
                                        src={CardBgImg}
                                        alt="IMG"
                                        className="h-60 w-full bg-cover"
                                    />
                                </div>
                                <div className="card-city-name bg-gray-100 py-4 w-full  ">
                                    <h2 className="text-center text-base font-medium text-gray-800">{val.city_name}</h2>
                                </div>
                            </NavLink>
                        ))}
                </div>
            </div>
        </>
    )
}

export default BestHotelsSection
