import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthProvider';

const Review = () => {
    const {user} = useContext(AuthContext);
    
    const {displayName, photoURL} = user
    const handleReview = (event) => {
    event.preventDefault()


    const form = event.target;
    const name = form.name.value;
    const description = form.description.value;
    const rating = form.rating.value;

    const review = {
        name: name,
        description: description,
        rating: rating,
        img: photoURL
    }

    fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    .then(res => res.json())
    .then(data => {
    if(data.acknowledged){
        toast.success('Thanks for your review');
        
    }
    })

    }


    return (
        <div>
            <form onSubmit={handleReview} className='flex flex-col lg:w-1/2 text-accent shadow-xl bg-neutral p-5 rounded-xl'>
            <input type="text" name='name' placeholder="Name" defaultValue={displayName} disabled className="input input-bordered w-full mt-5" />
            <textarea name='description' className="textarea textarea-bordered w-full mt-5" placeholder="Description"></textarea>
            <input name='rating' type="number" placeholder="Rating" className="input input-bordered w-full mt-5" min="1" max="5" />
            <input type="submit" value="submit" className="btn btn-primary mt-5" />
            </form>
        </div>
    );
};

export default Review;