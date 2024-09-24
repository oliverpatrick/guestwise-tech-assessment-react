import { useMutation } from "@tanstack/react-query";
import { api } from "../../../lib/api-client";
import { MutationConfig } from "../../../lib/react-query";
import { Booking } from "../../../types/booking";
import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  guests: z
    .number()
    .min(1, "At least 1 guest is required")
    .max(12, "Maximum 12 guests allowed"),
  date: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Date must be in the future",
  }),
  time: z.string().refine(
    (time) => {
      const bookingDateTime = new Date(
        `${new Date().toISOString().split("T")[0]}T${time}`
      );
      return bookingDateTime.getTime() > Date.now() + 3600000;
    },
    {
      message: "Booking must be at least 1 hour in the future",
    }
  ),
});

export type BookingFormInput = z.infer<typeof bookingSchema>;

export const createBooking = ({
  bookingData,
}: {
  bookingData: BookingFormInput;
}): Promise<Booking> => {
  return api.post(`/bookings`, bookingData);
};

type UseCreateBookingOptions = {
  mutationConfig?: MutationConfig<typeof createBooking>;
};

export const useCreateBooking = ({
  mutationConfig,
}: UseCreateBookingOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createBooking,
  });
};
