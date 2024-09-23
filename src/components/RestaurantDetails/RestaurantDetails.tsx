import React, { useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { getRestaurantDetails } from "../../api/get";
import { useQuery } from "@tanstack/react-query";
import { RestaurantDetailsData } from "../../types/RestaurantDetails";
import Error from "../Fallbacks/Error";
import Loading from "../Fallbacks/Loading";
import { RestaurantData } from "../../types/Restaurant";

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
  const [showOpeningHours, setShowOpeningHours] = useState(false);
  const { isPending, error, data } = useQuery<RestaurantData>({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => getRestaurantDetails(restaurantId),
    enabled: !!restaurantId,
  });

  const toggleModal = () => setShowOpeningHours((prev) => !prev);

  if (isPending) return <Loading />;
  if (error) return <Error errorMessage={`Error: ${error.message}`} />;

  const details: RestaurantDetailsData | undefined = data?.details;

  if (!details) {
    return <Error errorMessage="No details available for this restaurant." />;
  }

  const { address, reviewScore, contactEmail, openingHours } = details;
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekends = ["Sat", "Sun"];

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Restaurant Details</Card.Title>
          <Card.Text>Address: {address}</Card.Text>
          <Card.Text>Review Score: {reviewScore}</Card.Text>
          <Card.Text>Contact: {contactEmail}</Card.Text>
          <Button variant="primary" onClick={toggleModal}>
            Opening Hours
          </Button>
        </Card.Body>

        <Modal show={showOpeningHours} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Opening Hours:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Body>
              {weekdays.map((day) => (
                <Card.Text key={day}>
                  {day}: {openingHours.weekday}
                </Card.Text>
              ))}
              {weekends.map((day) => (
                <Card.Text key={day}>
                  {day}: {openingHours.weekend}
                </Card.Text>
              ))}
            </Card.Body>
          </Modal.Body>
        </Modal>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
