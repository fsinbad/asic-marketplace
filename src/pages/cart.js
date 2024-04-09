import Head from "next/head";
import {FaShoppingCart} from "react-icons/fa";
import styles from "@/styles/Cart.module.css";

import Table from "@/components/Table/Table";

import {useCartContext} from "@/hooks/use-cart";

import products from "../products.json";
import QuantityInput from "@/components/QuantityInput/QuantityInput";

const headers = [
    {
        headerId: "title",
        headerName: "Product Name"
    },
    {
        headerId: "quantity",
        headerName: "QuantityInput"
    },
    {
        headerId: "pricePerUnit",
        headerName: "Price Per Item"
    },
    {
        headerId: "total",
        headerName: "Item Total"
    }
];

export default function Cart() {
    // const {cart, cartItems, checkout, updateItem} = useCartContext();
    const {cart, checkout, updateItem} = useCartContext();

    console.log("cart", cart);
    // console.log("cartItems", cartItems);

    // const data = cartItems.map(({id, title, quantity, pricePerUnit}) => {
    const data = Object.values(cart.products).map(({id, title, price, quantity}) => {
        // const product = products.find(({id}) => id === item.id)
        // const {title} = product || {};
        return {
            id,
            title,
            quantity: <QuantityInput id={id} quantity={quantity} updateItem={updateItem}/>,
            // pricePerUnit: pricePerUnit.toFixed(2),
            pricePerUnit: price.toFixed(2),
            // total: (quantity * pricePerUnit).toFixed(2)
            total: (quantity * price).toFixed(2)
        };
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>Shopping Cart - Android Marketplace</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    <FaShoppingCart/> Cart
                </h1>

                <Table className={styles.table} data={data} headers={headers}/>

                <p className={styles.checkout}>
                    <button className={styles.button} onClick={checkout}>
                        Check Out
                    </button>
                </p>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}