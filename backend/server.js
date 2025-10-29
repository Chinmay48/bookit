const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


const experienceRoutes = require("./routes/experienceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const promoRoutes = require("./routes/promoRoutes");

app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
