const Order = require("../models/Order");


// CREATE ORDER
const createOrder = async (
  req,
  res
) => {

  try {

    const order =
      new Order(req.body);

    const savedOrder =
      await order.save();

    res.status(201).json(
      savedOrder
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER ORDERS
const getOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find();

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};