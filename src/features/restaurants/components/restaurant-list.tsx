import React from "react";
import { ListGroup, Container, Row } from "react-bootstrap";

import { useRestaurants } from "../api/get-restaurants";
import { Restaurant } from "../../../types/api/restaurant";
import ErrorFallback from "../../../components/errors/error";
import Loading from "../../../components/ui/loading/Loading";
import Search from "../../../components/ui/search/search";
import Sort from "../../../components/ui/sort/sort";

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
        <Search searchTerm={""} onSearchChange={() => null} />
        <Sort selectedSortOptions={[]} onSortChange={() => null} />
      </Row>
      <ListGroup>
        {/* {filteredAndSortedRestaurants
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
          : []} */}
        {restaurants.map((restaurant: Restaurant) => (
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
