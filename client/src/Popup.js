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
      if(valid()){
        const uData = {
          name: data.name,
          description: data.description,
          location: data.location,
          quantity: data.quantity,
          price: data.price,
          deletionComment: ''
      }
      axios.post("http://localhost:5002/items/create", uData);

      socket.once('item-added', newData => {
        console.log(newData)
        setItems((item) => ([...item, newData]))
      
    })

        setPopup(false)
      }
      else{
        
        alert("Please fill all the inputs and quantity and price have to be positive number ! \nYou also have to select a location ");
      }

    }

    const valid = () => {
     
      if(data.name === ""){
        return false;
      }
      if(data.description === "") {
        return false;
        
      }
      if(data.location === ""){
        return false;
        
      }
      if(
        isNaN(+(data.price)) ||
        data.price < 0 ){
        return false;
        
      }
      if(
        isNaN(+(data.quantity)) ||
        data.quantity < 0 ){
        return false;
        
      }
      return true
    }

    const updateItem = () => {
      if(valid()){
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
            
            setCardItem(updatedData)
            window.location.reload() 
        })

        setPopup(false)
      }
      else{
        
        alert("Please fill all the inputs and quantity and price have to be positive number ! \n You also have to select a location ");
      }
    }

    return (
        <div className="pop-up">
            <div className="input-box">
                <CancelIcon onClick={() => setPopup(false)} className="cross-btn" />
                <h3>Enter item details:</h3>
              <label>
                Name
                <input type="text"
                    value={data.name}
                    onChange={(e) => setData( prevstate => ({
                        ...prevstate,
                        name: e.target.value
                    }))}
                />
              </label>
                
              <label>
                Description
                <input type="text"
                    value={data.description}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        description: e.target.value
                    }))}
                />
              </label>
                
      
              <label>
                Quantity
                 <input 
                   type="number"
                    value={data.quantity}
                    onChange={(e) => {
                              setData(prevstate => ({
                        ...prevstate,
                        quantity: e.target.value
                    }))
                         }
                     }
                />
              </label>
               
              <label>
                Price($)
                 <input type="number"
                    value={data.price}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        price: e.target.value
                    }))}
                />
              </label>
              <label>
                Location
                <select id="location" defaultValue=''
              onChange={(e) => setData(prevstate => ({
                ...prevstate,
                location: e.target.value
            }))}>
        <option value="London,uk">London</option>
        <option value="Montreal,ca">Montreal</option>
        <option value="Toronto,ca">Toronto</option>
        <option value="Ottawa,ca">Ottawa</option>
        <option value="Vancouver,ca">Vancouver</option>
      </select>
              </label>
               
               
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
