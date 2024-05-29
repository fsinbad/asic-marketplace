import { useContext } from "react";
import Link from "next/link";

import cartContext from "@/contexts/cart-context";
import styles from "@/components/order-summary/order-summary.module.css";

//##############################################################################

function OrderSummary() {
  const { subtotal, taxCost, grandTotal } = useContext(cartContext);

  return (
    <div className={styles.orderSummaryContainer}>
      <h2 className={styles.orderSummaryTitle}>Order Summary</h2>
      <div className={styles.orderSummaryGrid}>
        <div className={styles.orderSummaryLabel}>Subtotal</div>
        <div className={styles.orderSummaryValue}>${subtotal.toFixed(2)}</div>
        <div className={styles.orderSummaryLabel}>Tax (15%)</div>
        <div className={styles.orderSummaryValue}>${taxCost.toFixed(2)}</div>
        <div className={styles.orderSummaryLabel}>Shipping</div>
        <div className={styles.orderSummaryValue}>free</div>
      </div>
      <div className={styles.totalPrice}>
        <div className={styles.orderSummaryLabel}>Total</div>
        <div className={styles.orderSummaryValue}>${grandTotal.toFixed(2)}</div>
      </div>
      <button className={styles.checkoutButton}>Check Out</button>
      <Link className={styles.homeLink} href="/">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSummary;
