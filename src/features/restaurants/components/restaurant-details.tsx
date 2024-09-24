import React, { useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { useRestaurantDetails } from "../api/get-restaurant-details";
import ErrorFallback from "../../../components/errors/error";
import Loading from "../../../components/ui/loading/Loading";
import { RestaurantDetails as RestaurantDetailsData } from "../../../types/api/restaurant";

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
  const restaurantDetailsQuery = useRestaurantDetails({
    restaurantId: restaurantId.toString(),
  });

  const [showOpeningHours, setShowOpeningHours] = useState(false);
  const toggleModal = () => setShowOpeningHours((prev) => !prev);

  if (restaurantDetailsQuery.isLoading) return <Loading />;
  if (restaurantDetailsQuery.isError)
    return (
      <ErrorFallback errorMessage={`Error: ${restaurantDetailsQuery.error}`} />
    );

  const details: RestaurantDetailsData | undefined =
    restaurantDetailsQuery.data?.details;

  if (!details) {
    return (
      <ErrorFallback errorMessage="No details available for this restaurant." />
    );
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
