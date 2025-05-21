import { NavLink } from "react-router-dom";


const Testimonial = ({ ImgUrl, ImgTitle, nights }) => {
    return (
        <NavLink>

            <div className="relative rounded-xl overflow-hidden group shadow-md">
                <img
                    src={ImgUrl}
                    alt={ImgTitle}
                    draggable={false}
                    className="w-full h-72 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center bg-black opacity-80 text-white px-4 transition-all duration-300 ease-in-out h-[64px] group-hover:h-75 overflow-hidden">
                    <h3 className="text-[1.3rem]">{ImgTitle}</h3>
                    <p className="text-[1rem]">{nights}</p>
                </div>
            </div>
        </NavLink>
    );
};

export default Testimonial;
