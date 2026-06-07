import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PLACE ORDER
  const placeOrder = async () => {
    // VALIDATION
    if (
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.postalCode.trim() ||
      !formData.country.trim()
    ) {
      alert("Please fill all shipping details");
      return;
    }

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const orderData = {
       user: userInfo?.name,
      email: userInfo?.email,
      orderItems: cartItems,
      totalPrice,
      shippingAddress: formData,
    };

      await axios.post(
  "http://localhost:6001/api/orders",
  orderData
);

alert("Order Placed Successfully");

localStorage.removeItem("cartItems");

window.location.href = "/orders";
      // Clear form
      setFormData({
        address: "",
        city: "",
        postalCode: "",
        country: "",
      });

    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <div className="space-y-4">

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <h2 className="text-2xl font-bold">
          Total: ${totalPrice}
        </h2>

        <button
          onClick={placeOrder}
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          Place Order
        </button>

      </div>
    </div>
  );
};

export default Checkout;