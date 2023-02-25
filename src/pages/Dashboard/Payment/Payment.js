import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const purchase = useLoaderData();
    const {name, price, date} = purchase;

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

    return (
        <div>
            <h1 className='text-xl'>Payment for: {name}</h1>
            <p className='text-xl'>Please pay <strong>${price}</strong> for your purchase on ${date} </p>

            <div className="mt-5 card shadow-xl p-10 bg-white lg:w-1/2 text-accent">
        <Elements stripe={stripePromise}>
          <CheckoutForm purchase={purchase}/>
        </Elements>
      </div>
        </div>
    );
};

export default Payment;