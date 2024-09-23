<img width="300" alt="image" src="https://github.com/user-attachments/assets/1de0151b-8aa1-4570-b49d-1ffb6c37e13b">

# Guestwise React Technical Assessment

## Technical Test Brief

### Objective

Your task is to develop and enhance a Mock React application designed to help users find a restaurant and book a table.

The application currently displays a static list of restaurants. You need to integrate it with a dynamic data source to load restaurants, display the restaurant details, and handle bookings.

### Current State

- **Static Setup**: The app displays a single static restaurant in the `RestaurantList` component.
- **Mock Server**: `mock-server.json` provides data for restaurants and bookings. This is served via json-server at `/restaurants` and `/bookings`.

### Tasks

1. **Fetch and Display Restaurants**:

   - Use the provided `services/api.ts` to fetch data from the API endpoints (`/restaurants` and `/restaurant/:id`).
   - Populate the `RestaurantList` component with dynamic data.

2. **Restaurant Details**:

   - When a restaurant is selected, display detailed information about it, including opening hours and rating, in the `RestaurantDetails` component.

3. **Booking a Table**:

   - Implement the `BookTable` component to handle booking requests.
   - On form submission, POST the booking data to the `/bookings` endpoint.
   - Ensure the following validation rules:
     - **Date/Time**: Bookings must be scheduled for at least 1 hour in the future and cannot be set for the past.
     - **Guests**: Limit bookings to a maximum of 12 people. Inform users to contact the restaurant directly via email if booking for more than 12.
     - **Form Validation**: Ensure the presence of required fields (name, email, phone), validity of email and phone number, and check for the number of guests.

4. **Search and Sorting**:

   - Implement search functionality to filter the restaurant list.
   - Allow sorting of the restaurant list alphabetically by name or by rating.

5. **Error Handling & UX Optimisation**:

   - Handle cases where the server is not running or responding slowly.
   - Display loading spinners or messages to inform users when requests are in progress or if errors occur.
   - Ensure a responsive and intuitive User Interface with appropriate feedback for user actions.

6. **Performance**:

   - Optimise the app to handle slow network conditions gracefully and ensure smooth UX even on slower connections.

7. **Testing**:
   - Write tests to ensure the functionality of search, sorting, booking, and error handling.

### API Endpoints

- **Get Restaurants**: `GET /restaurants`
- **Get Restaurant Details**: `GET /restaurants/:id`
- **Post Booking**: `POST /bookings`

### Mock Server Setup

1. **Run json-server**:

   - Start json-server to serve `mock-server.json`:

   ```bash
   npm run server
   ```

   - The server will be accessible at [http://localhost:3001](http://localhost:3001).

2. **Endpoints**:
   - **Restaurants**: [http://localhost:3001/restaurants](http://localhost:3001/restaurants)
   - **Bookings**: [http://localhost:3001/bookings](http://localhost:3001/bookings)

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run server`

Runs json-server in development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Evaluation Process

1. **Functional Requirements**:

   - Correctly fetches and displays dynamic data
   - Handles booking submissions
   - Appropriately handles and adheres to validation for submissions
   - Implements search and sorting

2. **User Experience**:

   - Smooth, responsive user interface
   - Appropriate feedback to user for loading, errors, and network issues.

3. **Code Review**:

   - We will review your code for clarity, structure, and adherence to React best practices.
   - We will also review your tests for coverage and correctness.

4. **Bonus Points**:

   - Regular commits with clear commit messages, demonstrating your thought process and approach.
   - Any additional improvements that enhance the performance or functionality beyond the brief will be appreciated.
   - Future-proofing the application for scalability, resiliance, reliability and maintainability.

5. **Submission**:
   - Once you have completed the task, please commit your changes and push them to a forked repository and share the link with us.
   - We'll then arrange a follow-up call to discuss your solution and answer any questions you may have.

## Good To Know

- The mock-server.json file contains the data for the restaurants and will be served by json-server.
- The mock-server.json will also be populated with booking data when you submit a booking form. You can check the file to see all of your booking data is being submitted and stored.
- We're not looking for a perfect solution, or lots of UI creativity, but we want to see how you approach the problem and your thought process.

Good luck, and happy coding!
