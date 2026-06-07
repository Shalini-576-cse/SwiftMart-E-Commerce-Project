import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const { data } = await axios.get(
          "http://localhost:6001/api/orders"
        );

        setOrders(data);
        
        setOrders(userOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("SwiftMart Invoice", 20, 20);

    doc.setFontSize(14);
    doc.text(`Customer: ${order.user}`, 20, 40);
    doc.text(`Email: ${order.email}`, 20, 50);
    doc.text(`Tracking: ${order.trackingNumber}`, 20, 60);
    doc.text(`Status: ${order.status}`, 20, 70);
    doc.text(`Total: $${order.totalPrice}`, 20, 80);

    doc.text("Products:", 20, 100);

    let y = 110;

    order.orderItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} | Qty: ${
          item.qty
        } | Price: $${item.price}`,
        20,
        y
      );

      y += 10;
    });

    doc.save(`invoice-${order._id}.pdf`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-6 rounded mb-6 shadow"
          >
            <h2 className="font-bold text-xl mb-2">
              Ordered By: {order.user}
            </h2>

            <p className="mb-2">
              Tracking Number:
              <span className="font-bold ml-2">
                {order.trackingNumber}
              </span>
            </p>

            <p className="mb-2">
              Total: ${order.totalPrice}
            </p>

            <p className="mb-4 text-blue-600 font-semibold">
              Status: {order.status}
            </p>

            <button
              onClick={() =>
                downloadInvoice(order)
              }
              className="bg-black text-white px-4 py-2 rounded mb-4"
            >
              Download Invoice
            </button>

            {order.orderItems.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p>
                      Qty: {item.qty}
                    </p>

                    <p>
                      ${item.price}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        ))
      ) : (
        <h2 className="text-gray-500">
          No Orders Found
        </h2>
      )}
    </div>
  );
};

export default Orders;