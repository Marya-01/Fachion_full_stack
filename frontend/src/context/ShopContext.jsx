import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_free = 10; // Changed variable name for consistency
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, color, size) => {
    if (!color || !size) {
      toast.error("Please select both size and color.");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][color][size]) {
        cartData[itemId][color][size] += 1;
      } else {
        cartData[itemId][color][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][color] = {};
      cartData[itemId][color][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, color, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const color in cartItems[itemId]) {
        for (const size in cartItems[itemId][color]) {
          try {
            if (cartItems[itemId][color][size] > 0) {
              totalCount += cartItems[itemId][color][size];
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, color, size, quantity) => {
    let cartData = structuredClone(cartItems);

    // Check if the item exists before updating the quantity
    if (
      cartData[itemId] &&
      cartData[itemId][color] &&
      cartData[itemId][color][size]
    ) {
      cartData[itemId][color][size] = quantity;
      setCartItems(cartData); // Use cartData, not updatedCartItems

      if (token) {
        try {
          await axios.post(
            backendUrl + "/api/cart/update",
            { itemId, color, size, quantity },
            { headers: { token } }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    } else {
      toast.error("Item not found in the cart.");
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue; // Skip if itemInfo is not found

      for (const color in cartItems[itemId]) {
        for (const size in cartItems[itemId][color]) {
          const quantity = cartItems[itemId][color][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        }
      }
    }

    return totalAmount;
  };
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_free,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
