import { useEffect, useState } from 'react'
import './Home.css'
import api from './api'
import DatabaseItem from './DatabaseItem'

const Home = () => {
  const [dbs, setDbs] = useState([]);

  const fetchItems = async () => {
      try {
        const response = await api.get("/");
        const data = response.data.databases
        setDbs(data)
      } catch (error) {
        console.error("Error: ", error)
      }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
        {dbs.length > 0 ? (
          dbs.map((db, index) => (
            <DatabaseItem key={index} db={db} />
          ))
        ) : (
          <p>Nessun database trovato.</p>
        )
      }
    </div>
  ) 
}

export default Home
