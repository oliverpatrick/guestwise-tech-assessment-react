import React from "react";
import { render } from "@testing-library/react";
import App from "../src/App";
import HomePage from "../src/pages/HomePage";

test("renders App with HomePage component", () => {
  render(<App />);

  expect(<HomePage />).toBeTruthy();
});
