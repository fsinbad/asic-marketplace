import { useContext, useEffect, useState } from "react";
import { MdElectricBolt } from "react-icons/md";
import { MdOutlineMemory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
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
    <div className={styles.pageContainer}>
      <Head>
        <title>Home Page | ASIC marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainContainer}>
        <h1 className={styles.title}>
          <span>Mine</span> with Cutting-Edge ASICs and <span>Forge</span> your
          Crypto Future
        </h1>
        <p className={styles.description}>
          Shape your cryptocurrency destiny. Explore high-performance ASIC
          miners and start mining the future today.
        </p>
        <p className={styles.listTitle}>Featured Products</p>
        <ul className={styles.productsList}>
          {productsFromDB.map((product) => {
            const { _id, name, image, power, hashrate, price } = product;
            return (
              <li key={_id} className={styles.card}>
                <Link className={styles.cardLink} href={`/products/${_id}`}>
                  <img className={styles.cardImage} src={image} alt={name} />
                  <div className={styles.cardSpecs}>
                    <div>
                      <MdElectricBolt /> {power} W
                    </div>
                    <div>
                      <MdOutlineMemory /> {hashrate} TH/s
                    </div>
                  </div>
                  <h3 className={styles.cardName}>{name}</h3>
                  <div className={styles.cardPurchaseInfo}>
                    <div className={styles.cardPurchaseValue}>
                      ${price.toFixed(2)}
                    </div>
                    <div className={styles.cardPurchaseAction}>
                      <FaShoppingCart />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
