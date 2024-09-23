import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookTable from "../components/BookTable";
import RestaurantDetails from "../components/RestaurantDetails";
import RestaurantList from "../components/RestaurantList";

const HomePage: React.FC = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

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
              <BookTable />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
