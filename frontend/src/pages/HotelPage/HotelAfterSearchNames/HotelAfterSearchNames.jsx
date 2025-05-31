// import { useParams } from "react-router-dom"

// const HotelAfterSearchNames = () => {
//     const { hotelNameSlag } = useParams();
//     const name = hotelNameSlag;
//     return (
//         <div>
//             Hotel After Search Names Section
//             <h2>{name}</h2>
//         </div>
//     )
// }

// export default HotelAfterSearchNames


import { useParams } from "react-router-dom";

const HotelAfterSearchNames = () => {
    const { hotelNameSlag } = useParams();

    const displayCity = hotelNameSlag
        ? hotelNameSlag.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
        : "";

    return (
        <div>
            <h2>Hotel After Search Names Section</h2>
            <h1>{displayCity}</h1>
        </div>
    );
};

export default HotelAfterSearchNames;