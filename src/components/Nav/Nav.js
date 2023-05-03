import styles from "./Nav.module.css"
import {FaShoppingCart} from "react-icons/fa";
import {useCartContext} from "@/hooks/use-cart";
import Link from "next/link";

export default function Nav() {

    const {subtotal, checkout} = useCartContext();

    return (
        <nav className={styles.nav}>
            <p className={styles.navTitle}>
                <Link href="/">Android Marketplace</Link>
            </p>
            <p className={styles.navCart}>
                <Link href="/cart">
                    <FaShoppingCart/> ${subtotal.toFixed(2)}
                </Link>
            </p>
        </nav>)
}