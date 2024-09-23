import { BookingFormData } from "../types/BookingForm";
import { fetchData } from "./fetch";

export const postBookings = async (bookingData: BookingFormData) => {
  return fetchData("bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
};
