import {useState} from "react";
import products from "@/products.json";
import {initiateCheckout} from "@/lib/payments";

const defaultCart = {
    products: {}
}

export default function useCart() {

    const [cart, setCart] = useState(defaultCart);

    const cartItems = Object.keys(cart.products).map(key => {
        const product = products.find(({id}) => `${id}` === `${key}`);
        return {...cart.products[key], pricePerItem: product.price}
    })

    // console.log("cartItems", cartItems)

    const subtotal = cartItems.reduce((accumulator, {pricePerUnit, quantity}) => {
        return accumulator + (pricePerUnit * quantity)
    }, 0);

    // console.log("subtototal", subtotal);

    const quantity = cartItems.reduce((accumulator, {quantity}) => {
        return accumulator + quantity
    }, 0);

    function addToCart({id}) {
        setCart(prev => {
            let cart = {...prev};

            if (cart.products[id]) {
                cart.products[id].quantity = cart.products[id].quantity + 1;
            } else {
                cart.products[id] = {id, quantity: 1}
            }

            return cart
        })
    }

    return {cart, setCart, subtotal, quantity, addToCart}
}