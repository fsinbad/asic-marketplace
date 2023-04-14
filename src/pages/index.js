import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import products from '@/products.json'
import {initiateCheckout} from "@/lib/payments";

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    console.log('products', products)
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

                <ul className={styles.grid}>
                    {products.map(product => {
                        const {id, title, price, description, image} = product;
                        return <li key={id} className={styles.card}>
                            <a href="#">
                                <img src={image} alt={title}/>
                                <h3>{title}</h3>
                                <p>{price}</p>
                                <p>{description}</p>
                            </a>
                            <p>
                                <button className={styles.button} onClick={() => {
                                    initiateCheckout()
                                }}>Buy Now!
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