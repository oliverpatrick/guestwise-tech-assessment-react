import React, { useMemo, useState } from "react";
import { ListGroup, Container } from "react-bootstrap";
import { RestaurantData } from "../../types/Restaurant";
import { getRestaurants } from "../../api/get";
import { useQuery } from "@tanstack/react-query";
import ErrorFallback from "../Fallbacks/Error";
import Loading from "../Fallbacks/Loading";
import SearchAndSort from "../Search/SearchAndSort";

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
};

/**
 * Restaurant list component
 *
 * @param {*} onRestaurantSelect - Id restaurant selection
 * @returns {*}
 */
const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect,
}) => {
  const {
    isPending,
    error,
    data: restaurants,
  } = useQuery<RestaurantData[]>({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    staleTime: 1000 * 60 * 5,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSortOptions, setSelectedSortOptions] = useState<string[]>([]);

  const handleSortChange = (option: string) => {
    setSelectedSortOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((o) => o !== option)
        : [...prevOptions, option]
    );
  };

  const filteredAndSortedRestaurants = useMemo(() => {
    let filteredRestaurants = restaurants?.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedSortOptions.includes("alphabetical")) {
      filteredRestaurants = filteredRestaurants?.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (selectedSortOptions.includes("rating")) {
      filteredRestaurants = filteredRestaurants?.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return filteredRestaurants;
  }, [restaurants, searchTerm, selectedSortOptions]);

  if (isPending) return <Loading />;

  if (error)
    return (
      <ErrorFallback errorMessage={`An error has occurred: ${error.message}`} />
    );

  return (
    <Container>
      <h2>Restaurants</h2>
      <SearchAndSort
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSortOptions={selectedSortOptions}
        onSortChange={handleSortChange}
      />
      <ListGroup>
        {filteredAndSortedRestaurants
          ? filteredAndSortedRestaurants.map((restaurant: RestaurantData) => (
              <ListGroup.Item
                key={restaurant.id}
                action
                onClick={() => onRestaurantSelect(restaurant.id)}
              >
                <h5>{restaurant.name}</h5>
                <p>{restaurant.shortDescription}</p>
              </ListGroup.Item>
            ))
          : []}
      </ListGroup>
    </Container>
  );
};

export default RestaurantList;
