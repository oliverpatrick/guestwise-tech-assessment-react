import { api } from "../../../lib/api-client";
import { QueryConfig } from "../../../lib/react-query";
import { Restaurant } from "../../../types/api/restaurant";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getRestaurants = (): Promise<Restaurant[]> => {
  return api.get(`/restaurants`);
};

export const getRestaurantsQueryOptions = () => {
  return queryOptions({
    queryKey: ["restaurants"],
    queryFn: () => getRestaurants(),
  });
};

type UseRestaurantsOptions = {
  queryConfig?: QueryConfig<typeof getRestaurantsQueryOptions>;
};

export const useRestaurants = ({ queryConfig }: UseRestaurantsOptions) => {
  return useQuery({
    ...getRestaurantsQueryOptions(),
    ...queryConfig,
  });
};
