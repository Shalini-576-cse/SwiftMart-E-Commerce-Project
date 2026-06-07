import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";

const ProductDetails = () => {

  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const { data } = await axios.get(
          `http://localhost:6001/api/products/${id}`
        );

        setProduct(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();

  }, [id]);

  if (!product) {
    return <h2 className="p-6">Loading...</h2>;
  }

  return (
    <div className="p-6">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg shadow-lg"
        />

        <div>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {product.description}
          </p>

          <h2 className="text-3xl font-bold mb-6">
            ${product.price}
          </h2>

          <p className="mb-4">
            Category: {product.category}
          </p>

          <p className="mb-6">
            Stock: {product.stock}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-8 py-3 rounded"
          >
            Add To Cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;