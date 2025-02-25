import './DatabaseItem.css'
import Button from './Button'

export default function DatabaseItem({ db }) {
    return (
        <div className='dbItem'>
            <img src="src/assets/postgresql-logo.png" alt="" />
            <span>{db.name}</span>
            <Button dbName={db.name} />
        </div>
    )
}