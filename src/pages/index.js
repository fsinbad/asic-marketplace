import Head from "next/head";
import Link from "next/link";
import {FaShoppingCart} from "react-icons/fa";
import Image from "next/image";
// import { Inter } from 'next/font/google'
import styles from "@/styles/Home.module.css";
import products from "@/products.json";
import {useCartContext} from "@/hooks/use-cart";
import {addToCart} from "@/hooks/use-cart";
import {initiateCheckout} from "@/lib/payments";

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const {addToCart} = useCartContext();

    return (
        <div className={styles.container}>
            <Head>
                <title>ASIC Trading Platform | ASIC marketplace</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                {/*Was not there initially, keep it?*/}
                <h1 className={styles.title}>
                    {/*Your path to cryptocurrency wealth starts now!*/}
                    Some Title
                </h1>

                <p className={styles.description}>
                    Find the perfect ASIC hardware for your mining needs and stay ahead of the competition.
                </p>

                <ul className={styles.grid}>
                    {products.map(product => {
                        const {id, title, description, image, price} = product;
                        return <li key={id} className={styles.card}>
                            <Link href={`/products/${id}`}>
                                <img src={image} alt={title}/>
                                <h3>{title}</h3>
                                <p>${price.toFixed(2)}</p>
                                <p>{description}</p>
                            </Link>
                            <p>
                                <button className={styles.button} onClick={() => {
                                    // addToCart({id})
                                    addToCart({id, title, price});
                                }}>Buy
                                </button>
                            </p>
                        </li>;
                    })}
                </ul>
            </main>

            <footer className={styles.footer}>
            </footer>
        </div>
    );
}