import styles from "@/components/QuantityInput/QuantityInput.module.css";

export default function QuantityInput({id, quantity, updateItem}) {
    function handleOnSubmit(event) {
        event.preventDefault();

        const {currentTarget} = event;
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find(input => input.name === "quantity")?.value;

        // Alternative to messy solution above:
        console.log("quantity is:", event.currentTarget.elements.quantity?.value);

        updateItem({id: id, quantity: quantity && parseInt(quantity)});

        console.log("Submit", quantity);
    }

    return (
        <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
            <input name="quantity" type="number" min={0} defaultValue={quantity}/>
            <button className={styles.button}>Update</button>
        </form>
    );
}