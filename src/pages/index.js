import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
// import { Inter } from 'next/font/google'

import { useCartContext } from "@/hooks/use-cart";
// import { addToCart } from "@/hooks/use-cart";
import styles from "@/styles/Home.module.css";
// import products from "@/products.json";
import getProductsFromDB from "@/lib/databaseAPIdata";
import { initiateCheckout } from "@/lib/payments";

// const inter = Inter({ subsets: ['latin'] });

//##############################################################################
// import clientPromise from "../lib/mongodb";

// export const getServerSideProps = async () => {
//   try {
//     const client = await clientPromise;
//     const db = client.db("products");
//     const products_unserialized = await db
//       .collection("products")
//       .find({})
//       .toArray();
//     const products = products_unserialized.map((product) => {
//       const { _id, ...rest } = product;
//       const id = _id.toString();
//       return { id, ...rest };
//     });
//     console.log(products);
//     return {
//       props: { products },
//     };
//   } catch (e) {
//     console.error(e);
//     return { props: { products: [] } };
//   }
// };

// // Retrieves all products data from the database via our API handler.
// async function getProductsFromDB() {
//   try {
//     console.log("index.js - FETCHING FROM THE DATABASE ...");
//     let res = await fetch("http://localhost:3000/api/products");
//     return await res.json();
//   } catch (e) {
//     console.error(e);
//   }
// }
//##############################################################################

export default function Home() {
  const [productsFromDB, setProductsFromDB] = useState([]);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await getProductsFromDB("index.js");
      setProductsFromDB(fetchedProducts);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>ASIC Trading Platform | ASIC marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/*Was not there initially, keep it?*/}
        <h1 className={styles.title}>
          {/*Your path to cryptocurrency wealth starts now!*/}
          Some Title
        </h1>

        <p className={styles.description}>
          Find the perfect ASIC hardware for your mining needs and stay ahead of
          the competition.
        </p>

        <ul className={styles.grid}>
          {productsFromDB.map((product) => {
            const { _id, title, description, image, price } = product;
            return (
              <li key={_id} className={styles.card}>
                <Link href={`/products/${_id}`}>
                  <img src={image} alt={title} />
                  <h3>{title}</h3>
                  <p>${price.toFixed(2)}</p>
                  <p>{description}</p>
                </Link>
                <p>
                  <button
                    className={styles.button}
                    onClick={() => {
                      // addToCart({_id})
                      addToCart({ _id, title, price });
                    }}
                  >
                    Buy
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
