import React from "react";
import { ListGroup, Container } from "react-bootstrap";
import { Restaurant } from "../types/Restaurant";
import { getRestaurants } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import Error from "./Error";
import Loading from "./Loading";

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect,
}) => {
  const {
    isPending,
    error,
    data: restaurants,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  if (isPending) return <Loading />;

  if (error)
    return <Error errorMessage={"An error has occurred: " + error.message} />;

  return (
    <Container>
      <h2>Restaurants</h2>
      <ListGroup>
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
