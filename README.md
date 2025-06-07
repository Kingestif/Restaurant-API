# 🍽️ Restaurant API

A RESTful API for managing a restaurant system — complete with authentication, menu management, order placement, and table bookings. Built with **Express.js** and documented using **Swagger**.

---

## Live Demo

- 🌐 API Base URL: [https://restaurant-api-27es.onrender.com](https://restaurant-api-27es.onrender.com)
- 📘 Swagger Docs: [https://restaurant-api-27es.onrender.com/api-docs](https://restaurant-api-27es.onrender.com/api-docs)

---

## Tech Stack

- **Backend Framework**: Express.js
- **Authentication**: JWT-based auth
- **Database**: MongoDB + Mongoose
- **Documentation**: Swagger (OpenAPI)
- **Deployment**: Render

---

## User Roles

| Role           | Capabilities |
|----------------|--------------|
| **Customer**   | Browse menu, place orders, book tables, view own bookings |
| **Hotel Manager** | Manage menu items, view all bookings |
| **Admin**      | Manage all users, view system analytics |

---

## Authentication & Authorization

- All routes are protected using JWT tokens.
- Role-based access control is enforced for sensitive operations.
- Use the `/auth/signup` and `/auth/login` routes to create and authenticate users.

---

## API Features

### Authentication

- `POST /auth/signup` – Register a new user  
- `POST /auth/login` – Log in and receive a JWT  
- `PATCH /users/:id` – Update user role (Admin only)  
- `DELETE /users/:id` – Delete a user (Admin only)

### Menu Management (Hotel Manager)

- `GET /menu` – List all menu items  
- `POST /menu` – Add new menu item  
- `PATCH /menu/:id` – Edit menu item  
- `DELETE /menu/:id` – Remove menu item

### Order Management (Customer)

- `POST /orders` – Place a new order  
- `GET /orders/me` – View your own orders  
- `GET /orders` – View all orders (Manager/Admin)

### Table Booking (Customer)

- `POST /bookings` – Book a table  
- `GET /bookings/me` – View your bookings  
- `GET /bookings` – View all bookings (Manager/Admin)

---

## API Documentation

- The full API is documented using Swagger.
- Visit: 👉 [https://restaurant-api-27es.onrender.com/api-docs](https://restaurant-api-27es.onrender.com/api-docs)

---

## Getting Started Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/restaurant-api.git
cd restaurant-api

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
# Add your MongoDB URI, JWT secret, and other configs in the .env

# 4. Start the development server
npm run dev,
```


## Author
- Built by Estifanos Zinabu