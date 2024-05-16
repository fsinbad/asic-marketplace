import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

import { useCartContext } from "@/hooks/use-cart";
import styles from "@/components/Header/Header.module.css";

//##############################################################################

function Header() {
  const { subtotal } = useCartContext();

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
