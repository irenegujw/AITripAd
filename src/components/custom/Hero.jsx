import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="flex flex-col items-center mx-56 gap-9">
            <h1 className="font-extrabold text-[50px] text-center mt-16">
                <span className="text-stone-800">
                    Discover Your Next Trip with AI:     
                </span><br />
                <span className="text-stone-700">
                    Personalized Itineraries at Your Fingertips
                </span>
                
            </h1>
            <p className="text-xl text-stone-600 text-center"> 
                Your personal trip planner and travel curator, creating custom itineraries tailored to you interests and budget.
            </p>
            <Link to="/create-trip">
                <Button className="bg-stone-500 text-white px-6 py-3 rounded-lg">Get Started</Button>
            </Link>
        </div>
    );
}

export default Hero;