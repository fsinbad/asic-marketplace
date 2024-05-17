import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

import styles from "@/components/Header/Header.module.css";
import cartContext from "@/contexts/cart-context";

//##############################################################################

function Header() {
  const { subtotal } = useContext(cartContext);

  return (
    <nav className={styles.header}>
      <p className={styles.headerTitle}>
        <Link href="/">ASIC marketplace</Link>
      </p>
      <p className={styles.navCart}>
        <Link href="/cart">
          <FaShoppingCart /> ${subtotal.toFixed(2)}
        </Link>
      </p>
    </nav>
  );
}

export default Header;
