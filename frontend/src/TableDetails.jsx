import './TableDetails.css'

const TableDetails = ({ tableName, columns }) => {
    return (
        <div className='tableDiv'>
            <div className="tableNameDiv">
                <strong><u>{ tableName }</u></strong>
            </div>
            <div className="tableBodyDiv">
                {columns.map((col, index) => (
                    <div className='tableColumnDiv' key={index}>
                        <div className='columnNameDiv'>
                            <strong>{col.name}</strong>
                        </div>
                        <div>
                            {col.type}
                        </div>
                    </div>
                ))}
            </div>
            {/* <ul>
                {columns.map((col, index) => (
                    <li key={index}>
                        <strong>{col.name}</strong>: {col.type}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default TableDetails;