import { NavLink } from "react-router-dom";
import BE_URL from "../../../config";
import axios from "axios";
import { useEffect, useState } from "react";

export const HomeBlogs = () => {
  const [BlogDataArr, setBlogDataArr] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/homeBlog`);
        if (response.status === 200) {
          setBlogDataArr(response.data.data);
        } else {
          console.error("Error fetching blog data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchBlogData();
  }, []);

  console.log("BlogDataArr", BlogDataArr);

  return (
    <>
      <div className="section bg-blog-color">
        <div className="container mx-auto max-w-screen-xl md:px-10 px-5 md:py-20 py-20 flex flex-col gap-20">
          <div className="header flex flex-col md:gap-5 gap-10 text-center text-white  ">
            <h2 className="md:text-[1.5rem] text-[1rem] tracking-[1rem] ">
              DAYS TO COME
            </h2>
            <h2 className="md:text-[2rem] text-[1rem] tracking-[.5rem]">
              BLOG
            </h2>
            <h2 className="md:text-[1rem] text-[.7rem] tracking-[.5rem]">
              A TRAVEL MAGAZINE BY COMPASS TOURISM{" "}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
            {BlogDataArr &&
              BlogDataArr.map((item, idx) => {
                const titleSlug = item.title.toLowerCase().replace(/\s+/g, "-");
                const imageUrl = `${BE_URL}/Images/HomeImages/HomeBlog/${item.image}`;  

                return (
                  <NavLink to={`/blog/${titleSlug}`} key={idx}>
                    <div className="relative rounded-xl overflow-hidden group shadow-md">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        draggable={false}
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full flex flex-col justify-center items-center bg-[linear-gradient(rgba(72,0,72,0.8),rgba(192,72,72,0.8))] opacity-80 text-white px-4 transition-all duration-300 ease-in-out h-[64px] group-hover:h-75 overflow-hidden">
                        <h3 className="text-[1rem] text-center font-semibold">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBlogs;
