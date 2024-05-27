import { useContext } from "react";
import { MdElectricBolt } from "react-icons/md";
import { MdOutlineMemory } from "react-icons/md";
import { MdHearing } from "react-icons/md";
import { MdMonitorWeight } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";

import QuantityInput from "@/components/QuantityInput/QuantityInput";
import cartContext from "@/contexts/cart-context";
import getProductsFromDB from "@/lib/databaseAPIdata";
import styles from "@/styles/Product.module.css";

//##############################################################################

let productsFromDB = [];

/*
TODO:
getProductsFromDB is used twice and that means 2 database calls each time we browse a product page - That is too much.
The if (!productsFromDB) part was tried but it breaks things as "product" becomes undefined!
So I commented it. Must find a solution though.
*/

// Step 1
// Loops through products to create static paths.
export async function getStaticPaths() {
  // if (!productsFromDB)
  productsFromDB = await getProductsFromDB();
  const paths = productsFromDB.map((product) => {
    const { _id } = product;
    return { params: { productId: _id } };
  });
  return {
    paths,
    fallback: false,
  };
}

// Step 2
// "getStaticProps always runs on the server and never on the client."
// Returns product data using specific product ID found in path.
// Gets params object from getStaticPaths().
export async function getStaticProps({ params }) {
  // if (!productsFromDB)
  productsFromDB = await getProductsFromDB();
  // Just like getStaticPaths(), getStaticProps() runs inside Node so following will appear in terminal not in browser.
  const product = productsFromDB.find(
    ({ _id }) => `${_id}` === `${params.productId}`
  );
  console.log("product is", product._id);
  return {
    props: {
      product,
    },
  };
}

//##############################################################################

/*
TODO:
FUNCTION RUNS TWICE WHEN LOADING PAGE (EXCEPTION WHEN CLICKING PRODUCT LINK IN HOME PAGE).
MAYBE THE REASON IS IN https://nextjs.org/docs/basic-features/pages#pre-rendering?
*/
// Step 3
// Fills static page with dynamic product data.
// Gets product object from getStaticProps().
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
        <title>{`${name} - ASIC Marketplace`}</title>
        <link rel="icon" href="/favicon.ico" />
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
