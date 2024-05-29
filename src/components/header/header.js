import { useContext } from "react";
import { MdOutlineHeatPump, MdShoppingCart } from "react-icons/md";
import Link from "next/link";

import styles from "@/components/header/header.module.css";
import cartContext from "@/contexts/cart-context";

//##############################################################################

function Header() {
  const { subtotal } = useContext(cartContext);

  return (
    <nav className={styles.header}>
      <Link className={styles.brand} href="/">
        <MdOutlineHeatPump className={styles.brandLogo} />
        <span className={styles.brandName}>ASIC marketplace</span>
      </Link>
      <Link className={styles.cartLink} href="/cart">
        <MdShoppingCart className={styles.cartLogo} />
        <span className={styles.cartLabel}>${subtotal.toFixed(2)}</span>
      </Link>
    </nav>
  );
}

export default Header;
