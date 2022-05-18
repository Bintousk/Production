import React, {useEffect, useState} from 'react'
import "./Home.css"

// For fetching data
import axios from 'axios'

import Card from './Card';

const Home = () => {

    const [items, setItems] = useState()

    useEffect(()=>{
        axios.get('http://localhost:5002/items/read')
        .then(res => {
            setItems(res.data)
        })
    },[])


    console.log(items)

    return (
        <div>
            <h1 className='title'>Items List</h1>
            <div className="container">
                {items && items.map(item => (
                    <Card type="card" key={item._id} 
                    item={item} allItems={items} 
                    setItems={setItems}/>
                ))}
                
                <Card type="add" setItems={setItems}/>
            </div>
        </div>
    )
}

export default Home
