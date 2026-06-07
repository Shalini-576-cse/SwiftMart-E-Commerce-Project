import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem(
      "cartItems"
    );

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);


  // ADD TO CART
  const addToCart = (product) => {

    const exists = cartItems.find(
      (item) => item._id === product._id
    );

    if (exists) {

      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          qty: 1,
        },
      ]);

    }
  };


  // INCREASE QTY
  const increaseQty = (id) => {

    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };


  // DECREASE QTY
  const decreaseQty = (id) => {

    setCartItems(
      cartItems
        .map((item) =>
          item._id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };


  // REMOVE
  const removeFromCart = (id) => {

    setCartItems(
      cartItems.filter(
        (item) => item._id !== id
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);