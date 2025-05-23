import "./Footer.css";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import comapassLogo from "../../assets/images/compass-logo.png";
import { Link } from "react-router-dom";

import AssociateImg1 from "../../assets/images/GUJARATTOURISM.jpg";
import AssociateImg2 from "../../assets/images/usiic.png";
import AssociateImg3 from "../../assets/images/ADTOI.jpg";
import AssociateImg4 from "../../assets/images/atoai.jpg";
import AssociateImg5 from "../../assets/images/etaa.jpg";
import AssociateImg6 from "../../assets/images/gtaa.jpg";
import AssociateImg7 from "../../assets/images/iato.jpg";
import AssociateImg8 from "../../assets/images/incredible-india.jpg";
import AssociateImg9 from "../../assets/images/tafi.jpg";
import AssociateImg10 from "../../assets/images/tag.jpg";
import AssociateImg11 from "../../assets/images/toa.jpg";



const Footer = () => {

  const clientLogos = [
    { src: AssociateImg1, },
    { src: AssociateImg2, },
    { src: AssociateImg3, },
    { src: AssociateImg4, },
    { src: AssociateImg5, },
    { src: AssociateImg6, },
    { src: AssociateImg7, },
    { src: AssociateImg8, },
    { src: AssociateImg9, },
    { src: AssociateImg10, },
    { src: AssociateImg11, },
  ];


  const linkStyle =
    "relative inline-block pb-1 transition-colors duration-300 hover:text-red-400";

  const activeStyle = ({ isActive }) =>
    `${linkStyle} ${isActive ? "text-red-500" : ""}`;

  return (
    <footer className="bg-gray-900 text-white">

      <div className="client_logo_main_container ">
        <div className="client_logo_content">
          {clientLogos.concat(clientLogos).map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} />
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
