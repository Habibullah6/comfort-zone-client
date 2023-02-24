import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import DisplayLoading from "../../Shared/DisplayLoading/DisplayLoading";
import DisplayModal from "../../Shared/DisplayModal/DisplayModal";

const ManageProduct = () => {
 const [deleteProduct, setDeleteProduct] = useState(null);
 
  const { data: products = [], isLoading , refetch} = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <DisplayLoading></DisplayLoading>;
  }

  const handleProductDelete = (id) => {
    fetch(`http://localhost:5000/product/${id}`, {
        method: 'Delete',
        
    })
    .then(res => res.json())
    .then(data => {
        if(data.deletedCount>0){
            toast.success('product delete successfully')
            refetch()
            setDeleteProduct(null)
        }
    })
  }

  const closeModal =()=> {
    setDeleteProduct(null)
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full text-accent">
        <thead>
          <tr>
            <th></th>
            <th>Product-Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td>
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={product.img} />
                  </div>
                </div>
              </td>
              <td>
                {product.name}
              </td>
              <td>
                {product.price}
              </td>
              <td>
                {product.brand}
              </td>
              <td>
                {product.rating}
              </td>
              <td>
                <label onClick={()=> setDeleteProduct(product)} htmlFor="my-modal-6" className="btn btn-sm btn-primary">Delete</label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{
    deleteProduct &&  <DisplayModal
    data={deleteProduct}
    title={`are you sure do you delete permanently?`}
    message={`if you delete ${deleteProduct.name}, it can not undone`}
    successAction={handleProductDelete}
    closeModal={closeModal}
    ></DisplayModal>
}


    </div>
  );
};

export default ManageProduct;
