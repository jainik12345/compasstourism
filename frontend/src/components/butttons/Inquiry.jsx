import { NavLink } from "react-router-dom";

const Inquiry = ({ Text }) => {
    return (
        <NavLink to="" className="flex items-center font-semibold justify-center bg-orange-color text-[1.2rem] rounded-sm text-white py-2 ">
            {Text}
        </NavLink>
    )
}

export default Inquiry;
