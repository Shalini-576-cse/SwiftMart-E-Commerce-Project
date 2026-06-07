import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {

      const { data } = await axios.get(
        "http://localhost:6001/api/products"
      );

      setProducts(data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {

      const { data } = await axios.get(
        "http://localhost:6001/api/orders"
      );

      setOrders(data);

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {

      await axios.delete(
        `http://localhost:6001/api/products/${id}`
      );

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* PRODUCTS */}
      <div className="mb-12">

        <h2 className="text-2xl font-bold mb-4">
          Products
        </h2>

        <div className="grid gap-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="border p-4 rounded flex justify-between items-center"
            >

              <div className="flex items-center gap-4">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 object-cover rounded"
                />

                <div>
                  <h3 className="font-bold">
                    {product.name}
                  </h3>

                  <p>${product.price}</p>
                </div>

              </div>

              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          ))}

        </div>
      </div>

      {/* ORDERS */}
      <div>

        <h2 className="text-2xl font-bold mb-4">
          Orders
        </h2>

        <div className="space-y-4">

          {orders.map((order) => (

            <div
              key={order._id}
              className="border p-4 rounded"
            >

              <h3 className="font-bold">
                Customer: {order.user}
              </h3>

              <p>
                Total: ${order.totalPrice}
              </p>

              <p>
                City: {order.shippingAddress.city}
              </p>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;