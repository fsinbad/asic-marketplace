import { useContext } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Table from "@/components/Table/Table";
import QuantityInput from "@/components/QuantityInput/QuantityInput";
import cartContext from "@/contexts/cart-context";
import styles from "@/styles/Cart.module.css";

//##############################################################################

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
  // {
  //   headerId: "pricePerUnit",
  //   headerName: "PRICE",
  // },
  {
    headerId: "total",
    headerName: "TOTAL",
  },
  {
    headerId: "deleteIcon",
    headerName: "",
  },
];

//##############################################################################

function Cart() {
  const router = useRouter();
  const { cart, subtotal, quantity, addToCart, removeFromCart } =
    useContext(cartContext);

  // Gathers all data needed to be displayed in the cart table.
  const data = Object.values(cart.products).map(
    ({ _id, title, image, price, quantity }) => {
      return {
        _id,
        info: (
          <div className={styles.productInfo}>
            <Link className={styles.productLink} href={"/products/" + _id}>
              <p className={styles.productName}>{title}</p>
            </Link>
            <p className={styles.productPrice}>{"$" + price.toFixed(2)}</p>
          </div>
        ),
        image: (
          <Link className={styles.productLink} href={"/products/" + _id}>
            <img className={styles.productImage} src={image} alt={title} />
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
        // pricePerUnit: "$" + price.toFixed(2),
        total: "$" + (quantity * price).toFixed(2),
        deleteIcon: (
          <MdDeleteOutline
            className={styles.deleteIcon}
            _id={_id}
            // onClick={() => removeAllFromCart({ _id: _id })}
          />
        ),
      };
    }
  );

  const goBack = () => {
    router.back(); // This navigates back to the previous page in the browser history
  };

  let tax = (0.15 * subtotal).toFixed(2);
  let finalTotalPrice = (1.15 * subtotal).toFixed(2);

  //############################################################################

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Shopping Cart - ASIC marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={styles.mainContainer}
        // style={{ flexDirection: quantity > 0 ? "row" : "column" }}
      >
        <div className={styles.titleContainer}>
          <button className={styles.goBackButton} onClick={goBack}>
            <MdKeyboardBackspace className={styles.goBackButtonIcon} />
          </button>
          <h1 className={styles.title}>Shopping Cart</h1>
          <p className={styles.quantity}>({quantity} items)</p>
        </div>

        <div className={styles.cartTableContainer}>
          <Table data={data} headers={headers} />
          {quantity > 0 ? (
            <div className={styles.orderSummaryContainer}>
              <h2 className={styles.orderSummaryTitle}>Order Summary</h2>
              <div className={styles.orderSummaryGrid}>
                <div className={styles.orderSummaryLabel}>Subtotal</div>
                <div className={styles.orderSummaryValue}>${subtotal}</div>
                <div className={styles.orderSummaryLabel}>Tax (15%)</div>
                <div className={styles.orderSummaryValue}>${tax}</div>
                <div className={styles.orderSummaryLabel}>Shipping</div>
                <div className={styles.orderSummaryValue}>free</div>
              </div>
              <div className={styles.totalPrice}>
                <div className={styles.orderSummaryLabel}>Total</div>
                <div className={styles.orderSummaryValue}>
                  ${finalTotalPrice}
                </div>
              </div>
              <button className={styles.checkoutButton}>Check Out</button>
              <Link className={styles.homeLink} href="/">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <> </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Cart;
