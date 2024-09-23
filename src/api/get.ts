import { fetchData } from "./fetch";

export const getRestaurants = async () => {
  return fetchData("restaurants");
};

export const getRestaurantDetails = async (id: number) => {
  return fetchData(`restaurants/${id}`);
};
