import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookingForm from "../components/BookingForm/BookingForm";
import RestaurantDetails from "../components/RestaurantDetails/RestaurantDetails";
import RestaurantList from "../components/RestaurantList/RestaurantList";

const HomePage: React.FC = () => {
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

export default HomePage;
