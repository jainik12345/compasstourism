import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeImage.css";
import BE_URL from "../../../config";

const groupImages = (images) => {
  const groups = [];
  let index = 0;
  let toggle = true;

  while (index < images.length) {
    const groupSize = toggle ? 2 : 3;
    groups.push(images.slice(index, index + groupSize));
    index += groupSize;
    toggle = !toggle;
  }

  return groups;
};

const HomeImages = () => {
  const [imageGroups, setImageGroups] = useState([]);

  useEffect(() => {
    axios
      .get(`${BE_URL}/homeMultipleImages`)
      .then((res) => {
        if (res.data?.status === "success") {
          const images = res.data.data;
          const grouped = groupImages(images.concat(images));
          setImageGroups(grouped);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch images:", err);
      });
  }, []);

  return (
    <div className="client_logo_main_container">
      <h2 className="text-center text-[1.5rem] font-semibold text-gray-300">
        Our Associations, We are recognized by
      </h2>

      <div className="client_logo_content">
        {imageGroups.map((group, i) => {
          return (
            <div
              className={`image_group_column ${
                group.length === 2 ? "two-images" : ""
              }`}
              key={i}
            >
              {group.map((item, j) => (
                <div className="client_logo_item" key={j}>
                  <img
                    src={`${BE_URL}/Images/HomeImages/HomeMultipleImages/${item.image}`}
                    alt={item.title}
                    className="client_image"
                  />
                  <div className="image_title">{item.title}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeImages;
