import { useContext } from "react";

import cartContext from "@/contexts/cart-context";
import styles from "@/components/Table/Table.module.css";

//##############################################################################

function Table({ data, headers }) {
  const { removeAllFromCart } = useContext(cartContext);

  // Rows is an array (has all items) of arrays (the row data of each product).
  const rows = data.map((_, index) => {
    return headers.map(({ headerId }) => data[index][headerId]);
  });

  console.log(rows);

  //############################################################################

  return (
    <table className={styles.table}>
      {/* <thead>
        <tr>
          {headers.map(({ headerId, headerName }) => {
            return <td key={headerId}>{headerName}</td>;
          })}
        </tr>
      </thead> */}
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
