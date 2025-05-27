import { useState, useEffect } from "react";

const ImageSlider = ({ SliderImgArr }) => {
  const [CurrentImgIdx, SetCurrentImgIdx] = useState(0);
  const [Fade, setFade] = useState(true);

  useEffect(() => {
    if (!SliderImgArr || SliderImgArr.length === 0) return;

    const SliderInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        SetCurrentImgIdx((PrevVal) =>
          PrevVal === SliderImgArr.length - 1 ? 0 : PrevVal + 1
        );
        setFade(true);
      }, 250);
    }, 8000);

    return () => clearInterval(SliderInterval);
  }, [SliderImgArr]);

  if (!SliderImgArr || SliderImgArr.length === 0) return null;

  return (
    <div className="Slider-cont max-w-screen-2xl my-5 md:px-20 px-5 mx-auto h-100 relative overflow-hidden">
      <img
        src={SliderImgArr[CurrentImgIdx].ImgUrl}
        alt="IMG"
        className={`w-full h-full object-cover rounded-2xl transition-opacity duration-700 ${Fade ? "opacity-100" : "opacity-0"
          }`}
      />
    </div>
  );
};

export default ImageSlider;
