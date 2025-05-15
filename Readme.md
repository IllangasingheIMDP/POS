# Project Setup Instructions

Follow these steps to run the React frontend with the Spring Boot backend.

## Prerequisites

- Node.js and npm installed
- Java (JDK 11 or above) installed
- MySQL or compatible database installed

## 1. Database Setup

1. Create a new database in your SQL server.
2. Run the provided SQL files in your database to set up the schema and initial data.

    ```sh
    run restaurantSetup.sql and run restaurantInsert.sql in your mysql database.
    I have added some delete on cascade rules
    ```

## 2. Backend (Spring Boot) Setup

1. Navigate to the backend directory:

    ```sh
    cd re
    ```

2. Configure your database connection in `application.properties`.
3. Build and run the Spring Boot application:

    

    

    ```sh
    mvn spring-boot:run
    ```
    or
    ```sh
    run main java application from vscode
    ```

## 3. Frontend (React) Setup

1. Navigate to the frontend directory:

    ```sh
    cd frontend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the React development server:

    ```sh
    npm start
    ```

## 4. Access the Application

- The React app will be running at [http://localhost:5173](http://localhost:3000)
### If the frontend runs on different port make sure to add it in the backend security config files for cors policies
- The Spring Boot backend will be running at [http://localhost:8080](http://localhost:8080)

## Notes

- Make sure the backend is running before using the frontend.
- Update API endpoints in the React app if your backend runs on a different port.
