import Head from 'next/head'
import {useState} from "react"
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import products from '@/products.json'
import {initiateCheckout} from "@/lib/payments";

// const inter = Inter({ subsets: ['latin'] });

const defaultCart = {
    products: {}
}

export default function Home() {
    // console.log('products', products)

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

    function addTocart({id}) {
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

    function checkout() {
        initiateCheckout()
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Android Marketplace
                </h1>

                <p className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit!
                </p>

                <p className={styles.description}>
                    <strong>Items:</strong> {quantity}
                    <br/>
                    <strong>Total Cost:</strong> ${subtotal}
                    <br/>
                    <button className={styles.button} onClick={checkout}>Check Out</button>
                </p>

                <ul className={styles.grid}>
                    {products.map(product => {
                        const {id, title, description, image, price} = product;
                        return <li key={id} className={styles.card}>
                            <a href="#">
                                <img src={image} alt={title}/>
                                <h3>{title}</h3>
                                <p>{price}</p>
                                <p>{description}</p>
                            </a>
                            <p>
                                <button className={styles.button} onClick={() => {
                                    addTocart({id})
                                }}>Add to Cart
                                </button>
                            </p>
                        </li>
                    })}


                </ul>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}