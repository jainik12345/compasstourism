import React from "react";

const aboutDescription = `
A luxurious resort next near Statue of Unity. Enjoy our number one fine dining experience, and room prepared for family holidays or special occasions.

Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Conveniently situated in the Ekta Nagar (Kevadia) part of Ekta Nagar, this property puts you close to attractions and interesting dining options. This 3-star property features indoor pool to make your stay more indulgent and memorable.
`;

const DummyAbout = () => {
  return (
    <div className="flex items-center justify-center py-8 px-1 sm:px-4">
      <div className="w-full max-w-screen-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 text-justify sm:p-8 md:p-14">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            About Us
          </h1>
          <div className="text-gray-700 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 whitespace-pre-line">
            {aboutDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DummyAbout;
