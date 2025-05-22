import React from "react";
import ContactTouchUs from "./ContactTouchUs/ContactTouchUs";
import ContactForm from "./ContactForm/ContactForm";
import ContactMap from "./ContactMap/ContactMap";

const ContactUsPage = () => {
  return (
    <>
      <ContactMap/>
      <ContactTouchUs />
      <ContactForm />
    </>
  );
};

export default ContactUsPage;
