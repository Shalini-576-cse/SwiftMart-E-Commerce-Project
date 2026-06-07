import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaHome,
  FaBox,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

const Navbar = () => {
  const { cartItems } = useCart();

  const { search, setSearch } =
    useSearch();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    window.location.href = "/login";
  };

  return (
    <nav className="bg-black text-white px-4 md:px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          SwiftMart
        </Link>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="px-4 py-2 rounded text-black w-64"
        />

        {/* NAV LINKS */}
        <div className="flex flex-wrap items-center gap-5">

          {/* HOME */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FaHome />
            <span>Home</span>
          </Link>

          {/* ORDERS */}
          {userInfo && (
            <Link
              to="/orders"
              className="flex items-center gap-2 hover:text-gray-300"
            >
              <FaBox />
              <span>Orders</span>
            </Link>
          )}

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FaHeart />
            <span>Wishlist</span>
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 hover:text-gray-300"
          >
            <FaShoppingCart />

            <span>Cart</span>

            {cartItems.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-xs px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* USER SECTION */}
          {userInfo ? (
            <>
              <Link
                to="/profile"
                className="font-semibold"
              >
                {userInfo.name}
              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-gray-300"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;