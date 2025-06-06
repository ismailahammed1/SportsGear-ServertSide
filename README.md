
# ⚙️ SportsGear - Server Side

This is the backend for the **SportsGear** sports equipment marketplace. It provides RESTful APIs for managing users, equipment, and orders.

## 🌐 Live Server

(Add your deployed backend URL here, if available)

---

## 🚀 Features

- 🧾 **CRUD APIs** for managing sports equipment data.
- 🔐 **JWT Authentication** for protected routes.
- 📬 **User-specific equipment list** based on authenticated email.
- 🧹 **MongoDB Integration** using Mongoose for smooth data handling.
- 🛡️ **CORS and dotenv** for secure and flexible environment configuration.

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – Database
- **Firebase Admin SDK** – Authentication
- **dotenv** – Environment variable management

---

## 📁 API Endpoints

| Method | Route                    | Description                              |
|--------|--------------------------|------------------------------------------|
| GET    | `/equipment`             | Get all equipment                        |
| GET    | `/equipment/:id`         | Get single equipment by ID               |
| POST   | `/equipment`             | Add new equipment                        |
| PUT    | `/equipment/:id`         | Update equipment by ID                   |
| DELETE | `/equipment/:id`         | Delete equipment by ID                   |
| GET    | `/my-equipment/:email`   | Get equipment added by a specific user   |

---

## 📦 How to Run Locally

```bash
git clone https://github.com/ismailahammed1/SportsGear-ServertSide.git
cd SportsGear-ServertSide
npm install

