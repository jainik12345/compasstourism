import React from "react";
import { useParams } from "react-router-dom";

const IndianCityPage = () => {
  const { cityName } = useParams();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 capitalize">
        Welcome to {cityName.replace(/-/g, " ")}
      </h1>
    </div>
  );
};

export default IndianCityPage;
