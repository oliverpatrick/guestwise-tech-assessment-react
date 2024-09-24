import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RestaurantList from "./RestaurantList";
import { getRestaurants } from "../../api/get";
import { RestaurantData } from "../../types/Restaurant";
import ErrorFallback from "../Fallbacks/Error";

// Mock the getRestaurants API call
jest.mock("../../api/get");

const mockRestaurants: RestaurantData[] = [
  {
    id: 1,
    name: "Restaurant A",
    shortDescription: "Description A",
    rating: 4.5,
    cuisine: "Bri'ish",
    details: {
      id: 1,
      address: "364 Baker Street, London",
      openingHours: {
        weekday: "12:00 PM - 10:00 PM",
        weekend: "11:00 AM - 11:00 PM",
      },
      reviewScore: 5,
      contactEmail: "sherlybones@detective.co.uk",
    },
  },
  {
    id: 2,
    name: "Restaurant B",
    shortDescription: "Description B",
    rating: 3.8,
    cuisine: "French",
    details: {
      id: 2,
      address: "10 Downing Street, London",
      openingHours: {
        weekday: "10:00 AM - 12:00 PM",
        weekend: "Closed",
      },
      reviewScore: 1,
      contactEmail: "defence@gov.uk",
    },
  },
  {
    id: 3,
    name: "Restaurant C",
    shortDescription: "Description C",
    rating: 4.2,
    cuisine: "Japanese",
    details: {
      id: 3,
      address: "Sushi Street, Tokyo",
      openingHours: {
        weekday: "8:00 AM - 10:00 PM",
        weekend: "10:00 AM - 11:00 PM",
      },
      reviewScore: 0,
      contactEmail: "gogosushi@yum.com",
    },
  },
];

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <RestaurantList onRestaurantSelect={jest.fn()} />
    </QueryClientProvider>
  );

describe("RestaurantList", () => {
  beforeEach(() => {
    (getRestaurants as jest.Mock).mockResolvedValue(mockRestaurants);
  });

  it("renders loading state initially", () => {
    renderComponent();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders restaurants after loading", async () => {
    renderComponent();
    await screen.findByText("Restaurant A");
    expect(screen.getByText("Restaurant B")).toBeInTheDocument();
    expect(screen.getByText("Restaurant C")).toBeInTheDocument();
  });

  it("filters restaurants based on search term", async () => {
    renderComponent();
    await screen.findByText("Restaurant A");

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "B" },
    });
    expect(screen.queryByText("Restaurant A")).not.toBeInTheDocument();
    expect(screen.getByText("Restaurant B")).toBeInTheDocument();
    expect(screen.queryByText("Restaurant C")).not.toBeInTheDocument();
  });

  it("sorts restaurants alphabetically", async () => {
    renderComponent();
    await screen.findByText("Restaurant A");

    fireEvent.click(screen.getByLabelText(/alphabetical/i));
    const restaurantNames = screen
      .getAllByRole("heading", { level: 5 })
      .map((el) => el.textContent);
    expect(restaurantNames).toEqual([
      "Restaurant A",
      "Restaurant B",
      "Restaurant C",
    ]);
  });

  it("sorts restaurants by rating", async () => {
    renderComponent();
    await screen.findByText("Restaurant A");

    fireEvent.click(screen.getByLabelText(/rating/i));
    const restaurantNames = screen
      .getAllByRole("heading", { level: 5 })
      .map((el) => el.textContent);
    expect(restaurantNames).toEqual([
      "Restaurant A",
      "Restaurant C",
      "Restaurant B",
    ]);
  });

  it("renders error state when API call fails", async () => {
    (getRestaurants as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<ErrorFallback errorMessage="An error has occurred: API Error" />);
    expect(screen.getByText(/An error has occurred/i)).toBeInTheDocument();
  });
});
