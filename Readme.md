
Recipe-Sharing Platform Backend

This repository contains the backend for the Recipe-Sharing Platform, built with Node.js and Express.

Features

User Authentication: Secure user authentication and management.
Recipe Management: Create, update, delete, and view recipes.
Comments & Ratings: Users can add comments and ratings to recipes.
Database Integration: Uses MySQL for data storage.

Getting Started

Prerequisites

Node.js and npm installed
MySQL server set up and running

Installation

Clone the repository:

git clone https://github.com/Gyanankur23/recipe-sharing-platform-backend.git
cd recipe-sharing-platform-backend

Install dependencies:

npm install

Configure the MySQL database:

Create a config.json file in the config directory and add the following:

{
  "development": {
    "username": "root",
    "password": "***",
    "database": "recipe_sharing",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

Running the Server

Start the development server:

npm run dev

The server will be running at http://localhost:3001.

API Endpoints

Auth

POST /api/auth/register: Register a new user
POST /api/auth/login: User login

Recipes

GET /api/recipes: Get all recipes
GET /api/recipes/:id: Get a recipe by ID
POST /api/recipes: Create a new recipe
PUT /api/recipes/:id: Update a recipe
DELETE /api/recipes/:id: Delete a recipe

Comments & Ratings

POST /api/recipes/:id/comments: Add a comment to a recipe
POST /api/recipes/:id/ratings: Add a rating to a recipe

Contributing

Contributions are welcome! Please fork the repository and create a pull request.
