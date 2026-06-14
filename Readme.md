# 🍳 Recipe Sharing Platform - Backend

A production-ready RESTful API backend for a recipe sharing platform, built with Node.js, Express, and MySQL. Features secure authentication, recipe management, comments, ratings, and more.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **📝 Recipe Management**: Full CRUD operations for recipes with categories, images, and metadata
- **💬 Comments System**: Users can comment on recipes with threaded discussions
- **⭐ Rating System**: 1-5 star rating system with average calculations
- **🔒 Security**: Helmet for security headers, rate limiting, CORS configuration
- **📊 Logging**: Winston for structured logging with file and console outputs
- **🐳 Docker Support**: Docker and Docker Compose for easy deployment
- **✅ Validation**: Input validation using express-validator
- **🔄 Database**: MySQL with Sequelize ORM with proper associations
- **📈 Pagination**: Efficient pagination for recipe listings

## 🚀 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, bcrypt, express-rate-limit
- **Validation**: express-validator
- **Logging**: Winston, Morgan
- **Containerization**: Docker, Docker Compose

## 📋 Prerequisites

- Node.js 18 or higher
- MySQL 8.0 or higher
- npm or yarn
- Docker (optional, for containerized deployment)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gyanankur23/backend-Recipe-sharing.git
   cd backend-Recipe-sharing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=3001
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=recipe_sharing
   DB_USER=root
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Set up MySQL database**
   ```bash
   mysql -u root -p
   CREATE DATABASE recipe_sharing;
   ```

5. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

### Docker Deployment

1. **Build and start containers**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop containers**
   ```bash
   docker-compose down
   ```

## 📡 API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "chef_john",
  "password": "password123",
  "email": "john@example.com"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "chef_john",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Recipes

#### Get All Recipes
```http
GET /api/recipes?page=1&limit=10&category=Italian&search=pasta
```

#### Get Recipe by ID
```http
GET /api/recipes/:id
```

#### Create Recipe
```http
POST /api/recipes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Classic Spaghetti Carbonara",
  "content": "Recipe instructions...",
  "category": "Italian",
  "cookingTime": 30,
  "servings": 4,
  "imageUrl": "https://example.com/image.jpg"
}
```

#### Update Recipe
```http
PUT /api/recipes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Recipe Title",
  "content": "Updated content..."
}
```

#### Delete Recipe
```http
DELETE /api/recipes/:id
Authorization: Bearer <token>
```

### Comments

#### Get Comments for Recipe
```http
GET /api/comments/recipe/:recipeId
```

#### Create Comment
```http
POST /api/comments/recipe/:recipeId
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "This recipe is amazing!"
}
```

#### Update Comment
```http
PUT /api/comments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Updated comment text"
}
```

#### Delete Comment
```http
DELETE /api/comments/:id
Authorization: Bearer <token>
```

### Ratings

#### Get Ratings for Recipe
```http
GET /api/ratings/recipe/:recipeId
```

#### Create/Update Rating
```http
POST /api/ratings/recipe/:recipeId
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5
}
```

#### Delete Rating
```http
DELETE /api/ratings/:id
Authorization: Bearer <token>
```

### Health Check

```http
GET /api/health
```

## 🗂️ Project Structure

```
backend-Recipe-sharing/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   ├── recipe.controller.js  # Recipe CRUD operations
│   ├── comment.controller.js # Comment operations
│   └── rating.controller.js  # Rating operations
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   ├── security.js          # Security headers and rate limiting
│   ├── validation.js        # Request validation
│   └── errorHandler.js      # Error handling middleware
├── models/
│   ├── index.js             # Model associations
│   ├── User.model.js        # User model
│   ├── Recipe.model.js      # Recipe model
│   ├── Comment.model.js     # Comment model
│   └── Rating.model.js      # Rating model
├── routes/
│   ├── auth.routes.js       # Authentication routes
│   ├── recipe.routes.js     # Recipe routes
│   ├── comment.routes.js    # Comment routes
│   └── rating.routes.js     # Rating routes
├── seeders/
│   └── seed.js              # Database seeding script
├── utils/
│   ├── jwt.js               # JWT utilities
│   ├── password.js          # Password hashing utilities
│   └── logger.js            # Winston logger configuration
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
├── index.js                 # Application entry point
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Configurable CORS for cross-origin requests
- **Security Headers**: Helmet for HTTP security headers
- **Input Validation**: All inputs are validated before processing
- **SQL Injection Prevention**: Sequelize ORM prevents SQL injection

## 📊 Database Schema

### Users
- id (Primary Key)
- username (Unique)
- password (Hashed)
- email (Unique, Optional)
- createdAt
- updatedAt

### Recipes
- id (Primary Key)
- title
- content
- userId (Foreign Key → Users)
- imageUrl
- category
- cookingTime
- servings
- createdAt
- updatedAt

### Comments
- id (Primary Key)
- text
- recipeId (Foreign Key → Recipes)
- userId (Foreign Key → Users)
- createdAt
- updatedAt

### Ratings
- id (Primary Key)
- recipeId (Foreign Key → Recipes)
- userId (Foreign Key → Users)
- rating (1-5)
- createdAt
- updatedAt

## 🧪 Testing

To seed the database with test data:
```bash
npm run seed
```

This will create:
- 3 test users (password: `password123`)
- 5 sample recipes
- Sample comments and ratings

## 🚢 Deployment

### Environment Variables

Ensure the following environment variables are set in production:

```env
NODE_ENV=production
PORT=3001
DB_HOST=your_db_host
DB_PORT=3306
DB_NAME=recipe_sharing
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_strong_jwt_secret
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

### Production Deployment with Docker

1. Update `.env` with production values
2. Build and start:
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Manual Deployment

1. Set environment variables
2. Install dependencies: `npm install --production`
3. Start server: `npm start`

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with test data
- `npm run docker:build` - Build Docker images
- `npm run docker:up` - Start Docker containers
- `npm run docker:down` - Stop Docker containers
- `npm run docker:logs` - View Docker logs

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Gyanankur Baruah**

- GitHub: [@Gyanankur23](https://github.com/Gyanankur23)

## 🙏 Acknowledgments

- Built with Express.js and Sequelize
- Inspired by modern recipe sharing platforms
- Thanks to the open-source community
