import { Link } from "react-router-dom";

import { FaHeart } from "react-icons/fa";

import { useWishlist } from "../context/WishlistContext";

import { toast } from "react-toastify";

const ProductCard = ({ product }) => {

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  return (
    <div className="border rounded-lg p-4 shadow-md relative">

      {/* HEART */}
      <button
        onClick={() =>
          toggleWishlist(product)
        }
        className="absolute top-4 right-4"
      >

        <FaHeart
          className={
            isInWishlist(product._id)
              ? "text-red-500"
              : "text-gray-400"
          }
          size={24}
        />

      </button>

      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-3">
        {product.name}
      </h2>

      <p className="text-gray-600 mt-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-4">

        <span className="font-bold text-lg">
          ${product.price}
        </span>

        <Link to={`/product/${product._id}`}>

          <button className="bg-black text-white px-4 py-2 rounded">
            View Details
          </button>

        </Link>

      </div>
    </div>
  );
};

export default ProductCard;