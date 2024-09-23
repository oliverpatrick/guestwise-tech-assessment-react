const fetchData = async (endpoint: string) => {
  const response = await fetch(`http://localhost:3001/${endpoint}`);
  return response.json();
};

export const getRestaurants = async () => {
  return fetchData("restaurants");
};

export const getRestaurantDetails = async (id: number) => {
  return fetchData(`restaurants/${id}`);
};
