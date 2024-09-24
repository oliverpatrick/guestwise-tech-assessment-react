import React, { useCallback, useMemo } from "react";
import { ListGroup, Container, Row } from "react-bootstrap";

import { useRestaurants } from "../api/get-restaurants";
import { Restaurant } from "../../../types/api/restaurant";
import ErrorFallback from "../../../components/errors/error";
import Loading from "../../../components/ui/loading/Loading";
import Search from "../../../components/ui/search/search";
import Sort from "../../../components/ui/sort/sort";
import { useSortAndFilter } from "../../../hooks/use-sort-and-filter";

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
  const restaurantQuery = useRestaurants({});
  const restaurants = restaurantQuery.data;

  const sortOptions = useMemo(
    () => [
      { label: "Alphabetical", value: "alphabetical" as const },
      { label: "Rating", value: "rating" as const },
    ],
    []
  );

  const filterFn = useCallback((restaurant: Restaurant, searchTerm: string) => {
    return (
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.shortDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, []);

  const {
    sortedAndFilteredData,
    sortBy,
    searchTerm,
    handleSortChange,
    handleSearchChange,
  } = useSortAndFilter({
    data: restaurants || [],
    sortOptions,
    initialSortBy: "name",
    filterFn,
  });

  if (restaurantQuery.isLoading) {
    return <Loading />;
  }

  if (!restaurants || restaurantQuery.isError) {
    return <ErrorFallback errorMessage="Error fetching restaurants" />;
  }

  return (
    <Container>
      <h2>Restaurants</h2>
      <Row className="mb-4">
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <Sort
          sortOptions={sortOptions}
          selectedSortOptions={sortBy!}
          onSortChange={handleSortChange}
        />
      </Row>
      <ListGroup>
        {sortedAndFilteredData.map((restaurant: Restaurant) => (
          <ListGroup.Item
            key={restaurant.id}
            action
            onClick={() => onRestaurantSelect(restaurant.id)}
          >
            <h5>{restaurant.name}</h5>
            <p>{restaurant.shortDescription}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default RestaurantList;
