import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({
  children,
}) => {

  const [wishlistItems, setWishlistItems] =
    useState(() => {

      const savedWishlist =
        localStorage.getItem(
          "wishlistItems"
        );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    });

  useEffect(() => {

    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);


  // ADD / REMOVE
  const toggleWishlist = (product) => {

    const exists = wishlistItems.find(
      (item) => item._id === product._id
    );

    if (exists) {

      setWishlistItems(
        wishlistItems.filter(
          (item) =>
            item._id !== product._id
        )
      );

    } else {

      setWishlistItems([
        ...wishlistItems,
        product,
      ]);
    }
  };


  // CHECK EXISTS
  const isInWishlist = (id) => {

    return wishlistItems.some(
      (item) => item._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);