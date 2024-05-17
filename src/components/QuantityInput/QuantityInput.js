import styles from "@/components/QuantityInput/QuantityInput.module.css";

//##############################################################################

function QuantityInput({ _id, quantity, updateItem }) {
  function handleOnSubmit(event) {
    event.preventDefault();
    // const { currentTarget } = event;
    // const inputs = Array.from(currentTarget.elements);
    // const quantity = inputs.find((input) => input.name === "quantity")?.value;
    // Alternative to messy solution above:
    const quantity = event.currentTarget.elements.quantity?.value;
    updateItem({ _id: _id, quantity: quantity && parseInt(quantity) });
    // Check if necessary to have ?.value and && parseInt(quantity)
  }

  //############################################################################

  return (
    <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
      <input name="quantity" type="number" min={0} defaultValue={quantity} />
      {/* <button className={styles.button}>Update</button> */}
      <button>Update</button>
    </form>
  );
}

export default QuantityInput;
