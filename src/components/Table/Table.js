import styles from "@/components/Table/Table.module.css"

export default function Table({className, data, headers}) {
    let tableClassName = styles.table;

    //
    if (className) {
        tableClassName = `${tableClassName} ${className}`
    }

    //
    // Remember that "data" is an array of objects
    // So could use data.map() instead of [...new Array(data.length)].map()
    // Here, rows is an array (has all items) of arrays (the row data of each item)
    const rows = [...new Array(data.length)].map((item, index) => {
        return headers.map(({headerId}) => data[index][headerId]);
    })

    return (
        <table className={tableClassName}>
            <thead>
            <tr>
                {headers.map(({headerId, headerName}) => {
                    return (
                        <td key={headerId}>{headerName}</td>
                    )
                })}
            </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => {
                return (
                    <tr key={index}>
                        {row.map((cell, index) => {
                            return <td key={index}>{cell}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )

}