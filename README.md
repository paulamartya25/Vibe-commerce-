Vibe Commerce - Mock E-Commerce App

A full-stack e-commerce shopping cart application built using the MERN stack (MongoDB, Express, React, Node.js). This project simulates a basic online store experience, allowing users to browse products, add items to a persistent cart, and proceed through a mock checkout process.

[Link to Demo Video] (<- Add your Loom/YouTube link here)

Features

Product Catalog: Displays products fetched live from the Fake Store API.

Shopping Cart: Users can add/remove items. Cart data persists in a database.

Mock Checkout: Simple form to collect user details and simulate order completion.

Persistent Storage: Uses MongoDB Atlas (cloud database) to store cart items.

API Integration: Fetches product data from fakestoreapi.com.

Error Handling: Basic error notifications on both frontend and backend.

Responsive Design: Adapts to different screen sizes (desktop, mobile).

Tech Stack

Frontend: React, Axios, CSS

Backend: Node.js, Express

Database: MongoDB (with Mongoose ODM), MongoDB Atlas (Cloud Hosting)

Environment Variables: dotenv

Setup and Running the Project

Follow these steps to get the application running locally:

Prerequisites

Node.js and npm installed (Download here)

Git installed (Download here)

A free MongoDB Atlas account (Sign up here)

Installation

Clone the repository:

git clone [https://github.com/paulamartya25/Vibe-commerce-.git](https://github.com/paulamartya25/Vibe-commerce-.git) # Replace with your repo URL if different
cd Vibe-commerce- # Go into the project directory


Install Backend Dependencies:

cd backend
npm install


Install Frontend Dependencies:

cd ../frontend # Go back up and then into frontend
npm install


Environment Setup (Crucial!)

Create MongoDB Atlas Cluster:

Log in to MongoDB Atlas and create a free M0 cluster.

Create a database user (e.g., user: my_app_user, password: your_password). Remember these credentials.

Allow connections from anywhere (IP Access List: 0.0.0.0/0).

Get your connection string (Connect -> Drivers).

Create .env file:

In the backend folder, create a file named .env.

Add your MongoDB connection string to this file, replacing <username> and <password> with your database user credentials:

MONGO_URI=mongodb+srv://<username>:<password>@your_cluster_url.mongodb.net/?retryWrites=true&w=majority


Running the Application

You need two terminals open for this.

Start the Backend Server:

Open a terminal in the backend folder.

Run:

node server.js


You should see Backend server is running on http://localhost:5000 and MongoDB Connected....

Start the Frontend Development Server:

Open a second terminal in the frontend folder.

Run:

npm start


Your browser should automatically open to http://localhost:3000, displaying the Vibe Commerce app.
