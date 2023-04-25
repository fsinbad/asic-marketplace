import styles from "./Nav.module.css"
import {FaShoppingCart} from "react-icons/fa";
import {useCartContext} from "@/hooks/use-cart";

export default function Nav() {

    const {subtotal, checkout} = useCartContext();

    return (<nav className={styles.nav}><p className={styles.navTitle}>Android Marketplace</p>
        <p className={styles.navCart}>
            <button onClick={checkout}><FaShoppingCart/> ${subtotal.toFixed(2)}</button>
        </p>
    </nav>)
}