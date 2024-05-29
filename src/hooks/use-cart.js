import { useEffect, useState } from "react";

//##############################################################################

const defaultCart = { products: {} };

// Custom hook that maintains the cart state.
function useCartState() {
  const [cart, setCart] = useState(defaultCart);
  const taxPercentage = 15;

  //############################################################################

  // Retrieve cart data from localStorage each time the page is loaded.
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

  // Store cart data in localStorage each time the cart state is updated.
  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("asic_marketplace_cart", data);
  }, [cart]);

  //############################################################################

  // Calculate quantity of all items added to the cart.
  const quantity = Object.values(cart.products).reduce(
    (accumulator, { quantity }) => {
      return accumulator + quantity;
    },
    0
  );

  //############################################################################

  // Calculate total cost of all products added to the cart (prior taxes).
  const subtotal = Object.values(cart.products).reduce(
    (accumulator, { price, quantity }) => {
      return accumulator + price * quantity;
    },
    0
  );

  //############################################################################

  // Calculate total tax value to be added to subtotal.
  const taxCost = (taxPercentage / 100) * subtotal;

  //############################################################################

  // Calculate total cost of all products added to the cart (after taxes).
  const grandTotal = subtotal + taxCost;

  //############################################################################

  // Update cart state by either increasing the quantity of an existing product
  // in the cart or adding a new product to it.
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

  // Update cart state by decreasing the quantity of an existing product in the cart.
  function removeFromCart({ _id }) {
    setCart((prev) => {
      let cart = { ...prev };
      if (cart.products[_id].quantity > 1)
        cart.products[_id].quantity = cart.products[_id].quantity - 1;
      return cart;
    });
  }

  //############################################################################

  // Update cart state by completely removing a product from the cart.
  function removeAllFromCart({ _id }) {
    setCart((prev) => {
      let cart = { ...prev };
      delete cart.products[_id];
      return cart;
    });
  }

  //############################################################################

  return {
    cart,
    quantity,
    subtotal,
    taxCost,
    grandTotal,
    addToCart,
    removeFromCart,
    removeAllFromCart,
  };
}

export default useCartState;
