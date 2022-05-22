
import express from 'express';
import router from '../routes/itemRouter';
import axios from 'axios';
const app = new express();
app.use('/items', router);

describe("Server test", () => {
    test('Should return the right code ', async () => { 
      
       const res = await axios.get('http://localhost:5002/items/read')
        expect(res.status).toBe(200)
        
         
        })
    test('Should return the some data ', async () => { 
           
           const res = await axios.get('http://localhost:5002/items/read')
            expect(res.data).toBeDefined();
            
             
            })
        
    
})