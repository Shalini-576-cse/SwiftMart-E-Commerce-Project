import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <SearchProvider>

      <WishlistProvider>

        <CartProvider>

          <BrowserRouter>
          <ToastContainer />

            <App />

          </BrowserRouter>

        </CartProvider>

      </WishlistProvider>

    </SearchProvider>

  </React.StrictMode>

);