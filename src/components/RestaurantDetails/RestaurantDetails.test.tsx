import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RestaurantDetails from "./RestaurantDetails";
import { getRestaurantDetails } from "../../api/get";
import { RestaurantDetailsData } from "../../types/RestaurantDetails";
import { RestaurantData } from "../../types/Restaurant";
import ErrorFallback from "../Fallbacks/Error";

// Mock the getRestaurantDetails API call
jest.mock("../../api/get");

const mockRestaurantDetails: RestaurantDetailsData = {
  id: 1,
  address: "123 Main St",
  reviewScore: 4.5,
  contactEmail: "contact@restaurant.com",
  openingHours: {
    weekday: "9 AM - 9 PM",
    weekend: "10 AM - 10 PM",
  },
};

const mockRestaurantData: RestaurantData = {
  id: 1,
  name: "",
  shortDescription: "",
  cuisine: "",
  rating: 0,
  details: {
    id: 1,
    address: "123 Main St",
    reviewScore: 4.5,
    contactEmail: "contact@restaurant.com",
    openingHours: {
      weekday: "9 AM - 9 PM",
      weekend: "10 AM - 10 PM",
    },
  },
};

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <RestaurantDetails restaurantId={1} />
    </QueryClientProvider>
  );

describe("RestaurantDetails", () => {
  it("renders loading state initially", () => {
    (getRestaurantDetails as jest.Mock).mockReturnValue(new Promise(() => {}));
    renderComponent();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state when API call fails", async () => {
    (getRestaurantDetails as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch")
    );
    render(<ErrorFallback errorMessage="Error: Failed to fetch" />);
    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });

  it("renders restaurant details when API call succeeds", async () => {
    (getRestaurantDetails as jest.Mock).mockResolvedValue(mockRestaurantData);
    renderComponent();

    await screen.findByText(/restaurant details/i, {}, { timeout: 5000 });
    expect(screen.getByText(/123 main st/i)).toBeInTheDocument();
    expect(screen.getByText(/4.5/i)).toBeInTheDocument();
    expect(screen.getByText(/contact@restaurant.com/i)).toBeInTheDocument();
  });

  it("toggles opening hours modal", async () => {
    (getRestaurantDetails as jest.Mock).mockResolvedValue(mockRestaurantData);
    render(
      <QueryClientProvider client={queryClient}>
        <RestaurantDetails restaurantId={1} />
      </QueryClientProvider>
    );
    await screen.findByText(/restaurant details/i);
    const button = screen.getByText(/opening hours/i);
    fireEvent.click(button);
    expect(screen.getByText(/opening hours:/i)).toBeInTheDocument();
    expect(screen.getByText(/mon: 9 am - 9 pm/i)).toBeInTheDocument();
    expect(screen.getByText(/sat: 10 am - 10 pm/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() =>
      expect(screen.queryByText(/opening hours:/i)).not.toBeInTheDocument()
    );
  });
});
