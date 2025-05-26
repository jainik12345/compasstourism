import { TextField, Button } from "@mui/material";
import { useState } from "react";


const InquiryForm = () => {

    //form section logic

    const [FormData, setFormData] = useState({

        FirstName: "",
        LastName: "",
        Email: "",
        Number: "",

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
        });

    }


    return (

        <div className="form-cont w-full p-4 bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] shadow-black/50 rounded-xl flex flex-col gap-4">

            <div className="header flex flex-col gap-5">

                <h2 className="font-semibold text-[1.2rem]">For Inquiry</h2>

                <p className="text-[.8rem] font-semibold text-gray-400">Feel free to contact us if you need any assistance, any help or another question.</p>
 
            </div>

            <form action="#" className="grid  grid-cols-1 gap-4 ">

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
    )
}

export default InquiryForm
