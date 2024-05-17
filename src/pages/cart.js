import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Head from "next/head";

import Table from "@/components/Table/Table";
import QuantityInput from "@/components/QuantityInput/QuantityInput";
import cartContext from "@/contexts/cart-context";
import styles from "@/styles/Cart.module.css";

//##############################################################################

const headers = [
  {
    headerId: "title",
    headerName: "Product Name",
  },
  {
    headerId: "quantity",
    headerName: "QuantityInput",
  },
  {
    headerId: "pricePerUnit",
    headerName: "Price Per Item",
  },
  {
    headerId: "total",
    headerName: "Item Total",
  },
];

//##############################################################################

function Cart() {
  const { cart, updateItem } = useContext(cartContext);

  // Gathers all data needed to be displayed in the cart table.
  const data = Object.values(cart.products).map(
    ({ _id, title, price, quantity }) => {
      return {
        _id,
        title,
        quantity: (
          <QuantityInput
            _id={_id}
            quantity={quantity}
            updateItem={updateItem}
          />
        ),
        pricePerUnit: price.toFixed(2),
        total: (quantity * price).toFixed(2),
      };
    }
  );

  //############################################################################

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - ASIC marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} headers={headers} />

        <p className={styles.checkout}>
          <button className={styles.button}>Check Out</button>
        </p>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default Cart;
