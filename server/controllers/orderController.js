const Order = require("../models/Order");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {

    const {
      user,
      email,
      orderItems,
      totalPrice,
      shippingAddress,
    } = req.body;

    const order = await Order.create({
      user,
      email,
      orderItems,
      totalPrice,
      shippingAddress,
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


const cancelOrder = async (req, res) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        message:
          "Delivered orders cannot be cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  cancelOrder,
};