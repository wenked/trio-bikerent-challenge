# Trio Challenge - Full Stack Bike Rental System

Welcome to the Trio Challenge Full Stack Bike Rental System. This project is designed as a comprehensive solution for managing bike rentals, providing both a backend service for handling data and business logic, and a frontend application for user interaction. It's built with modern technologies including Node.js, Express, React, TypeScript, and Prisma, offering a robust and scalable platform.

## Overview

The system is designed to facilitate bike rentals, allowing users to browse available bikes, book them for specific dates, and manage their bookings. It's composed of two main parts:

- **Backend**: A Node.js application providing RESTful APIs for managing candidates, users, and bikes. It supports operations such as listing available bikes, registering users, and creating new bike bookings.
- **Frontend**: A React application that consumes the backend APIs, providing a user-friendly interface for interacting with the system. It includes pages for bike listings, user registrations, and bike bookings.

## Getting Started

### Prerequisites

- Node.js >= 16.13.2
- MySQL >= 8.0.32
- Yarn or npm

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies with `npm install` or `yarn`.
3. Set up your MySQL database and ensure it's running.
4. Create a `.env` file based on the `.env.example` provided, filling in your database connection details.
5. Run `npm run start` to start the backend server.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies with `npm install` or `yarn`.
3. Run `yarn start` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000) to view the frontend application in the browser.

## Testing

### Backend Testing

- Navigate to the `backend` directory.
- Run `npm test` to execute all tests.
- Use `npm run test:unit` for unit tests and `npm run test:integration` for integration tests.

### Frontend Testing

- Navigate to the `frontend` directory.
- Run `yarn test` to execute all tests.
- To run specific component/page tests, use `yarn test <PATH_TO_COMPONENT>`.

## Architecture

### Backend

The backend is structured around Express for handling HTTP requests, with Prisma as the ORM for database interactions. It follows a clean architecture pattern, separating concerns into different layers such as controllers, services, and repositories.

### Frontend

The frontend is built with React, utilizing functional components and hooks for state management. It's styled with Material UI and follows a modular structure, with components, services, and models organized in separate directories.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
