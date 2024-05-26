import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineHeatPump } from "react-icons/md";
import Link from "next/link";

import styles from "@/components/Header/Header.module.css";
import cartContext from "@/contexts/cart-context";

//##############################################################################

function Header() {
  const { subtotal } = useContext(cartContext);

  return (
    <nav className={styles.header}>
      <Link className={styles.brand} href="/">
        <MdOutlineHeatPump className={styles.brandLogo} />
        <p className={styles.brandName}>ASIC marketplace</p>
      </Link>
      {/* <p className={styles.headerTitle}>
        <Link href="/">ASIC marketplace</Link>
      </p> */}
      <Link className={styles.cartLink} href="/cart">
        <FaShoppingCart className={styles.cartLogo} />
        <p className={styles.cartLabel}>${subtotal.toFixed(2)}</p>
      </Link>
    </nav>
  );
}

export default Header;
