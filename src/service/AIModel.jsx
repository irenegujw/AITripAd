import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$35-$70 per night\", \n      \"hotelImageUrl\": \"https://example.com/circuscircus.jpg\", \n      \"geoCoordinates\": {\n        \"latitude\": 36.1435,\n        \"longitude\": -115.1648\n      },\n      \"rating\": 3.5, \n      \"description\": \"Affordable hotel with a circus theme, midway games, and an indoor amusement park.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\", \n      \"hotelImageUrl\": \"https://example.com/excalibur.jpg\", \n      \"geoCoordinates\": {\n        \"latitude\": 36.1101,\n        \"longitude\": -115.1763\n      },\n      \"rating\": 3.5,\n      \"description\": \"Castle-themed hotel with affordable rooms, multiple pools, and entertainment options.\"\n    },\n    {\n      \"hotelName\": \"The LINQ Hotel + Experience\",\n      \"hotelAddress\": \"3535 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$50-$90 per night\", \n      \"hotelImageUrl\": \"https://example.com/thelinq.jpg\", \n      \"geoCoordinates\": {\n        \"latitude\": 36.1186,\n        \"longitude\": -115.1712\n      },\n      \"rating\": 4,\n      \"description\": \"Trendy hotel with a lively atmosphere, outdoor promenade, and the High Roller observation wheel.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Breakfast at Peppermill Restaurant & Fireside Lounge\",\n        \"placeDetails\": \"Retro-glam restaurant known for its giant portions and signature cocktails.\",\n        \"placeImageUrl\": \"https://example.com/peppermill.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1348,\n          \"longitude\": -115.1606\n        },\n        \"rating\": 4.5,\n        \"ticketPricing\": \"$15-$30 per person\"\n      },\n      \"afternoon\": {\n        \"time\": \"11:00 AM\",\n        \"activity\": \"Explore the Strip\",\n        \"placeDetails\": \"Walk along the iconic Las Vegas Strip, take photos of the Bellagio fountains, and check out the various hotels and attractions.\",\n        \"placeImageUrl\": \"https://example.com/lasvegasstrip.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1275,\n          \"longitude\": -115.1719 \n        },\n        \"rating\": 4.5,\n        \"ticketPricing\": \"Free (except for attractions and shows)\"\n      },\n      \"evening\": {\n        \"time\": \"7:00 PM\",\n        \"activity\": \"Free Show at Fremont Street Experience\",\n        \"placeDetails\": \"Enjoy the vibrant atmosphere and free light shows on the Viva Vision canopy at Fremont Street Experience.\",\n        \"placeImageUrl\": \"https://example.com/fremontstreet.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1695,\n          \"longitude\": -115.1401\n        },\n        \"rating\": 4,\n        \"ticketPricing\": \"Free\"\n      }\n    },\n    \"day2\": {\n      \"morning\": {\n        \"time\": \"10:00 AM\",\n        \"activity\": \"Visit the Neon Sign Museum\",\n        \"placeDetails\": \"Explore the Neon Boneyard, home to a collection of iconic neon signs from Las Vegas' past.\",\n        \"placeImageUrl\": \"https://example.com/neonmuseum.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1341,\n          \"longitude\": -115.1627 \n        },\n        \"rating\": 4.5,\n        \"ticketPricing\": \"$20-$30 per person\"\n      },\n      \"afternoon\": {\n        \"time\": \"1:00 PM\",\n        \"activity\": \"Lunch at In-N-Out Burger\",\n        \"placeDetails\": \"Enjoy a classic California burger at the popular In-N-Out Burger chain.\",\n        \"placeImageUrl\": \"https://example.com/innout.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1172, \n          \"longitude\": -115.1717\n        },\n        \"rating\": 4.5,\n        \"ticketPricing\": \"$5-$10 per person\"\n      },\n      \"evening\": {\n        \"time\": \"7:00 PM\",\n        \"activity\": \"Attend a Show\",\n        \"placeDetails\": \"Consider affordable show options like a Cirque du Soleil performance or a magic show.\",\n        \"placeImageUrl\": \"https://example.com/cirquedusoleil.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": \"Varies\",\n          \"longitude\": \"Varies\"\n        },\n        \"rating\": 4.5,\n        \"ticketPricing\": \"Varies (check online for discounts)\"\n      }\n    },\n    \"day3\": {\n      \"morning\": {\n        \"time\": \"9:00 AM\",\n        \"activity\": \"Visit the Bellagio Conservatory & Botanical Garden\",\n        \"placeDetails\": \"Experience the stunning floral displays and horticultural artistry at the Bellagio Conservatory.\",\n        \"placeImageUrl\": \"https://example.com/bellagioconservatory.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1141,\n          \"longitude\": -115.1762\n        },\n        \"rating\": 4.5,\n        \"ticketPricing\": \"Free\"\n      },\n      \"afternoon\": {\n        \"time\": \"12:00 PM\",\n        \"activity\": \"Lunch at a Buffet\",\n        \"placeDetails\": \"Enjoy a variety of cuisines at an affordable Las Vegas buffet.\",\n        \"placeImageUrl\": \"https://example.com/lasvegasbuffet.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": \"Varies\", \n          \"longitude\": \"Varies\"\n        },\n        \"rating\": 4,\n        \"ticketPricing\": \"$20-$30 per person\"\n      },\n      \"evening\": {\n        \"time\": \"7:00 PM\",\n        \"activity\": \"Enjoy the Fountains at Bellagio\",\n        \"placeDetails\": \"Watch the synchronized water, music, and light show of the Bellagio fountains.\",\n        \"placeImageUrl\": \"https://example.com/bellagiofountains.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1141,\n          \"longitude\": -115.1762\n        },\n        \"rating\": 5,\n        \"ticketPricing\": \"Free\"\n      }\n    }\n  }\n}\n\n"},
          ],
        },
      ],
    });