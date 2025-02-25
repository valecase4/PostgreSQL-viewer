import { use, useState } from "react"
import { useParams } from "react-router"
import { useEffect } from "react"
import api from "./api"
import TableDetails from "./TableDetails"
import './DatabaseDetails.css'

const DatabaseDetails = () => {
    let { dbName } = useParams()
    console.log(dbName)
    const [tables, setTables] = useState([]);
    
    const fetchTables = async () => {
        try {
          const response = await api.get(`/${dbName}`);
          const data = response.data.tables
          setTables(data)
          console.log(data)
        } catch (error) {
          console.error("Error: ", error)
        }
    }

    useEffect(() => {
        fetchTables();
    }, [])

    console.log(tables)

    return (
        <>
            <h1>{ dbName }</h1>
            <div className="container">
            {tables.length > 0 ? (
                tables.map((table, index) => (
                    <TableDetails key={index} tableName={table.name} columns={table.columns} />
                ))
                ) : (
                    <p className="noTableText">Nessuna tabella trovata.</p>
                )
            }
            </div>
        </>
    )
}

export default DatabaseDetails