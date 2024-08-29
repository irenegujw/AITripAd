import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotel from "../components/Hotels";
import PlacesToVisited from "../components/PlacesToVisited";

const ViewTrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No such document!");
            toast("No such document!", { type: 'error' });
        }
    }



    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            ViewTrip: {tripId} 

            {/* Info section */}
            <InfoSection trip={trip} />

            {/* Hotels */}
            <Hotel trip={trip} />

            {/* daily plan */}
            <PlacesToVisited trip={trip} />

            {/* footer */}
            
        
        </div>
    )
}

export default ViewTrip;