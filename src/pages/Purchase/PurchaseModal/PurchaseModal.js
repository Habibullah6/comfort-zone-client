import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const PurchaseModal = ({product, setProduct}) => {
  
  
  const {user} = useContext(AuthContext);
  const {displayName, email} = user;
  const date = new Date().toLocaleDateString('en-us', {  day:"numeric", month:"long", year:"numeric"})
  
  const handlePurchase = (e) => {
    const form = e.target;
    const displayName = form.displayName.value;
    const email = form.email.value;
    const price = form.price.value;
    const purchase = {
      name: product.name,
      displayName: displayName,
      email: email,
      price: price,
      date: date
    }

    fetch(`http://localhost:5000/purchase`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(purchase)
    })

    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        toast.success('purchase successfully')
        setProduct(null)
      }
      else{
        toast.error(data.message)
        setProduct(null)
      }
      
    })

    e.preventDefault()
  }


  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <p className="font-bold text-xl">{product.name}</p>

          <form onSubmit={handlePurchase} className="mt-10">
          <input type='text' name="date" disabled value={date || ''} className="mt-5 input input-bordered w-full"/>
          <input type="text" name="price" disabled value={product.price || ''}  className="input input-bordered w-full mt-5"/>
          <input type="text" name="displayName" disabled value={displayName || ''} className="input input-bordered w-full mt-5" />
          <input type="text" name="email" disabled value={email || ''}  className="input input-bordered w-full mt-5" />
          <input type="text" name="phone" placeholder="phone"  className="input input-bordered w-full mt-5" />
          <input type="submit" value='submit' className="btn btn-primary mt-5 w-full"/>

          </form>
        </div>
      </div>
    </>
  );
};

export default PurchaseModal;
