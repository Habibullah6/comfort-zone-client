import React from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const AllUsers = () => {
    
    
    const {data: users = [], refetch} = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allUsers')
            const data = res.json()
            return data;
        }
    })


    const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/allUsers/admin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }

    })
    .then(res => res.json())
    .then(data => {
      if(data.modifiedCount > 0  ){
        toast.success('Make admin successful');
        refetch()
      }
    })
    }
   




    
    return (
        <div className="overflow-x-auto">
        <table className="table w-full text-accent">
          {/* head*/}
          <thead>
            <tr>
              
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              
            </tr>
          </thead>
          <tbody>
          
          {
            users.map((user, i) =>   <tr key={user._id}>
                 
                  <td>
                    {i + 1}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    
                    
                  {
                    user?.role === 'admin' ? '' :  <button onClick={()=> handleMakeAdmin(user._id)} className='btn btn-accent btn-sm'>Make Admin</button>
                  }
                    
                  
                  </td>
                  
                </tr>)
          }
            
            
           
          </tbody>
        </table>
      </div>
    );
};

export default AllUsers;