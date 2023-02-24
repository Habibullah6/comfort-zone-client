import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import shoeOne from "../../../assets/shoes-one.png";
import shoeThree from "../../../assets/shoes-three.png";
import shoeTwo from "../../../assets/shoes-two.png";

const SpecialOffer = () => {

  useEffect(() => {
    Aos.init({
      duration: 3000,
      delay: 500
      
    })
  }, [])

  
  return (
    <div className="mt-20">
      <div className="grid lg:grid-cols-2 gap-20 justify-center items-center">
        <div data-aos="zoom-in">
          <div className="grid grid-cols-2 gap-5">
            <div className="shadow-xl rounded-xl">
              <img src={shoeOne} alt="shoe-one"/>
            </div>
            <div className="shadow-xl rounded-xl">
              <img src={shoeTwo} alt="shoe-two"/>
            </div>
          </div>

          <div className="shadow-xl rounded-xl">
            <img src={shoeThree} alt="shoe-three" className="mt-5 w-1/2 mx-auto" />
          </div>
        </div>
        <div data-aos="zoom-in">
          <h1 className="text-4xl font-bold text-primary">Special Offer</h1>
          <p className="mt-5">
            Find your shoes from our various collections. Here shoes is endless
            and profit is also endless. Find your shoes from our various
            collections. Here shoes is endless and profit is also endless. Find
            your shoes from our various collections. Here shoes is endless and
            profit is also endless.
          </p>
          <div className="mt-5 flex ">
            <button className="btn btn-primary rounded-full px-10">
              Shop now
            </button>
            <button className="btn bg-white text-black border-2 border-primary  rounded-full px-10 ml-8">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
