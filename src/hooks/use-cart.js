import { createContext, useContext, useEffect, useState } from "react";

// import products from "@/products.json";
import { initiateCheckout } from "@/lib/payments";

//##############################################################################

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

// Custom hook that maintains cart state.
export function useCartState() {
  const [cart, setCart] = useState(defaultCart);

  //############################################################################

  // Gets cart data from localStorage each time the page is loaded.
  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem(
      "asic_marketplace_cart"
    );
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      setCart(data);
    }
  }, []);

  //############################################################################

  // Stores cart data in localStorage each time the cart state is updated.
  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("asic_marketplace_cart", data);
  }, [cart]);

  //############################################################################

  //   const cartItems = Object.keys(cart.products).map((key) => {
  //     const product = products.find(({ id }) => `${id}` === `${key}`);
  //     return {
  //       ...cart.products[key],
  //       pricePerUnit: product["price"],
  //       title: product["title"],
  //     };
  //   });

  //############################################################################

  // const subtotal = cartItems.reduce((accumulator, {pricePerUnit, quantity}) => {
  const subtotal = Object.values(cart.products).reduce(
    (accumulator, { price, quantity }) => {
      return accumulator + price * quantity;
    },
    0
  );

  //############################################################################

  // const quantity = cartItems.reduce((accumulator, {quantity}) => {
  const quantity = Object.values(cart.products).reduce(
    (accumulator, { quantity }) => {
      return accumulator + quantity;
    },
    0
  );

  //############################################################################

  // function addToCart({id}) {
  function addToCart({ id, title, price }) {
    setCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        // cart.products[id] = {id, title, price, quantity: 1}
        cart.products[id] = { id, title, price, quantity: 1 };
      }

      return cart;
    });
    console.log("test - addToCart()", cart);
  }

  //############################################################################

  function updateItem({ id, quantity }) {
    setCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity = quantity;
      } else {
        cart.products[id] = { id, quantity: 1 }; // update?
      }

      return cart;
    });
    console.log("test - updateItem()", cart);
  }

  //############################################################################

  function checkout() {
    initiateCheckout();
  }

  //############################################################################

  // return {cart, cartItems, subtotal, quantity, addToCart, updateItem, checkout}
  return { cart, subtotal, quantity, addToCart, updateItem, checkout };
}

//##############################################################################

// Custom hook that provides access to cart context to ease transfer of cart state data throughout the app.
export function useCartContext() {
  return useContext(CartContext);
}
