import {
  MdElectricBolt,
  MdOutlineMemory,
  MdShoppingCart,
} from "react-icons/md";
import Link from "next/link";

import styles from "@/components/product-card/product-card.module.css";

//##############################################################################

function ProductCard({ _id, name, image, power, hashrate, price }) {
  return (
    <li key={_id} className={styles.card}>
      <Link className={styles.cardLink} href={`/products/${_id}`}>
        <img className={styles.cardImage} src={image} alt={name} />
        <div className={styles.cardSpecs}>
          <div>
            <MdElectricBolt /> {power} W
          </div>
          <div>
            <MdOutlineMemory /> {hashrate} TH/s
          </div>
        </div>
        <h3 className={styles.cardName}>{name}</h3>
        <div className={styles.cardPurchaseInfo}>
          <div className={styles.cardPurchaseValue}>${price.toFixed(2)}</div>
          <div className={styles.cardPurchaseAction}>
            <MdShoppingCart />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductCard;
