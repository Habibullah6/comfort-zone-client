import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const data = useLoaderData();
    const {name, price, date} = data;

    return (
        <div>
            <h1 className='text-xl'>Payment for: {name}</h1>
            <p className='text-xl'>Please pay <strong>${price}</strong> for your purchase on ${date} </p>
        </div>
    );
};

export default Payment;