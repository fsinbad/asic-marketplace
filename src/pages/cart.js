import { useContext } from "react";
import { MdDeleteOutline, MdKeyboardBackspace } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

import OrderSummary from "@/components/order-summary/order-summary";
import QuantityInput from "@/components/quantity-input/quantity-input";
import Table from "@/components/table/table";
import cartContext from "@/contexts/cart-context";
import styles from "@/styles/cart.module.css";

//##############################################################################

function Cart() {
  const router = useRouter();
  const { cart, quantity, addToCart, removeFromCart } = useContext(cartContext);

  // Array of objects containing info about table headers.
  const headers = [
    {
      headerId: "image",
      headerName: "ITEM",
    },
    {
      headerId: "info",
      headerName: "",
    },
    {
      headerId: "quantity",
      headerName: "QUANTITY",
    },
    {
      headerId: "total",
      headerName: "TOTAL",
    },
    {
      headerId: "deleteIcon",
      headerName: "",
    },
  ];

  //############################################################################

  // Gather all data needed to be displayed in the cart table.
  const data = Object.values(cart.products).map(
    ({ _id, name, image, price, quantity }) => {
      return {
        _id,
        info: (
          <div className={styles.productInfo}>
            <Link className={styles.productLink} href={"/products/" + _id}>
              <p className={styles.productName}>{name}</p>
            </Link>
            <p className={styles.productPrice}>{"$" + price.toFixed(2)}</p>
          </div>
        ),
        image: (
          <Link className={styles.productLink} href={"/products/" + _id}>
            <img className={styles.productImage} src={image} alt={name} />
          </Link>
        ),
        quantity: (
          <QuantityInput
            _id={_id}
            quantity={quantity}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ),
        total: "$" + (quantity * price).toFixed(2),
        deleteIcon: <MdDeleteOutline className={styles.deleteIcon} _id={_id} />,
      };
    }
  );

  // Navigate back to the previous page in the browser history.
  function goBack() {
    router.back();
  }

  //############################################################################

  return (
    <div className={styles.pageContainer}>
      <Head>
        <meta
          name="description"
          content="ASIC Marketplace is your one-stop shop to find the perfect 
          ASIC miner and unlock your crypto mining potential."
        />
        <title>Shopping Cart - ASIC marketplace</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>

      <main className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <button className={styles.goBackButton} onClick={goBack}>
            <MdKeyboardBackspace className={styles.goBackButtonIcon} />
          </button>
          <h1 className={styles.title}>Shopping Cart</h1>
          <p className={styles.quantity}>({quantity} items)</p>
        </div>

        <div className={styles.cartTableContainer}>
          <Table data={data} headers={headers} />
          {quantity > 0 ? <OrderSummary /> : <> </>}
        </div>
      </main>
    </div>
  );
}

export default Cart;
