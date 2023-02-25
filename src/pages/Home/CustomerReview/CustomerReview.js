import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./CustomerReview.css";

// import required modules
import { DynamicStar } from "react-dynamic-star";
import { FreeMode, Pagination } from "swiper";

export default function CustomReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const url = "http://localhost:5000/reviews";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  const star = {
    sharpness: 3,
    width: 15,
    height: 15,
    outlined: true,
    outlinedColor: "",
    fullStarColor: "#ef4444",
    emptyStarColor: "transparent",
    
  };

  return (
    <div className="mt-20 p-5 bg-base-200">
      <h1 className="text-center text-2xl ">What our customers says?</h1>
      <p className="text-center">
        Find our shoes from various collections, Here shoes are endless and
        profit is also endless.
      </p>
      <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },

          480: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },

          1440: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper mt-5 p-10"
      >
        {reviews.map((review) => (
          <SwiperSlide className="rounded-lg shadow-xl" key={review._id}>
            <div className="  p-5">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={review.img} />
                </div>
              </div>
              <p className="mt-5 text-justify">{review.description}</p>
              <div className="mt-5 flex justify-center">
              <DynamicStar
                rating={review.rating}
                width={star.width}
                height={star.height}
                outlined={
                  star.outlinedColor ? star.outlinedColor : star.outlined
                }
                sharpnessStar={star.sharpness}
                fullStarColor={star.fullStarColor}
                emptyStarColor={star.emptyStarColor}
              />

              <p className="font-bold text-xl ml-2">({review.rating})</p>
              </div>
              <p className="mt-5">{review.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
