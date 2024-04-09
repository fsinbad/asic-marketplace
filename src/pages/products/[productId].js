import Head from "next/head";
import styles from "@/styles/Product.module.css";
import products from "@/products.json";
import {useCartContext} from "@/hooks/use-cart";

// Step 1
// Loops through products to create static paths.
export async function getStaticPaths() {
    const paths = products.map((product) => {
        const {id} = product;
        return {params: {productId: id}};
    });
    return {
        paths,
        fallback: false
    };
}

// Step 2
// Returns product data using specific product ID found in path.
// Gets params object from getStaticPaths().
export async function getStaticProps({params}) {
    // Just like getStaticPaths(), getStaticProps() runs inside Node so following will appear in terminal not in browser.
    console.log("params", params);

    const product = products.find(({id}) => `${id}` === `${params.productId}`);
    return {
        props: {
            product
        }
    };
}

// Step 3
// Fills static page with dynamic product data.
// Gets product object from getStaticProps().
/*
TODO:
    FUNCTION RUNS TWICE WHEN LOADING PAGE (EXCEPTION WHEN CLICKING PRODUCT LINK IN HOME PAGE).
    MAYBE THE REASON IS IN https://nextjs.org/docs/basic-features/pages#pre-rendering?
*/
export default function Product({product}) {
    console.log("product", product);

    const {id, title, description, image, price} = product;
    const {addToCart} = useCartContext();

    return (<div className={styles.container}>
        <Head>
            <title>{title} - ASIC Marketplace</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
            <div className={styles.productLeftSide}>
                <img src={image} alt={title}/>
            </div>
            <div className={styles.productRightSide}>
                <h1 className={styles.productTitle}>{title}</h1>
                <p className={styles.productDescription}>{description}</p>
                <p className={styles.productPrice}>${price.toFixed(2)}</p>
                <p>
                    {/*<button className={styles.button} onClick={() => addToCart({id})}>*/}
                    <button className={styles.button} onClick={() => addToCart({id, title, price})}>
                        Buy
                    </button>
                </p>
            </div>
        </main>

        <footer className={styles.footer}>
        </footer>
    </div>);
}