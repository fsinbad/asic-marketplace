import { useEffect, useState } from "react";

//##############################################################################

const defaultCart = { products: {} };

// Custom hook that maintains cart state.
function useCartState() {
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

  // Calculates the total cost of all products added to the cart.
  const subtotal = Object.values(cart.products).reduce(
    (accumulator, { price, quantity }) => {
      return accumulator + price * quantity;
    },
    0
  );

  //############################################################################

  // Calculates the quantity of all items added to the cart.
  const quantity = Object.values(cart.products).reduce(
    (accumulator, { quantity }) => {
      return accumulator + quantity;
    },
    0
  );

  //############################################################################

  // Updates cart state by either adding a product to it or updating the quantity
  // of an existing product.
  function addToCart({ _id, name, image, price }) {
    setCart((prev) => {
      let cart = { ...prev };
      if (cart.products[_id]) {
        cart.products[_id].quantity = cart.products[_id].quantity + 1;
      } else {
        cart.products[_id] = { _id, name, image, price, quantity: 1 };
      }
      return cart;
    });
  }

  //############################################################################

  // Updates cart state by lowering the quantity of an existing product.
  function removeFromCart({ _id }) {
    setCart((prev) => {
      let cart = { ...prev };
      if (cart.products[_id].quantity > 1)
        cart.products[_id].quantity = cart.products[_id].quantity - 1;
      return cart;
    });
  }

  //############################################################################

  // Updates cart state by removing a product completely from the cart.
  function removeAllFromCart({ _id }) {
    setCart((prev) => {
      let cart = { ...prev };
      delete cart.products[_id];
      return cart;
    });
    console.log("test - removeFromCart()", cart);
  }

  //############################################################################

  return {
    cart,
    subtotal,
    quantity,
    addToCart,
    removeFromCart,
    removeAllFromCart,
  };
}

export default useCartState;
