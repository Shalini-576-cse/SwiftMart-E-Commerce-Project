import { useEffect, useState } from "react";

import axios from "axios";

import ProductCard from "../components/ProductCard";

import { useSearch } from "../context/SearchContext";

const Home = () => {

  const [products, setProducts] =
    useState([]);

  const [category, setCategory] =
    useState("All");

  // SEARCH CONTEXT
  const {
    search,
    setSearch,
  } = useSearch();

  // FETCH PRODUCTS
  useEffect(() => {

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

    fetchProducts();

  }, []);

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter((product) => {

      // SEARCH FILTER
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      // CATEGORY FILTER
      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (

    <div className="p-6">

      <h1 className="text-4xl font-bold mb-6">

        SwiftMart Store

      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded w-full"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="border p-3 rounded"
        >

          <option value="All">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Shoes">
            Shoes
          </option>

        </select>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(
            (product) => (

              <ProductCard
                key={product._id}
                product={product}
              />
            )
          )

        ) : (

          <h2>
            No products found
          </h2>

        )}

      </div>

    </div>
  );
};

export default Home;