import React from "react";
import { DynamicStar } from "react-dynamic-star";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DisplayLoading from "../../Shared/DisplayLoading/DisplayLoading";

const Products = () => {

 

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products`);
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <DisplayLoading></DisplayLoading>;
  }

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
    <div className="mt-20">
      <h1 className="font-bold text-4xl">
        Our <span className="text-primary">Popular</span> Products
      </h1>
      <p className="text-xl my-10">
        Find your shoes from our various collections. Here shoes <br /> is
        endless and profit is also endless.
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
        {products?.slice(0, 6)?.map((product) => (
          <div key={product._id} className="shadow-xl rounded-xl">
            <div className="card-body">
              <img src={product.img} alt="shoes" className="lg:w-1/2"/>
              <DynamicStar
                rating={product.rating}
                width={star.width}
                height={star.height}
                outlined={
                  star.outlinedColor ? star.outlinedColor : star.outlined
                }
                sharpnessStar={star.sharpness}
                fullStarColor={star.fullStarColor}
                emptyStarColor={star.emptyStarColor}
              />
              <h1 className="font-bold">{product.name}</h1>
              <h1 className="font-bold text-xl text-primary">
                ${product.price}
              </h1>
              
            </div>
          </div>
        ))}

        
      </div>
     <div className="flex justify-center mt-20">
     <Link to='/allProducts' className="btn btn-primary px-10">Please Load More</Link>
     </div>
    </div>
  );
};

export default Products;
