import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RestaurantList from "../../../features/restaurants/components/restaurant-list";
import RestaurantDetails from "../../../features/restaurants/components/restaurant-details";
import BookingForm from "../../../features/booking-form/booking-form";

const HomeRoute: React.FC = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  console.log("selectedRestaurantId", selectedRestaurantId);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <RestaurantList onRestaurantSelect={setSelectedRestaurantId} />
        </Col>
        <Col md={8}>
          {selectedRestaurantId && (
            <>
              <RestaurantDetails restaurantId={selectedRestaurantId} />
              <BookingForm />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomeRoute;
