import styles from "@/components/Table/Table.module.css";

//##############################################################################

function Table({ className, data, headers }) {
  let tableClassName = styles.table;

  /*
  TODO:
  Forgot what this was about. Check again!
  */
  if (className) {
    tableClassName = `${tableClassName} ${className}`;
  }

  // Rows is an array (has all items) of arrays (the row data of each product).
  const rows = data.map((_, index) => {
    return headers.map(({ headerId }) => data[index][headerId]);
  });

  //############################################################################

  return (
    <table className={tableClassName}>
      <thead>
        <tr>
          {headers.map(({ headerId, headerName }) => {
            return <td key={headerId}>{headerName}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={index}>
              {row.map((cell, index) => {
                return <td key={index}>{cell}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
