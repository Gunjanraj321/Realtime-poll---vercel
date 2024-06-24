# Real-Time Poll Application
This project is a real-time poll application built with Node.js, Express, MongoDB, and Socket.io. It allows users to create polls, vote in real-time, and see live updates of poll results.

## Features
- Authentication: Users can sign up, log in, and authenticate using JSON Web Tokens (JWT).
- Poll Creation: Authenticated users can create polls with multiple options.
- Real-Time Voting: Users can vote on polls, and the results are updated in real-time for all connected clients.
- Poll Results: Users can view the results of polls, including the total votes for each option.
- User Dashboard: Users can view polls they have created and polls they have voted on.
  
## Technologies Used
## Backend:

- Node.js: Runtime environment for server-side application.
- Express.js: Web application framework for Node.js, providing a robust set of features for web and mobile applications.
- MongoDB (with Mongoose): NoSQL database for storing poll data and user information. Mongoose provides a schema-based solution for model definition and validation.
- Socket.io: Enables real-time bidirectional event-based communication between clients (web browsers) and the server.
- JSON Web Tokens (JWT): Used for secure authentication and authorization mechanisms.
## Frontend:

- React.js: JavaScript library for building user interfaces, facilitating the creation of interactive UI components.
- Ant Design: Comprehensive UI library with a set of high-quality React components and design principles.

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your machine.
- A non-relational database configured and running.

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Gunjanraj321/Realtime-poll.git
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Set up the environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
      ```env
      URI=<mongodb uri>
      JWTSECRETKEY=<secretkey-putanything>
      ```

4. Start the server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the React application:
    ```bash
    npm start
    ```
