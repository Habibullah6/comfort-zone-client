import React from "react";
import bannerOne from "../../../assets/SHOES.jpg";
const ProductsBanner = () => {
    return (
        <div className="carousel w-full ">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src={bannerOne}
                    className=""
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">
                        ❮
                    </a>
                    <a href="#slide2" className="btn btn-circle">
                        ❯
                    </a>
                </div>
            </div>
           
        </div>
    );
};

export default ProductsBanner;
