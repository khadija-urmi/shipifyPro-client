import React from 'react';

const ReviewCard = ({review}) => {
    const {
        deliveryEmail,feedback,date,
        name,photo,ratting} = review || {}
    // console.log(review)
    return (
        <div className='text-center border-2 border-gray-300 p-5'>
            <img className='w-16 h-16 mx-auto rounded-full' src={photo} alt="" />
            <h2 className='font-semibold'>Name: {name}</h2>
            <p>Date: {date}</p>
            <p className='text-green-900 font-semibold'>Retting: {ratting}</p>
            <p>Feedbacks: {feedback}</p>
        </div>
    );
};

export default ReviewCard;