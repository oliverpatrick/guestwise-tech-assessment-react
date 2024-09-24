import { HttpResponse, http } from "msw";

import { networkDelay } from "../utils";

export const restaurantsHandler = [
  http.get(`${process.env.REACT_APP_API_URL}/restaurants`, async () => {
    await networkDelay();

    try {
      const result = [
        {
          id: "1",
          name: "Velvet & Vine",
          shortDescription: "A fine dining experience with a modern twist.",
          cuisine: "French",
          rating: 4.7,
          details: {
            id: 1,
            address: "123 Fine St, London",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 4.7,
            contactEmail: "info@gourmetkitchen.com",
          },
        },
        {
          id: "2",
          name: "Sushi Paradise",
          shortDescription: "Traditional sushi and modern fusion rolls.",
          cuisine: "Japanese",
          rating: 4.5,
          details: {
            id: 2,
            address: "456 Sushi Ave, London",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 4.5,
            contactEmail: "contact@sushiparadise.com",
          },
        },
        {
          id: "3",
          name: "Restaurant 3",
          shortDescription: "Description for Restaurant 3.",
          cuisine: "Cuisine Type",
          rating: 3,
          details: {
            id: 3,
            address: "3 Address St, City",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 3,
            contactEmail: "contact@restaurant3.com",
          },
        },
        {
          id: "4",
          name: "Restaurant 4",
          shortDescription: "Description for Restaurant 4.",
          cuisine: "Cuisine Type",
          rating: 3.1,
          details: {
            id: 4,
            address: "4 Address St, City",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 3.1,
            contactEmail: "contact@restaurant4.com",
          },
        },
        {
          id: "5",
          name: "Restaurant 5",
          shortDescription: "Description for Restaurant 5.",
          cuisine: "Cuisine Type",
          rating: 3.2,
          details: {
            id: 5,
            address: "5 Address St, City",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 3.2,
            contactEmail: "contact@restaurant5.com",
          },
        },
        {
          id: "6",
          name: "Restaurant 6",
          shortDescription: "Description for Restaurant 6.",
          cuisine: "Cuisine Type",
          rating: 3.3,
          details: {
            id: 6,
            address: "6 Address St, City",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 3.3,
            contactEmail: "contact@restaurant6.com",
          },
        },
        {
          id: "7",
          name: "Restaurant 7",
          shortDescription: "Description for Restaurant 7.",
          cuisine: "Cuisine Type",
          rating: 3.4,
          details: {
            id: 7,
            address: "7 Address St, City",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 3.4,
            contactEmail: "contact@restaurant7.com",
          },
        },
      ];
      return HttpResponse.json({
        data: result,
      });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500 }
      );
    }
  }),

  http.get(
    `${process.env.REACT_APP_API_URL}/restaurants/:restaurantId`,
    async () => {
      await networkDelay();

      try {
        // const restaurantId = params.restaurantId as string;
        const restaurant = {
          id: "1",
          name: "Velvet & Vine",
          shortDescription: "A fine dining experience with a modern twist.",
          cuisine: "French",
          rating: 4.7,
          details: {
            id: 1,
            address: "123 Fine St, London",
            openingHours: {
              weekday: "12:00 PM - 10:00 PM",
              weekend: "11:00 AM - 11:00 PM",
            },
            reviewScore: 4.7,
            contactEmail: "info@gourmetkitchen.com",
          },
        };

        if (!restaurant) {
          return HttpResponse.json(
            { message: "Restaurant not found" },
            { status: 404 }
          );
        }

        return HttpResponse.json({ data: restaurant });
      } catch (error: any) {
        return HttpResponse.json(
          { message: error?.message || "Server Error" },
          { status: 500 }
        );
      }
    }
  ),
];

export default restaurantsHandler;
