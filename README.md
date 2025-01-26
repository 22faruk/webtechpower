# FUIZ: Quiz and Flashcard Platform

## Project Description
FUIZ is a web application built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). The app aims to create a platform for users to create flashcards and either learn them the classic way or through automatically generated Quizzes . It integrates frontend Angular with a powerful backend using Node.js and Express.js, along with MongoDB for database management.

## Features
- **User Authentication**: Secure login and registration functionality using JWT.
- **CRUD Operations**: Create, Read, Update, and Delete features for managing data.
- **Responsive Design**: Optimized for both mobile and desktop devices.


![Screenshot 1](/screen1.png)
![Screenshot 2](/screen2.png)

## Technical Architecture
The application follows a typical MEAN stack architecture, structured as follows:


- **Frontend**: The Angular app consumes RESTful APIs provided by the backend and displays data dynamically.
- **Backend**: Node.js server using Express.js to handle requests, validate data, and interact with the MongoDB database.
- **Database**: MongoDB stores user and application data, offering scalability and flexibility.

## Technologies/Libraries Used
- **MongoDB**: NoSQL database used to store application data.
- **Express.js**: Web application framework for Node.js.
- **Angular**: Frontend framework to build a responsive and dynamic user interface.
- **Node.js**: JavaScript runtime for the server-side logic.
- **Mongoose**: ODM for MongoDB to manage database interactions.
- **JWT (JSON Web Tokens)**: For user authentication and session management.
- **Ng-Zorro**: For responsive and sleek UI design.
- **Bcrypt.js**: For password hashing and encryption.
- **Nodemon**: Tool for auto-reloading the server during development.
- **Cors**: Middleware for enabling cross-origin requests.

## How to Run the Project

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB (local or remote instance like MongoDB Atlas)
- npm (Node Package Manager)

### Setup Instructions:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/22faruk/webtechpower
2. **Checkout to the branch**
   ```bash
   git checkout 2-mean-stack
3. **Install the dependencies: Navigate to the root directory and run the following command to install backend dependencies:**
    ```bash
    cd server
    npm install
4. **Then, go to the Angular project directory and install frontend dependencies:**
    ```bash
    cd angular-client
    npm install
5. **Running the backend: Navigate to the backend directory and run the following command:**
    ```bash
    npm run server
6. **Running the frontend: Open a new terminal, navigate to the frontend directory, and run:**
    ```bash
    ng serve
7. **Access the Application: Open your browser and navigate to http://localhost:4200 to see the app in action.**