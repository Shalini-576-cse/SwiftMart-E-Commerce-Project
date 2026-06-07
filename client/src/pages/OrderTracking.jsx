import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderTracking = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:6001/api/orders/${id}`
        );

        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <h1 className="p-6">Loading...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Order Tracking
      </h1>

      <h2 className="text-xl mb-4">
        Tracking Number: {order.trackingNumber}
      </h2>

      <h3 className="text-lg">
        Status: {order.status}
      </h3>
    </div>
  );
};

export default OrderTracking;