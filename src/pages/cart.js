import Head from "next/head"
import {FaShoppingCart} from "react-icons/fa"
import styles from '@/styles/Cart.module.css'

import Table from "@/components/Table/Table";

import {useCartContext} from "@/hooks/use-cart";

import products from "../products.json"

const headers = [
    {
        headerId: "title",
        headerName: "Product Name"
    },
    {
        headerId: "quantity",
        headerName: "Quantity"
    },
    {
        headerId: "pricePerUnit",
        headerName: "Price Per Item"
    },
    {
        headerId: "total",
        headerName: "Item Total"
    }
]

export default function Cart() {
    const {cartItems, checkout} = useCartContext();

    console.log("cartItems", cartItems);

    const data = cartItems.map(({id, title, quantity, pricePerUnit}) => {
        // const product = products.find(({id}) => id === item.id)
        // const {title} = product || {};
        return {
            id,
            title,
            quantity,
            pricePerUnit: pricePerUnit.toFixed(2),
            total: (quantity * pricePerUnit).toFixed(2)
        }
    })

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
    )
}