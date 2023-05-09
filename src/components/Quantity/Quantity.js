import styles from "@/components/Quantity/Quantity.module.css"

export default function Quantity({id, quantity, updateItem}) {
    function handleOnSubmit(e) {
        e.preventDefault();

        const {currentTarget} = e;
        const inputs = Array.from(currentTarget.elements)
        const quantity = inputs.find(input => input.name === "quantity")?.value

        updateItem({id: id, quantity: quantity && parseInt(quantity)})

        console.log("Submit", quantity)
    }

    return (
        <form className={styles.cartQuantity} onSubmit={handleOnSubmit}>
            <input name="quantity" type="number" min={0} defaultValue={quantity}/>
            <button className={styles.button}>Update</button>
        </form>
    )
}