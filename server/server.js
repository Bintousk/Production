import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose' 
import Router from './routes/itemRouter.js'
import {createServer} from 'http'
import  * as io from 'socket.io'

const app = express();
app.use(express.json());
app.use(cors());
const port = 5002;
const server = createServer(app)
server.listen(port, () => console.log(`Server is running at ${port}........`))
app.get("/",(req,res) => res.send("Server is running..."))
const mongoUrl = "mongodb+srv://challenge:challenge@cluster0.szxje.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.use("/items", Router);

const socketIo = new io.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});;

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB databse connected.");

    const changeStream = connection.collection('items').watch({ fullDocument: 'updateLookup' });

    changeStream.on('change', (change)=>{
        switch(change.operationType){
            case 'insert':
                const item = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    description : change.fullDocument.description,
                    location: change.fullDocument.location,
                    quantity: change.fullDocument.quantity,
                    price: change.fullDocument.price,
                    deletionComment: change.fullDocument.deletionComment
                }
             
                socketIo.emit('item-added', item)
                break;
            
            case 'delete':
                socketIo.emit('item-deleted', change.documentKey._id)
                break;

            case 'update':
                const updatedItem = {
                    _id: change.fullDocument._id,
                    name: change.fullDocument.name,
                    description : change.fullDocument.description,
                    location: change.fullDocument.location,
                    quantity: change.fullDocument.quantity,
                    price: change.fullDocument.price,
                    deletionComment: change.fullDocument.deletionComment
                }
                socketIo.emit('item-updated',updatedItem)
                break;
        }
    })

})
