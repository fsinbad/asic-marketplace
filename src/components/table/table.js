import { useContext } from "react";

import styles from "@/components/table/table.module.css";
import cartContext from "@/contexts/cart-context";

//##############################################################################

function Table({ data, headers }) {
  const { removeAllFromCart } = useContext(cartContext);

  // Array (has all products) of arrays (the row data of each product).
  const rows = data.map((_, index) => {
    return headers.map(({ headerId }) => data[index][headerId]);
  });

  //############################################################################

  return (
    <table className={styles.table}>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell, index) => {
                if (index !== 4) return <td key={index}>{cell}</td>;
                else
                  return (
                    <td
                      key={index}
                      onClick={() => removeAllFromCart({ _id: cell.props._id })}
                    >
                      {cell}
                    </td>
                  );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
