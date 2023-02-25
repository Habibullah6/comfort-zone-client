import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ purchase }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState('')
  const [transactionId, setTransactionId] = useState('');

  const { price, email, displayName, _id } = purchase;

  useEffect(() => {
    
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json",
    authorization: `bearer ${localStorage.getItem('accessToken')}`
    },
      body: JSON.stringify({price})
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);


  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error?.message);
    } else {
      setCardError("");
    }

    setSuccess('');
    setProcessing(true)
    const {paymentIntent, confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              
              name: displayName,
              email: email
            },
          },
        },
      );

      if(confirmError){
        setCardError(confirmError);
        return
      }

      if(paymentIntent.status === 'succeeded'){
     
        const payment = {
            transactionId: paymentIntent.id,
            email: email,
            name: displayName,
            price: price,
            purchaseId: _id

        }

      fetch('http://localhost:5000/payments', {
        method: 'POST',
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(payment)
      })
      .then(res => res.json())
      .then(data => {
        if(data.insertedId){
            console.log(data);
            setSuccess('congratulation , your payment is completed');
            setTransactionId(paymentIntent.id)
        }
      })
      }

      setProcessing(false)
  };


  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="btn btn-primary btn-sm mt-10"
        >
          Pay
        </button>

        <p className="text-primary mt-5">{cardError}</p>
        {
        success && <div>
            <p className="text-green-500 font-bold">{success}</p>
            <p className="text-green-500 font-bold">Your transaction Id: {transactionId}</p>
        </div>
        }
      </form>
    </>
  );
};

export default CheckoutForm;
