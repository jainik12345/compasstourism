// import { TextField, Button } from "@mui/material";
// import { useState } from "react";
// import FormImg from "../../../assets/images/contact_us.27233847ed00de276994.jpg"

// const ContactForm = () => {


//   const [FormData, setFormData] = useState({


//     FirstName: "",
//     LastName: "",
//     Email: "",
//     Number: "",
//     Message: "",

//   });

//   const [FormErrors, setFormErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};

//     if (!FormData.FirstName.trim()) errors.FirstName = "First Name is required.";
//     if (!FormData.LastName.trim()) errors.LastName = "First Name is required.";
//     if (!FormData.Email.trim()) errors.Email = "Email is required.";
//     if (!FormData.Number.trim()) errors.Number = "Phone number is required.";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };


//   const HandleOnSubmit = (event) => {

//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     console.log("Form submitted", FormData);
//     HandleOnReset();
//   };



//   const HandleOnReset = () => {

//     setFormData({

//       FirstName: "",
//       LastName: "",
//       Email: "",
//       Number: "",
//       Message: "",
//     });

//   }

//   return (

//     <div className="max-w-screen-xl mx-auto py-20 px-10 ">
//       <div className="header flex  max-w-screen-xl mx-auto mb-10">

//         <h2 className="text-[2rem] text-gray-600 font-semibold">Leave Us A Message</h2>

//       </div>

//       <div className="form-cont max-w-screen-xl mx-auto p-5 flex  justify-around shadow-2xl">

//         <form action="#" className="grid md:grid-cols-2 rounded-2xl p-5 w-[50%] grid-cols-1 gap-4 " style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 0px 20px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px -100px inset', }}>

//           <TextField id="filled-basic" label="FirstName" variant="filled" name="FirstName" required  error={Boolean(FormErrors.FirstName)}
//             helperText={FormErrors.FirstName}
//             sx={{
//               '& label.Mui-focused': {
//                 color: 'var(--color-orange-color)',
//                 fontSize: "1rem"
//               },
//               '& .MuiFilledInput-underline:after': {
//                 borderBottomColor: 'var(--color-orange-color)',
//               },
//               '& .MuiFilledInput-root.Mui-focused': {
//                 backgroundColor: '#fff',
//               },
//               '& label': {
//                 fontSize: '.9rem',
//               }
//             }}

//             value={FormData.FirstName}
//             onChange={(event) => {

//               setFormData({ ...FormData, FirstName: event.target.value });
//             }}
//           />

//           <TextField id="filled-basic" label="LastName" variant="filled" name="LastName" required  error={Boolean(FormErrors.LastName)}
//             helperText={FormErrors.LastName}
//             sx={{
//               '& label.Mui-focused': {
//                 color: 'var(--color-orange-color)',
//                 fontSize: "1rem"
//               },
//               '& .MuiFilledInput-underline:after': {
//                 borderBottomColor: 'var(--color-orange-color)',
//               },
//               '& .MuiFilledInput-root.Mui-focused': {
//                 backgroundColor: '#fff',
//               },
//               '& label': {
//                 fontSize: '.9rem',
//               }
//             }}

//             value={FormData.LastName}
//             onChange={(event) => {

//               setFormData({ ...FormData, LastName: event.target.value });
//             }}
//           />


//           <TextField
//             id="filled-email-input"
//             label="Email"
//             type="email"
//             required
//             variant="filled"
//             name="email"
//             error={Boolean(FormErrors.Email)}
//             helperText={FormErrors.Email}
//             sx={{
//               '& label.Mui-focused': {
//                 color: 'var(--color-orange-color)',
//                 fontSize: "1rem"
//               },
//               '& .MuiFilledInput-underline:after': {
//                 borderBottomColor: 'var(--color-orange-color)',
//               },
//               '& .MuiFilledInput-root.Mui-focused': {
//                 backgroundColor: '#fff', // optional
//               }, '& label': {
//                 fontSize: '.9rem',
//               }
//             }}
//             value={FormData.Email}
//             onChange={(event) => {

//               setFormData({ ...FormData, Email: event.target.value });
//             }}
//           />

//           <TextField
//             id="filled-number-input"
//             label="Phone Number"
//             type="number"
//             inputMode="numeric"
//             required
//             variant="filled"
//             error={Boolean(FormErrors.Number)}
//             helperText={FormErrors.Number}
//             name="number"
//             sx={{
//               '& label.Mui-focused': {
//                 color: 'var(--color-orange-color)',
//                 fontSize: "1rem"
//               },
//               '& .MuiFilledInput-underline:after': {
//                 borderBottomColor: 'var(--color-orange-color)',
//               },
//               '& .MuiFilledInput-root.Mui-focused': {
//                 backgroundColor: '#fff', // optional
//               }, '& label': {
//                 fontSize: '.9rem',
//               }
//             }}

//             value={FormData.Number}
//             onChange={(event) => {

//               setFormData({ ...FormData, Number: event.target.value });
//             }}
//           />
//           <TextField
//             className="md:col-span-2"
//             id="filled-message-input"
//             label="Type Message"
//             type="text"
//             variant="filled"
//             multiline
//             minRows={5}
//             maxRows={7}
//             name="message"
//             sx={{
//               '& label.Mui-focused': {
//                 color: 'var(--color-orange-color)',
//                 fontSize: "1rem"
//               },
//               '& .MuiFilledInput-underline:after': {
//                 borderBottomColor: 'var(--color-orange-color)',
//               },
//               '& .MuiFilledInput-root.Mui-focused': {
//                 backgroundColor: '#fff', // optional
//               }, '& label': {
//                 fontSize: '.9rem',
//               }
//             }}
//             value={FormData.Message}
//             onChange={(event) => {

//               setFormData({ ...FormData, Message: event.target.value });
//             }}
//           />

//           <Button variant="outlined" type="submit" sx={{

//             fontWeight: 600,
//             fontFamily: "var(--font-footer-font)",
//             backgroundColor: "var(--color-orange-color)",
//             color: "white",
//             border: "none",
//             height: "50px",

//           }}
//             onClick={(event) => {
//               HandleOnSubmit(event);
//             }}

//           >Submit</Button>

//         </form>

//         <div className="w-[40%]">
//           <img src={FormImg} alt="IMG" className="h-100 w-full" />
//         </div>

//       </div>

//     </div>

//   );
// }

// export default ContactForm

import { TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import BE_URL from "../../../config";  // adjust the import path as needed
import FormImg from "../../../assets/images/contact_us.27233847ed00de276994.jpg";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Number: "",
    Message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // for success/error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // track submitting state

  const validateForm = () => {
    const errors = {};
    if (!formData.FirstName.trim()) errors.FirstName = "First Name is required.";
    if (!formData.LastName.trim()) errors.LastName = "Last Name is required.";
    if (!formData.Email.trim()) errors.Email = "Email is required.";
    if (!formData.Number.trim()) errors.Number = "Phone number is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmitStatus(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${BE_URL}/contact-form/`, {
        first_name: formData.FirstName,
        last_name: formData.LastName,
        email: formData.Email,
        mobile_number: formData.Number,
        message: formData.Message,
      });

      if (response.data.status === "success") {
        setSubmitStatus("Your message has been sent successfully!");
        handleOnReset();
      } else {
        setSubmitStatus("Failed to send message, please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitStatus("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnReset = () => {
    setFormData({
      FirstName: "",
      LastName: "",
      Email: "",
      Number: "",
      Message: "",
    });
    setFormErrors({});
  };

  return (
    <div className="max-w-screen-xl mx-auto py-20 px-10">
      <div className="header flex max-w-screen-xl mx-auto mb-10">
        <h2 className="text-[2rem] text-gray-600 font-semibold">Leave Us A Message</h2>
      </div>

      <div className="form-cont max-w-screen-xl mx-auto p-5 flex justify-around shadow-2xl">
        <form
          onSubmit={handleOnSubmit}
          className="grid md:grid-cols-2 rounded-2xl p-5 w-[50%] grid-cols-1 gap-4"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 0px 20px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px -100px inset",
          }}
          noValidate
        >
          <TextField
            label="FirstName"
            variant="filled"
            name="FirstName"
            required
            error={Boolean(formErrors.FirstName)}
            helperText={formErrors.FirstName}
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
            value={formData.FirstName}
            onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })}
          />

          <TextField
            label="LastName"
            variant="filled"
            name="LastName"
            required
            error={Boolean(formErrors.LastName)}
            helperText={formErrors.LastName}
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
            value={formData.LastName}
            onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}
          />

          <TextField
            label="Email"
            type="email"
            required
            variant="filled"
            name="Email"
            error={Boolean(formErrors.Email)}
            helperText={formErrors.Email}
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
            value={formData.Email}
            onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
          />

          <TextField
            label="Phone Number"
            type="number"
            inputMode="numeric"
            required
            variant="filled"
            error={Boolean(formErrors.Number)}
            helperText={formErrors.Number}
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
            value={formData.Number}
            onChange={(e) => setFormData({ ...formData, Number: e.target.value })}
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
            value={formData.Message}
            onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
          />

          <Button
            variant="outlined"
            type="submit"
            disabled={isSubmitting}
            sx={{
              fontWeight: 600,
              fontFamily: "var(--font-footer-font)",
              backgroundColor: "var(--color-orange-color)",
              color: "white",
              border: "none",
              height: "50px",
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>

        <div className="w-[40%]">
          <img src={FormImg} alt="Contact Us" className="h-100 w-full" />
        </div>
      </div>

      {submitStatus && (
        <p
          className={`mt-6 max-w-screen-xl mx-auto text-center font-semibold ${
            submitStatus.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {submitStatus}
        </p>
      )}
    </div>
  );
};

export default ContactForm;