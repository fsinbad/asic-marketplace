import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
// import Image from "next/image";

import cartContext from "@/contexts/cart-context";
import getProductsFromDB from "@/lib/databaseAPIdata";
import styles from "@/styles/Home.module.css";

//##############################################################################

function Home() {
  const { addToCart } = useContext(cartContext);
  const [productsFromDB, setProductsFromDB] = useState([]);

  // Fetches products data from the database and updates productsFromDB state accordingly.
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await getProductsFromDB();
      setProductsFromDB(fetchedProducts);
    };

    fetchData();
  }, []);

  //############################################################################

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

export default Home;
