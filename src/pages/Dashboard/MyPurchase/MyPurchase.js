import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import DisplayLoading from '../../Shared/DisplayLoading/DisplayLoading';
import DisplayModal from '../../Shared/DisplayModal/DisplayModal';

const MyPurchase = () => {
    const {user} = useContext(AuthContext);
    const [deletePurchase, setDeletePurchase] = useState(null);
    
    const {email} = user;
    const {data: purchases = [], isLoading, refetch} = useQuery({
        queryKey: ['purchases'],
        queryFn: async()=> {
            const res = await fetch(`http://localhost:5000/purchases?email=${email}`, {
              headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
              }
            })
            const data = res.json()
            return data;
        }
    })


    if(isLoading){
      return <DisplayLoading></DisplayLoading>
    }

    
    const handlePurchaseDelete = (id) => {
      fetch(`http://localhost:5000/purchases/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`,
          
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount>0){
          toast.success('purchase delete successful')
          refetch()
          setDeletePurchase(null)
        }
      })
    }

    const closeModal = () => {
      setDeletePurchase(null)
    }

    
    return (
        <div className="overflow-x-auto">
  <table className="table w-full text-accent">
     
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Product Name</th>
        <th>Date</th>
        <th>Price</th>
        <th>Pay</th>
        <th>Action</th>

      </tr>
    </thead>
    <tbody >
      
    

      {
        purchases.map((purchase, i) =>  <tr key={i}>
            
            <td>{purchase.displayName}</td>
            <td>{purchase.name}</td>
            <td>{purchase.date}</td>
            <td className='font-bold'>${purchase.price}</td>

           <td>
           {
            purchase.paid ? <span>Paid</span> : <Link to={`/dashboard/payment/${purchase._id}`} className='btn btn-sm btn-accent'>Pay</Link>
            }
           </td>


            <td><label onClick={() => setDeletePurchase(purchase)}  htmlFor="my-modal-6"  className='btn btn-sm btn-primary'>Delete</label></td>
          </tr>)
      }
     
    </tbody>
  </table>

 {
  deletePurchase &&  <DisplayModal
  data={deletePurchase}
  title={`Are you sure do you want to delete permanently?`}
  message={`if you delete ${deletePurchase?.name} it can not undone`}
  successAction={handlePurchaseDelete}
  closeModal={closeModal}
  ></DisplayModal>
 }
</div>
    );
};

export default MyPurchase;