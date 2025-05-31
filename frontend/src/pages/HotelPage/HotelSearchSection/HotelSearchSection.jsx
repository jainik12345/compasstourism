import { useEffect, useState } from "react";
import BgHotelImg from "../../../assets/images/download.png";
import { Popover, IconButton, Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import { Checkbox } from "@mui/material";
import BE_URL from "../../../config";
import axios from "axios";

const HotelSearchSection = () => {

    //cities usestate denifination
    const [SearchCities, setSearchCities] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    //using useEffect to fetch the data

    useEffect(() => {

        const FetchTheSearchCitiesData = async () => {

            try {

                //fetching the data from api and storing in the variable 
                const FetchResponse = await axios.get(`${BE_URL}/hotelCityName`);
                const FormattedResponse = FetchResponse.data.data;

                if (FetchResponse.status === 200) {

                    setSearchCities(FormattedResponse);

                } else {

                    console.error("bad request code received :- ", FetchResponse.status)

                }


            } catch (error) {

                console.log("Unable to fetch the search bar cities data from this api:- ", error);

            }

        }

        FetchTheSearchCitiesData();

    }, [])

    // // Example cities; replace with your real list or API
    const cities = [
        { label: "Delhi, India" },
        { label: "Mumbai, India" },
        { label: "Bangalore, India" },
        { label: "Chennai, India" },
        { label: "Kolkata, India" },
    ];

    // States for city, dates
    const [selectedCity, setSelectedCity] = useState(cities[0]);
    const [checkIn, setCheckIn] = useState(dayjs("2025-06-01"));
    const [checkOut, setCheckOut] = useState(dayjs("2025-06-02"));


    //room and guest section

    const [anchorEl, setAnchorEl] = useState(null);
    const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);

    const open = Boolean(anchorEl);

    //hotel stars data

    const STAR_OPTIONS = [
        { value: 1, label: "1 Star" },
        { value: 2, label: "2 Star" },
        { value: 3, label: "3 Star" },
        { value: 4, label: "4 Star" },
        { value: 5, label: "5 Star" },
    ];

    // Calculate total guests
    const totalGuests = rooms.reduce(
        (sum, room) => sum + room.adults + room.children,
        0
    );

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleAdultChange = (roomIdx, delta) => {
        setRooms((prev) =>
            prev.map((room, idx) =>
                idx === roomIdx
                    ? {
                        ...room,
                        adults: Math.max(1, room.adults + delta),
                    }
                    : room
            )
        );
    };

    const handleChildChange = (roomIdx, delta) => {
        setRooms((prev) =>
            prev.map((room, idx) =>
                idx === roomIdx
                    ? {
                        ...room,
                        children: Math.max(0, room.children + delta),
                    }
                    : room
            )
        );
    };

    const handleAddRoom = () => setRooms([...rooms, { adults: 1, children: 0 }]);


    //hotel stars logic 

    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([4, 5]); // Default to 4,5 Star

    const popoverOpen = Boolean(popoverAnchor);

    const handlePopoverOpen = (event) => setPopoverAnchor(event.currentTarget);
    const handlePopoverClose = () => setPopoverAnchor(null);

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category].sort()
        );
    };

    // Display as "4, 5 Star" or "3 Star" etc.
    const categoryDisplayText =
        selectedCategories.length === 0
            ? "Any"
            : selectedCategories.map((c) => `${c}`).join(", ") +
            (selectedCategories.length === 1 ? " Star" : " Star");

    return (
        <>
            <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${BgHotelImg})` }}>
                <div className="max-w-screen mx-auto bg-white relative">
                    {/* Header */}
                    <div className="bg-bghotel-color h-40 flex items-start justify-center ">
                        <h1 className=" py-6 text-2xl font-semibold text-white">
                            Cheapest Price. Guaranteed!
                        </h1>
                    </div>

                    {/* Search Panel */}
                    <div className="px-3 sm:px-0 py-20 flex justify-center ">

                        <div className=" bg-white flex flex-col gap-10 rounded-md shadow-lg p-6 md:mx-10 mx-3 absolute top-20">
                            <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-10 pt-3 pb-10 ">
                                {/* City */}
                                <div className="w-full">
                                    <div className="flex flex-col justify-center h-full px-6 py-2 rounded-md border border-gray-200 bg-white">
                                        <div className="text-xs text-gray-500 font-semibold mb-1">ENTER CITY NAME</div>
                                        <Autocomplete
                                            freeSolo
                                            value={selectedCity}
                                            onInputChange={(event, newInputValue) => setSelectedCity(newInputValue)}
                                            options={SearchCities.map(option => option.city_name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    type="search"
                                                    size="small"
                                                    placeholder="Search city"
                                                    variant="standard"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: "search",
                                                        style: { fontWeight: 600, fontSize: "1rem" },
                                                        disableUnderline: true,
                                                    }}
                                                    InputLabelProps={{ shrink: true }}
                                                    sx={{
                                                        width: "100%",
                                                        "& .MuiInputBase-root": {
                                                            fontWeight: 600,
                                                            fontSize: "1.125rem",
                                                            boxShadow: "none !important",
                                                            backgroundColor: "transparent",
                                                            paddingY: "3px"
                                                        },
                                                        "& .MuiAutocomplete-endAdornment": {
                                                            display: "none",
                                                        },
                                                    }}
                                                />
                                            )}
                                            popupIcon={null}
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputBase-root": {
                                                    fontWeight: 600,
                                                    fontSize: "1.125rem",
                                                    padding: 0,
                                                    boxShadow: "none !important",
                                                },
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { border: "none !important" },
                                                    "&:hover fieldset": { border: "none !important" },
                                                    "&.Mui-focused fieldset": { border: "none !important" },
                                                    boxShadow: "none !important",
                                                },
                                                "& .MuiAutocomplete-endAdornment": {
                                                    display: "none",
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* Check In */}
                                <div className="w-full">
                                    <div className="flex flex-col justify-center h-full px-6 py-2 rounded-md border border-gray-200 bg-white">
                                        <div className="text-xs text-gray-500 font-semibold mb-1">CHECK IN</div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={checkIn}
                                                onChange={(date) => setCheckIn(date)}
                                                format="DD-MM-YYYY"
                                                slots={{ openPickerIcon: CalendarMonthIcon }}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        fullWidth: true,
                                                        variant: "standard",
                                                        InputProps: {
                                                            style: { fontWeight: 600, fontSize: "1rem" },
                                                            disableUnderline: true,
                                                        },
                                                        sx: {
                                                            width: "100%",
                                                            "& .MuiInputBase-root": {
                                                                fontWeight: 600,
                                                                fontSize: "1.125rem",
                                                                boxShadow: "none !important",
                                                                "&:before, &:after": {
                                                                    borderBottom: "none !important",
                                                                },
                                                                backgroundColor: "transparent",
                                                                paddingY: "3px"
                                                            },
                                                            "& .MuiInputAdornment-root": {
                                                                marginLeft: "2px",
                                                                marginRight: "4px",
                                                            },
                                                            minHeight: "32px",
                                                        },
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                {/* Check Out */}
                                <div className="w-full">
                                    <div className="flex flex-col justify-center h-full px-6 py-2 rounded-md border border-gray-200 bg-white">
                                        <div className="text-xs text-gray-500 font-semibold mb-1">CHECK OUT</div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={checkOut}
                                                onChange={(date) => setCheckOut(date)}
                                                format="DD-MM-YYYY"
                                                slots={{ openPickerIcon: CalendarMonthIcon }}
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                        fullWidth: true,
                                                        variant: "standard",
                                                        InputProps: {
                                                            style: { fontWeight: 600, fontSize: "1rem" },
                                                            disableUnderline: true,
                                                        },
                                                        sx: {
                                                            width: "100%",
                                                            "& .MuiInputBase-root": {
                                                                fontWeight: 600,
                                                                fontSize: "1.125rem",
                                                                boxShadow: "none !important",
                                                                "&:before, &:after": {
                                                                    borderBottom: "none !important",
                                                                },
                                                                backgroundColor: "transparent",
                                                                paddingY: "3px"
                                                            },
                                                            "& .MuiInputAdornment-root": {
                                                                marginLeft: "2px",
                                                                marginRight: "4px",
                                                            },
                                                            minHeight: "32px",
                                                        },
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                {/* Rooms & Guests */}
                                <div className="w-full">
                                    {/* Summary Button */}
                                    <div
                                        className="flex flex-col justify-center h-full px-6 py-2 cursor-pointer rounded-md border border-gray-200 bg-white"
                                        onClick={handleOpen}
                                    >
                                        <div className="text-xs text-gray-500 font-semibold">ROOMS & GUESTS</div>
                                        <div className="font-semibold text-base">{rooms.length} Room - {totalGuests} Guest{totalGuests > 1 ? "s" : ""}</div>
                                    </div>

                                    {/* Popover */}
                                    <Popover
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                        PaperProps={{
                                            className: "rounded-xl shadow-lg",
                                            style: { minWidth: 400, padding: 0, marginTop: 8 },
                                        }}
                                    >
                                        <Box className="p-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="font-semibold text-base">Guests</div>
                                                <IconButton size="small" onClick={handleClose}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                            {rooms.map((room, idx) => (
                                                <div key={idx} className="mb-3 flex flex-col">
                                                    <div className="text-sm font-medium mb-2">Room - {idx + 1}</div>
                                                    <div className="flex gap-4">
                                                        <div>
                                                            <div className="text-xs text-gray-500 mb-1">Adult</div>
                                                            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 bg-gray-50">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleAdultChange(idx, -1)}
                                                                    disabled={room.adults <= 1}
                                                                >
                                                                    <RemoveIcon fontSize="small" />
                                                                </IconButton>
                                                                <span className="mx-2 text-sm font-medium">{room.adults} Adult</span>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleAdultChange(idx, 1)}
                                                                >
                                                                    <AddIcon fontSize="small" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-gray-500 mb-1">Child</div>
                                                            <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 bg-gray-50">
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleChildChange(idx, -1)}
                                                                    disabled={room.children <= 0}
                                                                >
                                                                    <RemoveIcon fontSize="small" />
                                                                </IconButton>
                                                                <span className="mx-2 text-sm font-medium">{room.children} Child</span>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleChildChange(idx, 1)}
                                                                >
                                                                    <AddIcon fontSize="small" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* Add Room Button */}
                                            <div className="flex justify-end">
                                                <Button
                                                    startIcon={<AddIcon className="ml-3" />}
                                                    onClick={handleAddRoom}
                                                    variant="contained"
                                                    color="error"
                                                    className="rounded-full "
                                                    sx={{
                                                        borderRadius: "50%",
                                                        minWidth: "40px",
                                                        minHeight: "40px",
                                                        padding: 0,
                                                        backgroundColor: "#f87171", // Tailwind red-400
                                                        "&:hover": { backgroundColor: "#ef4444" }, // Tailwind red-500
                                                        boxShadow: "none"
                                                    }}
                                                />
                                            </div>
                                        </Box>
                                    </Popover>
                                </div>
                                {/* Hotel Category */}
                                <div className="w-full">
                                    {/* Summary Box */}
                                    <div
                                        className="flex flex-col justify-center h-full px-6 py-2 cursor-pointer rounded-md border border-gray-200 bg-white"
                                        onClick={handlePopoverOpen}
                                    >
                                        <div className="text-xs text-gray-500 font-semibold">HOTEL CATEGORY</div>
                                        <div className="font-semibold text-base">
                                            {categoryDisplayText}
                                        </div>
                                    </div>

                                    {/* Popover */}
                                    <Popover
                                        open={popoverOpen}
                                        anchorEl={popoverAnchor}
                                        onClose={handlePopoverClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                        PaperProps={{
                                            className: "rounded-xl shadow-lg",
                                            style: { minWidth: 220, padding: 0, marginTop: 8 },
                                        }}
                                    >
                                        <Box className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="font-semibold text-base">Star Category</div>
                                                <IconButton size="small" onClick={handlePopoverClose}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {STAR_OPTIONS.map((option) => (
                                                    <label
                                                        key={option.value}
                                                        className="flex items-center gap-2 cursor-pointer select-none"
                                                    >
                                                        <Checkbox
                                                            size="small"
                                                            checked={selectedCategories.includes(option.value)}
                                                            onChange={() => handleCategoryToggle(option.value)}
                                                            sx={{
                                                                color: "#cbd5e1",
                                                                "&.Mui-checked": { color: "#3b82f6" }, // Tailwind blue-500
                                                            }}
                                                        />
                                                        <span className="text-sm">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </Box>
                                    </Popover>
                                </div>
                            </div>
                            <div className="flex justify-center absolute lg:top-[82%] md:top-[92%] md:left-[30%] lg:left-[39%] top-[92%] left-[20%]">
                                <button className="bg-[#2196f3] cursor-pointer hover:bg-[#1e88e5] text-white text-lg font-semibold px-20 py-3 rounded-full shadow transition">
                                    Search Hotels
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default HotelSearchSection
