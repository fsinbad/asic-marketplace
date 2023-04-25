import Head from 'next/head'
import {FaShoppingCart} from "react-icons/fa"
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import products from '@/products.json'
import {useCartContext} from "@/hooks/use-cart";
import {initiateCheckout} from "@/lib/payments";

// const inter = Inter({ subsets: ['latin'] });


export default function Home() {
    const {subtotal, quantity, addToCart, checkout} = useCartContext();


    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                {/*<h1 className={styles.title}>*/}
                {/*    Android Marketplace*/}
                {/*</h1>*/}

                <p className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit!
                </p>

                <ul className={styles.cart}>
                    <li>
                        <strong>Items:</strong> {quantity}
                    </li>
                    <li>
                        <strong>Total:</strong> ${subtotal}
                    </li>
                    <li>
                        <button className={`${styles.button} ${styles.cartButton}`} onClick={checkout}>
                            <FaShoppingCart/>Check Out
                        </button>
                    </li>
                </ul>


                <ul className={styles.grid}>
                    {products.map(product => {
                        const {id, title, description, image, price} = product;
                        return <li key={id} className={styles.card}>
                            <a href="#">
                                <img src={image} alt={title}/>
                                <h3>{title}</h3>
                                <p>{price}</p>
                                <p>{description}</p>
                                <p>
                                    <button className={styles.button} onClick={() => {
                                        addToCart({id})
                                    }}>Buy
                                    </button>
                                </p>
                            </a>
                        </li>
                    })}


                </ul>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    )
}