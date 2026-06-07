import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

const Cart = () => {

  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <h2>Your cart is empty</h2>

      ) : (

        <div className="space-y-4">

          {cartItems.map((item) => (

            <div
              key={item._id}
              className="flex justify-between items-center border p-4 rounded"
            >

              <div className="flex gap-4 items-center">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded"
                />

                <div>

                  <h2 className="font-bold">
                    {item.name}
                  </h2>

                  <p>
                    ${item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span>
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>
          ))}

          {/* TOTAL */}
          <div className="text-right mt-6">

            <h2 className="text-2xl font-bold">
              Total: ${totalPrice}
            </h2>

            <Link to="/checkout">

              <button className="bg-black text-white px-6 py-3 rounded mt-4">
                Proceed To Checkout
              </button>

            </Link>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;