import React, { useState, useEffect } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from './Popup';
import PopupComment from './PopupComment';
import axios from 'axios';
import io from 'socket.io-client'
import { stringify } from 'querystring';

const socket = io('http://localhost:5002/');

const Card = ({ type, item, setItems, allItems }) => {

    const [popup, setPopup] = useState(false);
    const [popupComment, setPopupComment] = useState(false)

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

    const[locationInfo, setLocationInfo] = useState();
    useEffect(()=>{
        axios.get('http://api.openweathermap.org/data/2.5/weather?q='+data.location+'&APPID=ed4802a96a03a05c9c12f782aff76684').then(res => {
            const tempCelsius = res.data.main.temp - 273.15
            const info = 'the current temperature is '+ tempCelsius.toFixed(2) + '˚C and the humidity is at ' + res.data.main.humidity



            setLocationInfo(info)
        }).catch(err => {
            setLocationInfo("no information available")
        })
    })

    

    return (
        <div>
            {
                popup && <Popup setPopup={setPopup} 
                item={carItem} setItems={setItems} 
                setCardItem={setCardItem}/>
            }
            {
                popupComment && <PopupComment setPopupComment= {setPopupComment}
                item={carItem} setItems={setItems} 
                setCardItem={setCardItem}/>
            }
            {(type === 'row') ? (
                <div className="cards">
                 
                        <div className="content">
                            <strong>{carItem.name}</strong>
                            <p className="about">Description: {carItem.description}</p>
                            <p className="location">Location: {carItem.location}</p>
                            <p className="quantity">Quantity: {carItem.quantity}</p>
                            <p className="price">Price: {carItem.price} $ </p>
                            <p className="weather">Weather description : {locationInfo}</p>
                            
                        </div>

                  
                    <div className="btn-container">
                        <div onClick={() => setPopup(true)}>
                            <CreateIcon />
                        </div>
                        <div onClick={() => setPopupComment(true)}>
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
