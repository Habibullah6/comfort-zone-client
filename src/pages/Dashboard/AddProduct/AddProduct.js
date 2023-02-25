import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  
  const {
    register,
    handleSubmit,
    reset
  } = useForm();


  const onSubmit = (data) => {
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    const image =data.img[0]
   
    const formData = new FormData();
    formData.append("image", image);

    
    fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      
      if(imgData?.success){
         
        const product = {
          name: data.name,
          price: data.price,
          brand: data.brand,
          productDetails: data.productDetails,
          img: imgData?.data.url,
          rating: data.rating
        }
        
        fetch(`http://localhost:5000/products`, {
          method: 'POST',
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`,
            'content-type': 'application/json'
          },
          body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => {
        if(data.acknowledged){
          toast.success('product added successful')
        }
         
        })
      }
    })


   reset()
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:w-1/2 text-accent shadow-xl bg-neutral p-5 rounded-xl"
      >
        <input
          {...register("name")}
          type="text"
          placeholder="product-name"
          className="input input-bordered w-full mt-5"
        />
        <input
          {...register("price")}
          type="number"
          placeholder="price"
          className="input input-bordered w-full mt-5"
        />
        <input
          {...register("brand")}
          type="text"
          placeholder="brand"
          className="input input-bordered w-full mt-5"
        />
        <textarea
          {...register("productDetails")}
          placeholder="product-details"
          className="textarea textarea-bordered w-full mt-5"
        ></textarea>
       <input {...register("img")} type="file" className="file-input file-input-bordered w-full mt-5" />
        <input
          {...register("rating")}
          type="number"
          placeholder="rating"
          className="input input-bordered w-full mt-5"
        />
        <input type="submit" value="submit" className="btn btn-primary mt-5" />
      </form>
    </div>
  );
};

export default AddProduct;
