export type RestaurantDetailsData = {
  id: number;
  address: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  reviewScore: number;
  contactEmail: string;
};
