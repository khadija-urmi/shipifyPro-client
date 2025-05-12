import React from 'react';

const TopDeliveryMen = ({topMen}) => {
    const {ratting,info
        } = topMen || {}
    return (
        <div className='text-center border-2 border-gray-300 p-5'>
        <img className='w-16 h-16 mx-auto rounded-full' src={info?.photo} alt="" />
        <h2 className='font-semibold'>Name: {info?.name}</h2>
        <p>Number of parcels Delivered: {info?.deliveredCount}</p>
        <p className='text-green-900 font-semibold'>Average Ratings: {ratting}</p>
        {/* <p>Feedbacks: {feedback}</p> */}
    </div>
    );
};

export default TopDeliveryMen;