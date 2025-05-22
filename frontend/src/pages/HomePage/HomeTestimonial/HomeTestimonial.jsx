import { useEffect, useState } from "react";

const TestimonialDataaArr = [

  {
    Para: `" Good service provide in our kashmir tour. Thank u so much for this good service "`,
    Name: "- Patel Bhumi",
  },

  {
    Para: `" My journey under compass tourism,i never forget it. Skilled staff with good behaiver and cooperative nature impress me. Excellent. "`,
    Name: "- Gopi Upadhyay",
  },

  {
    Para: `" Good service provide in our kashmir tour. Thank u so much for this good service "`,
    Name: "- Satyam Dabhi",
  },

  {
    Para: `" Compass Tourism.and staff members understands curiosity of the customer thereafter provide excellent itinerary resulting tour ends with sweet memories and happiness. Good Luck to all "`,
    Name: "- Girish Gupta",
  }

]

const HomeTestimonial = () => {


  const [Fade, setFade] = useState(true);

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


  const TotalTestimonialSlides = Math.ceil(TestimonialDataaArr.length / TestimonialCardsPerPage);
  const CurrentTestimonialSlides = Math.floor(CurrentTestimonialIdx / TestimonialCardsPerPage)


  useEffect(() => {

    const TestiMonialInterval = setInterval(() => {

      HandleNextTestimonial();

    }, 5000);

    return () => clearInterval(TestiMonialInterval);

  }, [TestimonialCardsPerPage])

  const HandleNextTestimonial = () => {
    setFade(false); // Trigger fade-out

    setTimeout(() => {

      setCurrentTestimonialIdx((prev) => {

        return prev + TestimonialCardsPerPage >= TestimonialDataaArr.length ? 0 : prev + TestimonialCardsPerPage;

      })
      setFade(true); // Trigger fade-in

    }, 300);

  }

  const VisibleTestimonialCards = TestimonialDataaArr.slice(CurrentTestimonialIdx, CurrentTestimonialIdx + TestimonialCardsPerPage);




  return (

    <>

      <div className="section bg-gray-200">


        <div className="testimonial-cont flex flex-col gap-10 max-w-screen-xl mx-auto py-10">
          <div className="testimonial-heading ">
            <h3 className="text-orange-color font-bold text-[2rem] text-center">
              Testimonial & Review by Customers
            </h3>
          </div>


          <div className="testimonial-cards-cont flex  overflow-hidden justify-center max-w-[50%] shadow-2xl rounded-tl-[100px] rounded-br-[100px] bg-blue-200 mx-auto items-center gap-10 ">
            {VisibleTestimonialCards.map((item, idx) => (
              <div
                className={`testimonial-card shadow-xl flex flex-col justify-center items-center gap-5 py-20 px-10 text-center transition-opacity duration-500 ease-in-out ${Fade ? "opacity-100" : "opacity-0"}`}
                key={idx}
              >

                <h2 className="text-[1.1rem] font-semibold h-20 ">{item.Para}</h2>
                <h2 className="text-[1rem] font-semibold text-gray-600">{item.Name}</h2>

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
