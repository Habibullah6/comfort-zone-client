import React from 'react';
import Banner from '../Banner/Banner';
import CustomerReview from '../CustomerReview/CustomerReview';
import Products from '../Products/Products';
import SpecialOffer from '../SpecialOffer/SpecialOffer';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Products></Products>
        <SpecialOffer></SpecialOffer>
        <CustomerReview></CustomerReview>
        </div>
    );
};

export default Home;