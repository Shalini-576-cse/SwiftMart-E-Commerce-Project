import { useWishlist } from "../context/WishlistContext";

import ProductCard from "../components/ProductCard";

const Wishlist = () => {

  const { wishlistItems } =
    useWishlist();

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Wishlist
      </h1>

      {wishlistItems.length === 0 ? (

        <h2>No wishlist items</h2>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {wishlistItems.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;