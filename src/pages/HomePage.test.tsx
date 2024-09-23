import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import RestaurantDetails from "../components/RestaurantDetails/RestaurantDetails";
import BookingForm from "../components/BookingForm/BookingForm";
import { Button, Container } from "react-bootstrap";

// Mock the child components
jest.mock("../components/RestaurantList/RestaurantList");
jest.mock("../components/RestaurantDetails/RestaurantDetails");
jest.mock("../components/BookingForm/BookingForm");

describe("HomePage", () => {
  beforeEach(() => {
    (RestaurantList as jest.Mock).mockImplementation(
      ({ onRestaurantSelect }) => (
        <Container data-testid="restaurant-list">
          <Button onClick={() => onRestaurantSelect(1)}>
            Select Restaurant
          </Button>
        </Container>
      )
    );
    (RestaurantDetails as jest.Mock).mockImplementation(({ restaurantId }) => (
      <Container data-testid="restaurant-details">
        Details for restaurant {restaurantId}
      </Container>
    ));
    (BookingForm as jest.Mock).mockImplementation(() => (
      <Container data-testid="booking-form">Booking Form</Container>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders HomePage component", () => {
    render(<HomePage />);
    expect(screen.getByTestId("restaurant-list")).toBeInTheDocument();
  });

  test("renders RestaurantDetails and BookingForm when a restaurant is selected", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByText("Select Restaurant"));

    expect(screen.getByTestId("restaurant-details")).toBeInTheDocument();
    expect(screen.getByTestId("booking-form")).toBeInTheDocument();
  });

  test("does not render RestaurantDetails and BookingForm when no restaurant is selected", () => {
    render(<HomePage />);

    expect(screen.queryByTestId("restaurant-details")).not.toBeInTheDocument();
    expect(screen.queryByTestId("booking-form")).not.toBeInTheDocument();
  });
});
