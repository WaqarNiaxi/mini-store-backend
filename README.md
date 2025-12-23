# Mini Store Backend API

This repository contains the **backend service** for the Mini Store project. It provides authentication, wallet management, product handling, orders, gifts, and credit transfer functionality.

The backend is built with **Node.js, TypeScript, PostgreSQL, Prisma ORM**, and **BetterAuth**, and exposes REST APIs documented via **Swagger**.

---

## Tech Stack

* **Node.js** + **TypeScript**
* **PostgreSQL**
* **Prisma ORM**
* **BetterAuth** (authentication & session management)
* **Swagger** (API documentation)
* **Express.js** (routing & middleware)

---

## Core Responsibilities

* User authentication & session handling (BetterAuth)
* Wallet initialization and balance tracking
* Product fetching & caching from third-party API
* Order and gift management
* Credit transfer between users
* Transaction history tracking

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ministore
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000
```

---

## Installation & Setup

1. **Install dependencies**

```bash
npm install
```

2. **Run database migrations**

```bash
npx prisma migrate dev
```

3. **Generate Prisma Client**

```bash
npx prisma generate
```

4. **Start the server**

```bash
npm run dev
```

---

## Project Structure

```
src/
│
├── lib/
│   └── auth.js                # BetterAuth configuration
│
├── middlewares/
│   └── auth.middleware.ts     # BetterAuth route protection middleware
|   └── error.middleware.ts     # Handle the error
│
├── modules/                   # Feature-based modules
│   ├── user/
│   ├── wallet/
│   ├── product/
│   ├── order/
│   ├── gift/
│   └── credit-transfer/
│
├── routes/
│   └── routes.ts              # Central route registration
│
├── swagger/
│   └── swagger.config.ts      # Swagger setup & configuration
│
├── prisma/
│   └── schema.prisma          # Database schema
│
├── app.ts                     # Express app setup
└── server.ts                  # Server bootstrap
```

---

## Module Architecture

Each module inside the `modules/` folder follows the same structure:

```
module-name/
│
├── module.types.ts       # TypeScript types & interfaces
├── module.routes.ts      # API routes + Swagger docs
├── module.controller.ts  # Request & response handling
└── module.services.ts    # Core business logic
```

### Responsibilities

* **Types**: Define request/response DTOs and shared types
* **Routes**: Register endpoints and Swagger documentation
* **Controller**: Validate input and control request flow
* **Services**: Handle database operations and business rules

---

## Authentication (BetterAuth)

* User registration and login handled by **BetterAuth**
* Sessions are managed securely using middleware
* On **first login**, the user wallet is automatically credited with **$1000**

Relevant files:

* `lib/auth.js`
* `middlewares/auth.middleware.ts`

---

## Wallet System

* Each user has a wallet with a balance
* Wallet balance is:

  * Credited on first login
  * Deducted on purchases
  * Increased via received credit transfers
* All wallet changes are recorded as transactions

---

## Product Management

* Products are fetched from:

```
https://dummyjson.com/products
```

* Products are **cached** to avoid unnecessary API calls
* Cached data is reused for listing and purchasing

---

## Orders & Gifts

### Orders

* Created when a user purchases a product
* Stores:

  * Product details
  * Price & quantity
  * Timestamp
  * Buyer information

### Gifts

* Users can gift products by entering recipient email
* If the recipient exists:

  * Gift is added to recipient history
  * Transaction is recorded for both sender and recipient

---

## Credit Transfer

* Users can transfer credits to other users
* Example: Send `$100` from a `$1000` wallet
* Validations:

  * Sufficient balance
  * Valid recipient
* Transfer is recorded in both users’ transaction histories

---

## API Routes

* All routes are registered in:

```
src/routes/routes.ts
```

* Each module exposes its own routes internally
* Protected routes use authentication middleware

---

## Swagger API Documentation

Swagger is configured in:

```
src/swagger/swagger.config.ts
```

Once the server is running, access API docs at:

```
{BACKEND_URL}/api-docs
```

Swagger includes:

* Authentication endpoints
* Wallet APIs
* Product APIs
* Order & gift APIs
* Credit transfer APIs

---

## Notes

* Ensure PostgreSQL is running before starting the server
* Always run Prisma migrations after schema changes
* Use environment variables for all URLs and secrets

---

## Future Improvements
 
* Background job for product cache refresh
* Rate limiting & security hardening
* Pagination for order and gift histories
* Unit & integration tests

---

## License

This project is for learning and assessment purposes.
