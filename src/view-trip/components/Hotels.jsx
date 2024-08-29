import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";


function Hotels({ trip }) {
    console.log(trip);
    return (
        <div>
            <h2 className="text-xl font-bold mt-5">Hotel Recommendations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <Link to={"http://www.google.com/maps/search/?api=1&query=" + hotel?.hotelName + " " + hotel?.hotelAddress} target="_blank" key={index}>
                        <div className="hover:scale-110 transition-all">
                            <img src="https://picsum.photos/300/250" className="object-cover rounded-xl" />
                            <div className="my-2 flex flex-col gap-1">
                                <h2 className="font-medium text-lg">{hotel?.hotelName}</h2>
                                <h2 className="text-xs text-stone-600">📍{hotel?.hotelAddress}</h2>
                                <h2 className="text-sm text-stone-600">💰{hotel?.price}</h2>
                                <h2 className="text-sm text-stone-600">⭐{hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>



        </div>
    )
}

export default Hotels;