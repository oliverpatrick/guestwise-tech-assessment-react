import { useQuery, queryOptions } from "@tanstack/react-query";
import { Restaurant } from "../../../types/api/restaurant";
import { api } from "../../../lib/api-client";
import { QueryConfig } from "../../../lib/react-query";

export const getRestaurantDetails = ({
  restaurantId,
}: {
  restaurantId: string;
}): Promise<Restaurant> => {
  return api.get(`/restaurants/${restaurantId}`);
};

export const getRestaurantDetailsQueryOptions = (restaurantId: string) => {
  return queryOptions({
    queryKey: ["restaurants", restaurantId],
    queryFn: () => getRestaurantDetails({ restaurantId }),
  });
};

type UseRestaurantDetailsOptions = {
  restaurantId: string;
  queryConfig?: QueryConfig<typeof getRestaurantDetailsQueryOptions>;
};

export const useRestaurantDetails = ({
  restaurantId,
  queryConfig,
}: UseRestaurantDetailsOptions) => {
  return useQuery({
    ...getRestaurantDetailsQueryOptions(restaurantId),
    ...queryConfig,
  });
};
