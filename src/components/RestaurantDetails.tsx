import React from "react";
import { Card, Container } from "react-bootstrap";
import { getRestaurantDetails } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { RestaurantDetailsData } from "../types/RestaurantDetails";
import Error from "./Error";
import Loading from "./Loading";
import { RestaurantData } from "../types/Restaurant";

type RestaurantDetailsProps = {
  restaurantId: number;
};

/**
 * Restaurant details component
 *
 * @param {*} restaurantId - Restaurant id
 * @returns {*}
 */
const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {
  const { isPending, error, data } = useQuery<RestaurantData>({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => getRestaurantDetails(restaurantId),
    enabled: !!restaurantId,
  });

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={`Error: ${error.message}`} />;

  const details: RestaurantDetailsData | undefined = data?.details;

  if (!details) {
    return <Error errorMessage="No details available for this restaurant." />;
  }
  console.log("Restaurant id: ", restaurantId);
  console.log("Details: ", details);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Restaurant Details</Card.Title>
          <Card.Text>Address: {details.address}</Card.Text>
          <Card.Text>Review Score: {details.reviewScore}</Card.Text>
          <Card.Text>Contact: {details.contactEmail}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
