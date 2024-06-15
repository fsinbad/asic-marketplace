import { useEffect, useState } from "react";
import Head from "next/head";

import ProductCard from "@/components/product-card/product-card.js";
import getDataFromApiUri from "@/lib/api-data";
import styles from "@/styles/home.module.css";

//##############################################################################

function Home() {
  const [productsArray, setProductsArray] = useState([]);

  // Retrieve products data from the database via the API URI (see src/pages/api/products.js).
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await getDataFromApiUri();
      setProductsArray(fetchedProducts);
    };

    fetchData();
  }, []);

  //############################################################################

  return (
    <div className={styles.pageContainer}>
      <Head>
        <meta
          name="google-site-verification"
          content="Yhbv7y6yCnRbJDr5k7alIAswHVaGdeUctNgmsFpG1Ao"
        />
        <meta
          name="description"
          content="ASIC Marketplace is your one-stop shop to find the perfect 
          ASIC miner and unlock your crypto mining potential."
        />
        <title>Home Page - ASIC marketplace</title>
        {/* No need for "public/images/favicon.ico". The public directory in Next.js 
        serves a specific purpose. Any file placed within this directory is 
        copied directly into the root of your build output folder (usually out). */}
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
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
          {productsArray.map((product) => {
            return (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name}
                image={product.image}
                power={product.power}
                hashrate={product.hashrate}
                price={product.price}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
