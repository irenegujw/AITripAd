import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
    return (
        <div>
            <img src="https://picsum.photos/1000/1200" className="h-[340px] w-full object-cover rounded-xl" />

            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md">
                            📅 {trip?.userSelection?.days} Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md">
                            💸 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md">
                            💸 No. of Travelers: {trip?.userSelection?.traveler}</h2>

                    </div>
                </div>
                <Button className=''><IoIosSend /></Button>
            </div>

        </div>
    );
}

export default InfoSection;