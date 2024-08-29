import React from 'react';

function PlacesToVisited({ trip }) {
    return (
        <div>
            <h2 className='text-lg font-bold mt-5'> Places to Visit </h2>
            {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4'> */}
            <div>
                {/* {trip?.tripData?.itinerary.map((day, index) => (
                    <h2 className='font-medium text-lg'>{day?.placeName}</h2>

                ))}; */}
            </div>
        </div>);

};

export default PlacesToVisited;