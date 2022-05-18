import React, { useState, useEffect } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from './Popup';
import axios from 'axios';
import io from 'socket.io-client'
const socket = io('http://localhost:5002/');

const Card = ({ type, item, setItems, allItems }) => {

    const [popup, setPopup] = useState(false);

    const [carItem, setCardItem] = useState(item);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5002/items/delete/${id}`)
        socket.on('item-deleted', (id) => {
            const newItems = allItems.filter(item => {
                return item._id !== id
            })
            setItems(newItems)
            console.log(newItems)
            console.log(id)
        })
    }

    

    return (
        <div>
            {
                popup && <Popup setPopup={setPopup} 
                item={carItem} setItems={setItems} 
                setCardItem={setCardItem}/>
            }
            {(type === 'card') ? (
                <div className="cards">
                    <div className="display">
                        <div className="content">
                            <strong>{carItem.name}</strong>
                            <p className="about">Description: {carItem.description}</p>
                            <p className="location">Location: {carItem.location}</p>
                            <p className="quantity">Quantity: {carItem.quantity}</p>
                            <p className="price">Price: {carItem.price}</p>
                        </div>

                    </div>
                    <div className="btn-container">
                        <div onClick={() => setPopup(true)}>
                            <CreateIcon />
                        </div>
                        <div onClick={() => handleDelete(item._id)}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="addcards"
                        onClick={() => setPopup(true)}>
                        <AddCircleOutlineIcon />
                    </div>
                )}


        </div>

    )
}

export default Card
