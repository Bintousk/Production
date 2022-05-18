import React, { useState, useEffect } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from './Popup';
import axios from 'axios';
import io from 'socket.io-client'
const socket = io('http://localhost:5002/');

const Trash = ({ type, item, setItems, allItems }) => {

    const [popup, setPopup] = useState(false);

    const [carItem, setCardItem] = useState(item);
    const [data, setData] = useState({
        name: '',
        description: '',
        location: '',
        quantity: '',
        price: '' ,
        deletionComment: ''
    });
    useEffect(() => {
        if(item) setData(item);
    }, [])

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

    const restore = () =>{
        const uData = {
            name: data.name,
            description: data.description,
            location: data.location,
            quantity: data.quantity,
            price: data.price,
            deletionComment: '',
            _id: data._id
        }
        axios.put("http://localhost:5002/items/update",uData)

        socket.once('item-updated', (updatedData) => {
            console.log("aaaa");
            setCardItem(updatedData)
        })
        window.location.reload()

    }
    

    return (
        <div>
          
            {(
                <div className="cards">
                    
                        <div className="content">
                            <strong>{carItem.name}</strong>
                            <p className="about">Description: {carItem.description}</p>
                            <p className="location">Location: {carItem.location}</p>
                            <p className="quantity">Quantity: {carItem.quantity}</p>
                            <p className="price">Price: {carItem.price}</p>
                            {(carItem.deletionComment) ? ( <p> Deletion comment: {carItem.deletionComment}</p>)
                            :
                            (
                                <></>
                            )}
                        </div>

                  
                    <div className="btn-container">
                        <div onClick={() => restore()}>
                            <RestoreIcon />
                        </div>
                        <div onClick={() => handleDelete(item._id)}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
            )}


        </div>

    )
}

export default Trash
