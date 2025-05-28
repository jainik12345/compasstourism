import { useParams } from "react-router-dom";
import IndianCityPageBanner from "../IndianCityPage/IndianCityPageBanner/IndianCityPageBanner";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import BgImg from "../../assets/images/637921896094475779.png"
import axios from "axios";
import BE_URL from "../../config";


const IndiaDropDownPages = () => {

    //  variable declaration

    const { StateNameSlag } = useParams();

    const FormattedPath = StateNameSlag
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\b\w/g, (char) => char.toUpperCase());


    const [city, setCity] = useState("ALL");


    // Handle change function for selector 

    const handleChange = (event) => {
        setCity(event.target.value);
    };


    //fetching of this page 


    useEffect(() => {

        const FetchIndiaDropDownData = async () => {

            try {

                // 1. Fetch all package names
                const FetchResponse = await axios.get(`${BE_URL}/packageStateName`);
                const allPackages = FetchResponse.data.data;

                console.log(allPackages)
                
                
            } catch (error) {
                console.error("Error fetching package data:", error);

            }

        }

        FetchIndiaDropDownData()
    })


    return (

        <>

            <IndianCityPageBanner Heading={FormattedPath} BgImg={BgImg} />


            <div className="max-w-screen-xl mx-auto flex justify-end items-center py-10">
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

                        {["Goa", "Delhi", "Mumbai", "Bangalore", "Kolkata"].map(
                            (cityName, index) => (
                                <MenuItem key={index} value={cityName}>
                                    {cityName}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </FormControl>
            </div>


        </>



    )
}

export default IndiaDropDownPages
