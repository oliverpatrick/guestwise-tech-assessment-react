export type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
  cuisine: string;
  rating: number;
  details: {
    id: number;
    address: string;
    openingHours: {
      weekday: string;
      weekend: string;
    };
    reviewScore: number;
    contactEmail: string;
  };
};
