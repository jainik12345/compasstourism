import "./Footer.css";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import comapassLogo from "../../assets/images/compass-logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BE_URL from "../../config";
import axios from "axios";

const Footer = () => {

  const [ClientLogos, setClientLogos] = useState([]);

  useEffect(() => {


    const FetchClientLogosData = async () => {

      try {

        const Response = await axios.get(`${BE_URL}/ourAssociations`);

        if (Response.status === 200) {

          setClientLogos(Response.data.data.images);

        } else {

          console.error("Error fetching Footer Logos data:", Response.statusText);

        }

      } catch (error) {

        console.error("Unable to fetch the data from the api", error)
      }

    }

    FetchClientLogosData();

  }, []);

  const linkStyle =
    "relative inline-block pb-1 transition-colors duration-300 hover:text-red-400";

  const activeStyle = ({ isActive }) =>
    `${linkStyle} ${isActive ? "text-red-500" : ""}`;

  return (
    <footer className="bg-gray-900 text-white pt-10">

      <div className="client_logo_main_container ">

        <h2 className="text-center text-[1.5rem] font-semibold text-gray-300">Our Associations, We are recognized by</h2>

        <div className="client_logo_content">
          {ClientLogos.concat(ClientLogos).map((logo, index) => (
            <img key={index} src={`${BE_URL}/Images/OurAssociations/${logo}`} alt={logo.alt} className="object-cover " />
          ))}
        </div>
      </div>


      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <Link to="/">
            <img
              src={comapassLogo}
              alt="Compass Tourism Logo"
              className="w-60 cursor-pointer mb-4"
            />
          </Link>
          <h3 className="text-lg font-semibold mb-4">Compass Tourism</h3>
          <p className="text-sm leading-relaxed">
            Established in 2011, Compass Tourism is a reputable travel company
            based in Ahmedabad, Gujarat. We specialize in providing custom
            travel packages and seamless tourism experiences throughout Gujarat
            and beyond.
          </p>
        </div>

        {/* Center Navigation */}
        <div className=" text-left md:text-center">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { path: "/about-us", label: "About Us" },
              { path: "/contact-us", label: "Contact Us" },
              { path: "/private-policy", label: "Privacy Policy" },
              { path: "/terms-conditions", label: "Terms & Conditions" },
            ].map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={activeStyle}>
                  <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 hover:after:w-full">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="text-sm space-y-3">
            <div>
              <p className="mb-1 font-medium">Head Office (Ahmedabad):</p>
              <p>
                301, KALING Behind Bata Showroom Opp. Mount Carmel Convent
                school Ashram Road - 380009
              </p>
            </div>
            <div>
              <p className="mb-1 font-medium">Gandhinagar Office:</p>
              <p>
                410, Pramukh Tangent, Above McDonald's, Sargasan Cross Road,
                Gandhinagar - 382421
              </p>
            </div>
            <p>
              Email:{" "}
              <a
                href="mailto:info@compasstourism.com"
                className="text-red-400 hover:underline"
              >
                info@compasstourism.com
              </a>
            </p>
            <p>
              WhatsApp:{" "}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:underline"
              >
                +91 99795 56200
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Social Bar */}
      <div className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Compass Tourism. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-lg">
            <a
              href="https://facebook.com"
              className="hover:text-blue-500 transition"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-red-400 transition"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-blue-300 transition"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://youtube.com"
              className="hover:text-red-500 transition"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
