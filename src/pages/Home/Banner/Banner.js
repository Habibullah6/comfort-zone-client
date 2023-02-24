import Aos from 'aos';
import React, { useEffect } from 'react';
import shoe from '../../../assets/shoesBannerImg.jpg';
const Banner = () => {

  useEffect(() => {
    Aos.init({
      duration: 1000
    })
  }, [])
  
  return (
    <div className='grid lg:grid-cols-2 gap-5 justify-between items-center mt-10'>
      

      <div data-aos="fade-right">
        <img src={shoe} alt="shoe" className='shadow-xl rounded-xl'/>
      </div>

      <div data-aos="fade-left">
        <h1 className='font-bold text-4xl '>
          The New Arrival <span className='text-secondary'>POWER</span> Shoes
        </h1>
        <p className='text-2xl mt-5'>
        Find our shoes from various collections, Here shoes are endless and profit is also endless.
        </p>
        <button className='btn btn-secondary mt-5 rounded-full px-10'>Shop now</button>
      </div>
    </div>
  );
};

export default Banner;