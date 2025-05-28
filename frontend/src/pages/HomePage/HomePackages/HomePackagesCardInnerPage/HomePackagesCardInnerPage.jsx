// import { useParams } from "react-router-dom"
// import HomePackagesCardinnnerHeroSection from "./HomePackagesCardinnnerHeroSectionSection/HomePackagesCardinnnerHeroSection"
// import HomePackagesCardinnnerFaqSection from "./HomePackagesCardinnnerFaqSection/HomePackagesCardinnnerFaqSection"
// import HomePackagesCardinnnerSimilarTourSection from "./HomePackagesCardinnnerSimilarTourSection/HomePackagesCardinnnerSimilarTourSection"
// import HeroImg1 from "../../../../assets/images/637921896094475779.png";
// import HeroImg2 from "../../../../assets/images/637921896896248600.png";
// import MapImg from "../../../../assets/images/map.png"

// const HomePackagesCardInnerPage = () => {

//     const { tourpackageSlag } = useParams();

//     const FormattedPath = tourpackageSlag
//         .toLowerCase()
//         .replace(/-/g, " ")
//         .replace(/[^a-z0-9\s]/g, "") // optional: remove non-alphanumeric
//         .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalizes each word

//     const TourPackagesInnerDataArr = {

//         "wildlife-tour": {

//             HeroImgs: [HeroImg1, HeroImg2],
//             TourDetails: {
//                 id: 1,
//                 TourNights: "7 Days",
//                 TourRoute: "Start AHMEDABAD and end in AHMEDABAD",
//                 Attractions: ["Ahmedabad", "Modhera", "Patan", "Vadodara"],

//             },
//             Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."],
//             MapImg: MapImg,

//             Faq: [

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//             ]

//         },

//         "textile-&-handicraft-tour": {

//             HeroImgs: [HeroImg2, HeroImg1],
//             TourDetails: {
//                 id: 2,
//                 TourNights: "7 Days",
//                 TourRoute: "Start AHMEDABAD and end in AHMEDABAD",
//                 Attractions: ["Ahmedabad", "Modhera", "Patan", "Vadodara"],
//                 Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."]

//             },
//             Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."],
//             MapImg: MapImg,

//             Faq: [

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//             ]

//         },
//         "tribal-tour": {

//             HeroImgs: [HeroImg1, HeroImg2],
//             TourDetails: {

//                 TourNights: "7 Days",
//                 TourRoute: "Start AHMEDABAD and end in AHMEDABAD",
//                 Attractions: ["Ahmedabad", "Modhera", "Patan", "Vadodara"],
//                 Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."]

//             },
//             Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."],
//             MapImg: MapImg,

//             Faq: [

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//             ]

//         },
//         "architecture-tour": {

//             HeroImgs: [HeroImg2, HeroImg1],
//             TourDetails: {

//                 TourNights: "7 Days",
//                 TourRoute: "Start AHMEDABAD and end in AHMEDABAD",
//                 Attractions: ["Ahmedabad", "Modhera", "Patan", "Vadodara"],
//                 Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."]

//             },
//             Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."],
//             MapImg: MapImg,

//             Faq: [

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//             ]

//         },
//         "odisha-tour-packages": {

//             HeroImgs: [HeroImg2, HeroImg1],
//             TourDetails: {

//                 TourNights: "7 Days",
//                 TourRoute: "Start AHMEDABAD and end in AHMEDABAD",
//                 Attractions: ["Ahmedabad", "Modhera", "Patan", "Vadodara"],
//                 Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."]

//             },
//             Highlight: ["The Tour Will start from Ahmedabad and will be ending in Vadodara. Gujarat is a blend of Temples, Wildlife, and of amazing architecture and a place full of enthusiasm and rich in culture and heritage."],
//             MapImg: MapImg,

//             Faq: [

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//                 {
//                     FaqTitle: "Day 1: Ahmedabad",
//                     FaqFact:
//                         "Arrival in Ahmedabad – a World Heritage City. Check into the hotel and after freshen up, visit Sabarmati Ashram – established by Mahatma Gandhi and one of the most important plac es in Indian Independence History. Visit Adalaj S tep well – a 5 storeyed intricately carved S tep well. Overnight in Ahmedabad.",
//                 },

//             ]

//         },



//     }

//     const FormattedData = TourPackagesInnerDataArr[tourpackageSlag];

//     return (

//         <div className="section">
//             <div className="container  flex flex-col gap-10 max-w-screen-xl mx-auto py-20 lg:px-10 px-2" >
//                 <HomePackagesCardinnnerHeroSection HeroImgs={FormattedData.HeroImgs} TourDetails={FormattedData.TourDetails} Heading={FormattedPath} MapImg={MapImg} Highlight={FormattedData.Highlight} />
//                 <HomePackagesCardinnnerFaqSection FaqData={FormattedData.Faq} />
//                 <HomePackagesCardinnnerSimilarTourSection />
//             </div>
//         </div>

//     )
// }

// export default HomePackagesCardInnerPage




import { useParams } from "react-router-dom"
import HomePackagesCardinnnerHeroSection from "./HomePackagesCardinnnerHeroSectionSection/HomePackagesCardinnnerHeroSection"
import HomePackagesCardinnnerFaqSection from "./HomePackagesCardinnnerFaqSection/HomePackagesCardinnnerFaqSection"
import HomePackagesCardinnnerSimilarTourSection from "./HomePackagesCardinnnerSimilarTourSection/HomePackagesCardinnnerSimilarTourSection"
import HeroImg1 from "../../../../assets/images/637921896094475779.png";
import HeroImg2 from "../../../../assets/images/637921896896248600.png";
import MapImg from "../../../../assets/images/map.png"
import BE_URL from "../../../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { formControlClasses } from "@mui/material";


const HomePackagesCardInnerPage = () => {

    const { tourpackageSlag } = useParams();

    const [TourPackagesInnerDataArr, setTourPackagesInnerDataArr] = useState([]);


    const FormattedPath = tourpackageSlag
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/[^a-z0-9\s]/g, "") // optional: remove non-alphanumeric
        .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalizes each word

    useEffect(() => {



    },[])


    return (

        <div className="section">
            <div className="container  flex flex-col gap-10 max-w-screen-xl mx-auto py-20 lg:px-10 px-2" >
                {/* <HomePackagesCardinnnerHeroSection />
                <HomePackagesCardinnnerSimilarTourSection /> */}
                <HomePackagesCardinnnerFaqSection FaqData={TourPackagesInnerDataArr.faqs} />
            </div>
        </div>

    )
}

export default HomePackagesCardInnerPage
