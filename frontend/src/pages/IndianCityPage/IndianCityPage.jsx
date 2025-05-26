import { useParams } from "react-router-dom";
import IndianCityPageBanner from "./IndianCityPageBanner/IndianCityPageBanner"; // ✅ Import your banner component
import BgImg from "../../assets/images/637921896094475779.png"
import TourPackageCard from "../../components/CommanSections/TourPackageCard/TourPackageCard";
import React, { useState } from "react";

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


import PackageImg from "../../assets/images/637921896094475779.png"


const IndianCityPage = () => {
  // Extracting the city name from the URL parameters
  const { cityName } = useParams();

  // Formatting the city name for display
  // This will convert the city name to a more readable format

  const FormattedPath = cityName
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/[^a-z0-9\s]/g, "") // optional: remove non-alphanumeric
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalizes each word

  const [city, setCity] = useState("ALL");
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const IndiaCitiesTourData = [

    {

      data_title: "Wildlife Tour",
      single_image: PackageImg,
      night: 6,
      day: 7,
      data_description: "The Main Highlight of this itinerary is Visiting all the beautiful Beaches like Candolim Beach, Baga Beach, and all the UNESCO-listed Churches and doing all the adventure stuff like Parasailing, Scuba Diving, and Snorkeling.",
      inclusions: ["Breakfast", "Lunch", "Dinner"],
      multiple_images: [
        "1748241823440-about_bg_image.jpeg",
        "1748241823445-about_image_1.webp",
        "1748241823452-about_image_2.webp"
      ],
      highlight: null,
      from_city_id: 1,
      to_city_id: 3,
      attraction: ["Velavadar", "Gir", "Bajana", "Nal Sarovar"],
      faqs: [
        {
          answer: "Ahmedabad Answer",
          question: "Ahmedabad Question"
        }
      ],
    }

  ]


  // Sample data for Indian cities

  const IndianCityNameData = [

    {
      name: "Goa",
    },
    {
      name: "Delhi",
    },
    {
      name: "Mumbai",
    },
    {
      name: "Bangalore",
    },
    {
      name: "Kolkata",
    },
    {
      name: "Chennai",
    },
    {
      name: "Hyderabad",
    },
    {
      name: "Pune",
    },

  ]

  return (

    <>
      {/* Banner section */}
      <IndianCityPageBanner Heading={FormattedPath} BgImg={BgImg} />

      {/* Package Details section */}

      <div className="package-details-container flex flex-col gap-5 p-10 max-w-screen-xl mx-auto">

        <h2 className="text-[1.5rem] font-bold ">{FormattedPath} Tour Packages</h2>

        <p className="text-[1rem] text-gray-600 text-justify">
          When in Goa, do as the Goans do; leave your watch at home. Honestly speaking, time is not of too much importance in this small state of India. Goa, an emerald land, is a ‘state’ of mind. A mind that is completely relaxed, content, and jubilant. Located on the West Coast of India in the Konkan Region, Goa is a major tourist attraction for domestic and foreign tourists alike. Panaji, a picturesque city by the river Mandovi is the capital of Goa. Margao is the largest city and Vasco da Gamais the largest port city. With endless stretches of white sand, palm-fringed beaches, brightly painted houses, and Portuguese heritage, Goa is breathtaking. Water sports, river cruises, ayurvedic massage centers, live music, restaurants, mouth-watering seafood, Goa has it all. A variety of accommodation options ranging from luxury hotels, and beautiful villas to moderately priced hotels and bed & breakfast units, is another feature of Goa that makes it a destination of choice for all. Dudhsagar waterfalls tumbling from a staggering height are a must-visit and so are the nearby wildlife sanctuaries. Spice farms, old heritage Portuguese villas, churches, temples, and architecture are other riveting aspects of Goa. Come, be part of the Goa Carnival in February and sing, dance, and be merry with the locals. Myriad experiences of Goa promise to make your holiday an everlasting experience.
        </p>

      </div>

      {/* City Select Dropdown */}
      <div className="max-w-screen-xl mx-auto  flex justify-end items-center">
        <FormControl className="w-50">
          <InputLabel id="city-select-label">Cities</InputLabel>
          <Select
            labelId="city-select-label"
            id="cities"
            value={city}
            label="Cities"
            name="Cities"
            onChange={handleChange}
          >
            <MenuItem value="ALL">All</MenuItem>
            {IndianCityNameData.map((cityObj, index) => (
              <MenuItem key={index} value={cityObj.name}>
                {cityObj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Tour Package Cards Section */}

      {

        IndiaCitiesTourData && IndiaCitiesTourData.map((val, idx) => {

          return (

            <TourPackageCard key={idx} data_title={val.data_title} single_image={val.single_image} night={val.night} day={val.day} data_description={val.data_description} inclusions={val.inclusions} multiple_images={val.multiple_images} highlight={val.highlight} from_city_id={val.from_city_id} to_city_id={val.to_city_id} attraction={val.attraction} faqs={val.faqs} />

          )

        })

      }
    </>
  );
};

export default IndianCityPage;
