import React, {useEffect, useState} from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

// For real time
import io from 'socket.io-client'


// For uploading data
import axios from 'axios'

const socket = io('http://localhost:5002/');

const Popup = ({ setPopup, item, setItems, setCardItem }) => {

    
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



    const addItem = () => {
        
        const uData = {
            name: data.name,
            description: data.description,
            location: data.location,
            quantity: data.quantity,
            price: data.price,
            deletionComment: ''
        }

        
        // Now add user data using axios
        axios.post("http://localhost:5002/items/create", uData)

        // Making realtime using Socket.io
        socket.once('item-added', newData => {
            console.log(newData)
            setItems((item) => ([...item, newData]))
          
        })
        
        
        setPopup(false)
    }



    const updateItem = () => {
        const uData = {
            name: data.name,
            description: data.description,
            location: data.location,
            quantity: data.quantity,
            price: data.price,
            deletionComment: data.deletionComment,
            _id: data._id
        }
        axios.put("http://localhost:5002/items/update",uData)

        socket.once('item-updated', (updatedData) => {
            console.log("aaaa");
            setCardItem(updatedData)
        })

        setPopup(false)
    }

    return (
        <div className="pop-up">
            <div className="input-box">
                <CancelIcon onClick={() => setPopup(false)} className="cross-btn" />
                <h3>Enter item details:</h3>
                <input type="text"
                    value={data.name}
                    onChange={(e) => setData( prevstate => ({
                        ...prevstate,
                        name: e.target.value
                    }))}
                />
                <input type="text"
                    value={data.description}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        description: e.target.value
                    }))}
                />
                <input type="text"
                    value={data.location}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        location: e.target.value
                    }))}
                />
                <input type="number"
                    value={data.quantity}
                    onChange={(e) => {
                        setData(prevstate => ({
                        ...prevstate,
                        quantity: e.target.value
                    }))}}
                />
                <input type="number"
                    value={data.price}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        price: e.target.value
                    }))}
                />
                {!item ? (
                    <button onClick={addItem}>
                        Add User
                    </button>
                ): (
                        <button onClick={updateItem}>
                            Update User
                        </button>
                )}
                
            </div>
        </div>
    )
}

export default Popup
