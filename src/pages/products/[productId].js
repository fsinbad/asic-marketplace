import { useContext } from "react";
import {
  MdElectricBolt,
  MdHearing,
  MdMonitorWeight,
  MdOutlineMemory,
} from "react-icons/md";
import Head from "next/head";
import Link from "next/link";

import cartContext from "@/contexts/cart-context";
import getDataFromApiUri from "@/lib/api-data";
import styles from "@/styles/product.module.css";

//##############################################################################

let productsArray = [];

// Step 1
// Loop through products to create static paths for each of them.
export async function getStaticPaths() {
  // if (!productsArray)
  productsArray = await getDataFromApiUri();
  const paths = productsArray.map((product) => {
    const { _id } = product;
    return { params: { productId: _id } };
  });
  return {
    paths,
    fallback: false,
  };
}

// Step 2
// Return product data using specific product ID found in path.
// Note - "params" object comes from getStaticPaths().
// Note - "getStaticProps always runs on the server and never on the client."
export async function getStaticProps({ params }) {
  // if (!productsArray)
  productsArray = await getDataFromApiUri();
  const product = productsArray.find(
    ({ _id }) => `${_id}` === `${params.productId}`
  );
  // getStaticProps() runs inside Node so following will appear in terminal not in browser.
  console.log("product is", product._id);
  return {
    props: {
      product,
    },
  };
}

//##############################################################################

// Step 3
// Fill product page with specific data from getStaticProps().
// Note - "product" object comes from getStaticProps().
function Product({ product }) {
  const {
    _id,
    name,
    description,
    image,
    power,
    hashrate,
    noise,
    weight,
    price,
  } = product;
  const { addToCart } = useContext(cartContext);

  return (
    <div className={styles.pageContainer}>
      <Head>
        <meta
          name="description"
          content="ASIC Marketplace is your one-stop shop to find the perfect 
          ASIC miner and unlock your crypto mining potential."
        />
        <title>{`${name} - ASIC Marketplace`}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>

      <main className={styles.mainContainer}>
        <div className={styles.productLeftSide}>
          <img className={styles.productImage} src={image} alt={name} />
        </div>
        <div className={styles.productRightSide}>
          <h1 className={styles.productName}>{name}</h1>
          <div className={styles.productDescription}>{description}</div>
          <div className={styles.productSpecsContainer}>
            <div className={styles.productSpec}>
              <p className={styles.productSpecLabel}>Power</p>
              <p className={styles.productSpecValue}>
                <MdElectricBolt /> {power} W
              </p>
            </div>
            <div className={styles.productSpec}>
              <p className={styles.productSpecLabel}>Hashrate</p>
              <p className={styles.productSpecValue}>
                <MdOutlineMemory /> {hashrate} TH/s
              </p>
            </div>
            <div className={styles.productSpec}>
              <p className={styles.productSpecLabel}>Noise</p>
              <p className={styles.productSpecValue}>
                <MdHearing /> {noise} db
              </p>
            </div>
            <div className={styles.productSpec}>
              <p className={styles.productSpecLabel}>Weight</p>
              <p className={styles.productSpecValue}>
                <MdMonitorWeight /> {weight} g
              </p>
            </div>
          </div>
          <p className={styles.productPrice}>${price.toFixed(2)}</p>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.purchaseButton}
              onClick={() => addToCart({ _id, name, image, price })}
            >
              Add to Cart
            </button>
            <Link className={styles.cartLink} href={`/cart`}>
              Go To Cart
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Product;
