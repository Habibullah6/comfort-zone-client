import React, { useState } from 'react';
import { DynamicStar } from 'react-dynamic-star';
import { useQuery } from 'react-query';
import DisplayLoading from '../../Shared/DisplayLoading/DisplayLoading';
import ProductsBanner from '../ProductsBanner/ProductsBanner';
import PurchaseModal from '../PurchaseModal/PurchaseModal';


const AllProducts = () => {
    const [product, setProduct] = useState({})
    const {data: products = [], isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products')
            const data = res.json()
            return data;
        }
    })

    if(isLoading){
        return <DisplayLoading></DisplayLoading>
    }


    const handleProductPurchase = (id) => {
      fetch(`http://localhost:5000/product/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
      })
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
        <>  
        <ProductsBanner></ProductsBanner>
        <div className='grid lg:grid-cols-3 gap-10 my-5'>
            {
            products.map(product => <div key={product._id} className="card  shadow-xl">
            <figure className="px-10 pt-10">
              <img src={product.img} alt="Shoes" className="rounded-xl border " />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.productDetails}</p>
              <p className='font-bold'>${product.price}</p>
              <p>Brand: {product.brand}</p>
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
              <div className="card-actions">
              <label onClick={()=> handleProductPurchase(product._id)} htmlFor="my-modal-3" className="btn btn-primary">buy now</label>
              </div>
            </div>
          </div>)
            }
        </div>
       {
        product &&  <PurchaseModal
        product={product}
        setProduct={setProduct}
        ></PurchaseModal>
       }
        </>
    );
};



export default AllProducts;