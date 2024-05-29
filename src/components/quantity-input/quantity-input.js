import { MdAdd, MdOutlineRemove } from "react-icons/md";

import styles from "@/components/quantity-input/quantity-input.module.css";

//##############################################################################

function QuantityInput({ _id, quantity, addToCart, removeFromCart }) {
  return (
    <div className={styles.cartQuantity}>
      <MdOutlineRemove
        className={styles.updateButton}
        onClick={() => removeFromCart({ _id: _id })}
      />
      <span>{quantity}</span>
      <MdAdd
        className={styles.updateButton}
        onClick={() => addToCart({ _id: _id })}
      />
    </div>
  );
}

export default QuantityInput;
