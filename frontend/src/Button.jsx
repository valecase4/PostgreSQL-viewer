import './Button.css'
import api from './api';

export default function Button({ dbName }) {
    const prova = async () => {
        try {
            const response = await api.get(`/${dbName}`);
            console.log(response)
            window.location.href = `/db/${dbName}`
        } catch (error) {
            console.error("Error: ", error)
        }
    }
    return (
        <button onClick={prova}>
            &gt;
        </button>
    )
}