# Palacinkica – Pancake Shop Ordering System

A full-stack web application for a pancake shop. Customers order sweet, savoury or plain pancakes with selectable toppings, and staff manage incoming orders and topping stock.

Built with **Spring Boot**, **Angular** and **MySQL**.

## Features

### Customers
- Register a new account or log in
- Choose a pancake type: savoury, sweet or plain
- Pick toppings from the ones currently in stock (separate lists for sweet and savoury)
- Optionally order a savoury pancake breaded
- Place an order, which is created with the status `nova` (new)

### Staff
- See all orders in a table: customer, pancake type, toppings, breaded or not, status
- Accept or reject new orders (new orders are highlighted in yellow)
- Manage toppings: add, delete, mark as out of stock, restock
- Register new staff accounts

### General
- Login with a role selector (customer or staff) and validation messages
- Passwords hashed with BCrypt
- Angular route guards that restrict pages by role
- Logout available on every page

## Tech stack

| Layer    | Technology                                   |
|----------|----------------------------------------------|
| Backend  | Java 21, Spring Boot 4, JDBC (prepared statements) |
| Frontend | Angular, TypeScript, CSS                     |
| Database | MySQL                                        |

## Getting started

### Prerequisites
- Java 21
- Node.js and npm
- MySQL 8

### 1. Database

Import the SQL script. It creates the `palacinkarnica2026` schema with the `korisnici`, `narudzbine` and `dodaci` tables:

```bash
mysql -u root -p < baza.sql
```

The database connection settings are in `backend/demo/src/main/java/com/example/demo/db.java`. Change the username and password there to match your MySQL installation.

### 2. Backend

```bash
cd backend/demo
./mvnw spring-boot:run
```

On Windows use `mvnw.cmd spring-boot:run`. The API starts on `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

The application is available at `http://localhost:4200`.

### Test accounts


| Role     | Username | Password |
|----------|----------|----------|
| Customer | `joka`    | `Joka123`    |
| Staff    | `kaja`    | `Kaja123`    |

## API overview

| Method | Endpoint         | Description                          |
|--------|------------------|--------------------------------------|
| POST   | `/login`         | Log in as a customer or staff member |
| POST   | `/register`      | Register a new customer              |
| GET    | `/getNarudzbine` | List all orders                      |
| POST   | `/naruci`        | Place a new order                    |
| POST   | `/prihvati`      | Accept an order                      |
| POST   | `/odbij`         | Reject an order                      |
| GET    | `/sslane`        | List savoury toppings                |
| GET    | `/sslatke`       | List sweet toppings                  |
| POST   | `/dodajdodatak`  | Add a new topping                    |
| POST   | `/obrisi`        | Delete a topping                     |
| POST   | `/nestasica`     | Mark a topping as out of stock       |
| POST   | `/dopuna`        | Mark a topping as back in stock      |

## Possible upgrades

- Adding Stripe/PayPal billing and delivery to certain address
- Adding `admin` role for managing accounts and making statistics
- Sending an email to customer with its order

## Additional Information
The app is built in Serbian, so the UI and names of variables and methods are in Serbian

CSS was made using AI

If you have any questions, reach out to me at m.gligoric26@gmail.com
