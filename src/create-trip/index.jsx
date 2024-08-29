import React, { useEffect, useState } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { toast } from 'sonner';
import { chatSession } from "@/service/AIModel";
import { useGoogleLogin } from "@react-oauth/google";
import { db } from "@/service/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useNavigation } from "react-router-dom";


const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name && value) {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]
  );


  const login = useGoogleLogin({

    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.days || !formData?.budget || !formData?.traveler || !formData?.location
    ) {
      toast("Please fill in all fields", { type: 'error' });
      return;
    }
    console.log('Generating trip', formData);
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace(/{totalDays}/g, formData?.days)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      ;

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log('Generated result:', result);

    const responseText = result?.response?.text();
    console.log('Original response:', responseText);


    // if (responseText.startsWith('```json')) {
    //   responseText = responseText.replace('```json', '').replace('```', '').trim();
    // }
    // if (responseText.endsWith('```')) {
    //   responseText = responseText.replace('```', '').trim();
    // }
    // console.log('Trimmed response:', responseText);
    let tripData;
    tripData = JSON.parse(responseText);
    setLoading(false);
    // console.log('Generated response:', responseText);

    SaveAITrip(responseText);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json",
      },
    }).then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      onGenerateTrip();
    }
    )
  }

  const SaveAITrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId

    });
    setLoading(false);
    toast("Trip generated successfully", { type: 'success' });
    navigate(`/view-trip/${docId}`);

  }


  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="text-3xl font-bold text-stone-800">
        Tell us about your travel preferences,
      </h2>
      <p className="text-xl text-stone-600 mt-5">
        Just provide us with some basic information about your travel preferences and we'll take care of the rest.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of your trip?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={apiKey}
            // loading={async}
            selectProps={{
              place, onChange: (v) => { setPlace(v); handleInputChange('location', v); console.log(v) }
            }
            }
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days will you be traveling?
          </h2>
          <Input
            type="number"
            placeholder="Number of days"
            className="border border-stone-300 p-3 w-full rounded-md"
            onChange={(e) => handleInputChange('days', e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your budget?
          </h2>
          <div className="grid grid-cols-3 flex gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow cursor-pointer
                  ${formData?.budget == item.title && 'shadow-lg border-black'} `
                }>
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-stone-600">{item.desc}</h2>

              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to travel with on you next adventure?
          </h2>
          <div className="grid grid-cols-3 flex gap-5">
            {SelectTravelsList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow cursor-pointer
                ${formData?.traveler == item.people && 'shadow-lg border-black'}
                `}>
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-stone-600">{item.desc}</h2>

              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex ">
        <Button
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading ? <AiOutlineLoading3Quarters className="h-7 w-t animate-spin" /> : "Generate Your Trip!"}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <img className="my-5" src="/logo.svg" alt="Are you sure?" />
              <h2 className="font-bold text-lg">Sign In With Google</h2>
              <p> Sign in with your Google account to generate your travel plan.</p>
              <Button

                onClick={login}
                className="my-5 w-full flex gap-4 items-center">
                {loading ?
                  "test" : <AiOutlineLoading3Quarters className="animate-spin h-7 w-7 text-lg" />}
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}


export default CreateTrip;
