# 🎟️ BookIt: Experiences & Slots

BookIt is a fullstack web application that enables users to explore unique travel experiences, select available slots, and complete bookings seamlessly.  
Built with **React + TypeScript + TailwindCSS** on the frontend and **Node.js + Express + MongoDB** on the backend, this project demonstrates a real-world booking flow from browsing to confirmation — including **promo code validation**, **API integration**, and **responsive design**.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React** (with TypeScript)
- **TailwindCSS** for styling
- **Axios** for API integration
- **React Router** for navigation and routing
- **Vite** for optimized bundling and fast development

### ⚙️ Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose ODM**
- **Dotenv** for environment management
- **RESTful API Architecture**

---

## 🌍 Live Demo

| Platform | URL |
|-----------|-----|
| **Frontend** | [Deployed Link (Vercel)](https://your-frontend-link.vercel.app) |
| **Backend** | [Deployed API (Render/Railway)](https://your-backend-link.onrender.com) |

---

## 🧩 Key Features

✅ **Explore Experiences**
- Fetch and display curated travel experiences dynamically from backend APIs.  
- Each experience includes title, image, description, and pricing details.

✅ **Experience Details**
- View individual experience details with available dates and time slots.  
- Users can select preferred date/time for booking.

✅ **Checkout Flow**
- Collects user information (name, email) and allows promo code application.  
- Displays dynamic pricing summary with tax and discount adjustments.

✅ **Promo Code Validation**
- Users can apply promo codes (e.g. `WELCOME10`, `FESTIVE50`).  
- Discounts are calculated in real-time and reflected on total price.

✅ **Booking Confirmation**
- Displays booking reference ID and total amount upon successful booking.  
- Handles invalid inputs, failed API calls, and unavailable slots gracefully.

✅ **Responsive UI**
- Fully responsive across mobile, tablet, and desktop.  
- Matches the provided **Figma** design with accurate spacing, typography, and layout fidelity.

---

## 🧾 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/api/experiences` | Fetch all available experiences |
| **GET** | `/api/experiences/:id` | Fetch single experience details and available slots |
| **POST** | `/api/bookings` | Create a new booking |
| **POST** | `/api/promo/validate` | Validate and apply promo code |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/bookit.git
cd bookit
```
---
### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
---
### Create a .env file inside the backend directory and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
----
### Run the Backend
```bash
npm run dev
```
---
### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### PromoCode
Use promocode 
```bash
WELCOME10,
SUMMER25,
FESTIVE50
```
---


