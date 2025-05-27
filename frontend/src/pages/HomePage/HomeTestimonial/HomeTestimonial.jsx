import axios from "axios";
import { useEffect, useState } from "react";
import BE_URL from "../../../config";

const HomeTestimonial = () => {


  const [Fade, setFade] = useState(true);

  const [TestimonialDataArr, setTestimonialDataaArr] = useState([]);

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/homeTestimonial`);
        setTestimonialDataaArr(response.data.data);
      } catch (error) {
        console.error("Error fetching testimonial data:", error);
      }
    };
    fetchTestimonialData();
  }, []);
  // Review Testimonial logic

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setTestimonialCardsPerPage(1);
      } else {

        setTestimonialCardsPerPage(1);

      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [CurrentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [TestimonialCardsPerPage, setTestimonialCardsPerPage] = useState(1);


  const TotalTestimonialSlides = Math.ceil(TestimonialDataArr.length / TestimonialCardsPerPage);
  const CurrentTestimonialSlides = Math.floor(CurrentTestimonialIdx / TestimonialCardsPerPage)


  useEffect(() => {

    const TestiMonialInterval = setInterval(() => {

      HandleNextTestimonial();

    }, 5000);

    return () => clearInterval(TestiMonialInterval);

  }, [TestimonialCardsPerPage, TestimonialDataArr]);

  const HandleNextTestimonial = () => {
    setFade(false); // Trigger fade-out

    setTimeout(() => {

      setCurrentTestimonialIdx((prev) => {

        return prev + TestimonialCardsPerPage >= TestimonialDataArr.length ? 0 : prev + TestimonialCardsPerPage;

      })
      setFade(true); // Trigger fade-in

    }, 300);

  }

  const VisibleTestimonialCards = TestimonialDataArr.slice(CurrentTestimonialIdx, CurrentTestimonialIdx + TestimonialCardsPerPage);




  return (

    <>

      <div className="section bg-gray-200">


        <div className="testimonial-cont flex flex-col gap-10 max-w-screen-xl mx-auto py-10 px-2">
          <div className="testimonial-heading ">
            <h3 className="text-orange-color font-bold md:text-[2rem] text-[1.2rem] text-center">
              Testimonial & Review by Customers
            </h3>
          </div>


          <div className="testimonial-cards-cont flex  overflow-hidden justify-center md:min-w-[50%] max-w-full h-max shadow-2xl md:rounded-tl-[100px] md:rounded-br-[100px] rounded-2xl bg-blue-200 mx-auto items-center gap-10 ">
            {VisibleTestimonialCards.map((item, idx) => (
              <div
                className={`testimonial-card flex flex-col justify-center items-center gap-10 py-10 px-5  max-w-[500px] text-center transition-opacity duration-500 ease-in-out ${Fade ? "opacity-100" : "opacity-0"}`}
                key={idx}
              >

                <h2 className="md:text-[1.1rem] text-[1rem] flex items-center font-semibold h-30 text-center">{item.description}</h2>
                <h2 className="text-[1rem] font-semibold text-gray-600">-{item.name}</h2>

              </div>

            ))}
          </div>
        </div>

        <div className="ExploreCardDots flex justify-center mx-auto max-w-screen-xl items-center  gap-2 px-5 py-10">

          {Array.from({ length: TotalTestimonialSlides }).map((_, idx) => (
            <div
              key={idx}
              className={`h-3 w-3 cursor-pointer transition-all rounded-full duration-300 ${idx === CurrentTestimonialSlides ? "bg-orange-color scale-110" : "bg-gray-300"
                }`}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setCurrentTestimonialIdx(idx * TestimonialCardsPerPage);
                  setFade(true);
                }, 300);
              }}
            />
          ))}
        </div>


      </div>


    </>

  )
}

export default HomeTestimonial
