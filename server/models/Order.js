const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      user: {
        type: String,
        required: true,
      },

      orderItems: [
        {
          name: String,
          quantity: Number,
          price: Number,
          image: String,
        },
      ],

      totalPrice: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );

module.exports = mongoose.model(
  "Order",
  orderSchema
);