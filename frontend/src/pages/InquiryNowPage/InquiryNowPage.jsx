import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

const InquiryNowPage = () => {

    const { InquiryNowSlag } = useParams();

    const FormattedPath = InquiryNowSlag
        .toLowerCase()
        .replace(/-/g, " ")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    const [FormData, setFormData] = useState({

        FirstName: "",
        LastName: "",
        Email: "",
        Number: "",
        Message: "",
        PackageName: `${FormattedPath}`

    });

    const [FormErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!FormData.FirstName.trim()) errors.FirstName = "First Name is required.";
        if (!FormData.LastName.trim()) errors.LastName = "First Name is required.";
        if (!FormData.Email.trim()) errors.Email = "Email is required.";
        if (!FormData.Number.trim()) errors.Number = "Phone number is required.";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const HandleOnSubmit = (event) => {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Form submitted", FormData);
        HandleOnReset();
    };

    const HandleOnReset = () => {

        setFormData({

            FirstName: "",
            LastName: "",
            Email: "",
            Number: "",
            Message: "",

        });

    }

    return (

        <div className="max-w-screen-xl mx-auto flex flex-col gap-5 py-10 px-10">
            <div className="header ">

                <h2 className="text-[2rem] text-gray-600 font-semibold ">Inquire Now For {FormattedPath} Pacakge</h2>

            </div>

            <div className="p-10  rounded-2xl w-full shadow-[0px_0px_20px_10px_rgba(0,0,0,0.1)]" >

                <form action="#" className="grid  md:grid-cols-2 grid-cols-1 gap-4 ">

                    <TextField
                        label="FirstName"
                        variant="filled"
                        name="FirstName"
                        required
                        error={Boolean(FormErrors.FirstName)}
                        helperText={FormErrors.FirstName}
                        sx={{
                            "& label.Mui-focused": {
                                color: "var(--color-orange-color)",
                                fontSize: "1rem",
                            },
                            "& .MuiFilledInput-underline:after": {
                                borderBottomColor: "var(--color-orange-color)",
                            },
                            "& .MuiFilledInput-root.Mui-focused": {
                                backgroundColor: "#fff",
                            },
                            "& label": {
                                fontSize: ".9rem",
                            },
                        }}
                        value={FormData.FirstName}
                        onChange={(e) =>
                            setFormData({ ...FormData, FirstName: e.target.value })
                        }
                    />

                    <TextField
                        label="LastName"
                        variant="filled"
                        name="LastName"
                        required
                        error={Boolean(FormErrors.LastName)}
                        helperText={FormErrors.LastName}
                        sx={{
                            "& label.Mui-focused": {
                                color: "var(--color-orange-color)",
                                fontSize: "1rem",
                            },
                            "& .MuiFilledInput-underline:after": {
                                borderBottomColor: "var(--color-orange-color)",
                            },
                            "& .MuiFilledInput-root.Mui-focused": {
                                backgroundColor: "#fff",
                            },
                            "& label": {
                                fontSize: ".9rem",
                            },
                        }}
                        value={FormData.LastName}
                        onChange={(e) =>
                            setFormData({ ...FormData, LastName: e.target.value })
                        }
                    />

                    <TextField
                        label="Email"
                        type="email"
                        required
                        variant="filled"
                        name="Email"
                        error={Boolean(FormErrors.Email)}
                        helperText={FormErrors.Email}
                        sx={{
                            "& label.Mui-focused": {
                                color: "var(--color-orange-color)",
                                fontSize: "1rem",
                            },
                            "& .MuiFilledInput-underline:after": {
                                borderBottomColor: "var(--color-orange-color)",
                            },
                            "& .MuiFilledInput-root.Mui-focused": {
                                backgroundColor: "#fff",
                            },
                            "& label": {
                                fontSize: ".9rem",
                            },
                        }}
                        value={FormData.Email}
                        onChange={(e) =>
                            setFormData({ ...FormData, Email: e.target.value })
                        }
                    />

                    <TextField
                        label="Phone Number"
                        type="number"
                        inputMode="numeric"
                        required
                        variant="filled"
                        error={Boolean(FormErrors.Number)}
                        helperText={FormErrors.Number}
                        name="Number"
                        sx={{
                            "& label.Mui-focused": {
                                color: "var(--color-orange-color)",
                                fontSize: "1rem",
                            },
                            "& .MuiFilledInput-underline:after": {
                                borderBottomColor: "var(--color-orange-color)",
                            },
                            "& .MuiFilledInput-root.Mui-focused": {
                                backgroundColor: "#fff",
                            },
                            "& label": {
                                fontSize: ".9rem",
                            },
                        }}
                        value={FormData.Number}
                        onChange={(e) =>
                            setFormData({ ...FormData, Number: e.target.value })
                        }
                    />

                    <TextField
                        className="md:col-span-2"
                        label="Type Message"
                        type="text"
                        variant="filled"
                        multiline
                        minRows={5}
                        maxRows={7}
                        name="Message"
                        sx={{
                            "& label.Mui-focused": {
                                color: "var(--color-orange-color)",
                                fontSize: "1rem",
                            },
                            "& .MuiFilledInput-underline:after": {
                                borderBottomColor: "var(--color-orange-color)",
                            },
                            "& .MuiFilledInput-root.Mui-focused": {
                                backgroundColor: "#fff",
                            },
                            "& label": {
                                fontSize: ".9rem",
                            },
                        }}
                        value={FormData.Message}
                        onChange={(e) =>
                            setFormData({ ...FormData, Message: e.target.value })
                        }
                    />


                    <Button variant="outlined" type="submit" sx={{

                        fontWeight: 600,
                        fontFamily: "var(--font-footer-font)",
                        backgroundColor: "var(--color-orange-color)",
                        color: "white",
                        border: "none",
                        height: "50px",

                    }}


                        onClick={(event) => {



                            HandleOnSubmit(event);
                        }}



                    >Submit</Button>

                </form>

            </div>

        </div>

    );

}

export default InquiryNowPage
