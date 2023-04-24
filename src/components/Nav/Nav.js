import styles from "./Nav.module.css"
import {FaShoppingCart} from "react-icons/fa";

export default function Nav() {
    return (<nav className={styles.nav}><p className={styles.navTitle}>Android Marketplace</p>
        <p className={styles.navCart}>
            <button><FaShoppingCart/> $0.00</button>
        </p>
    </nav>)
}