const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
vs 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("SwiftMart API Running...");
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));


// Port
const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});