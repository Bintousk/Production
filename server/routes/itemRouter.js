import express from 'express'
import Item from '../models/Items.js'
const Router = express.Router()

Router.get(
    '/read',
    async (req, res) => {
        Item.find({}, (error,result)=>{
            if(error) res.send(error)
            else res.send(result)
        })
    }
)
Router.post(
    '/create',
    async(req, res) => {
        const data = {
            name : req.body.name,
            description :req.body.description,
            location: req.body.location,
            quantity: req.body.quantity,
            price : req.body.price,
        }
        const item = new Item(data);
        try {
            await item.save();
        } catch (error) {
            console.log(error)
        }
    }
)


Router.put(
    '/update',
    async (req, res) => {
        const data = {
            name : req.body.name,
            description :req.body.description,
            location: req.body.location,
            quantity: req.body.quantity,
            price : req.body.price,
        }

        const id = req.body._id;

        try {
            await Item.findByIdAndUpdate(id,data,(err,updatedData)=>{
                if(!err) res.send(`Updated data`)
                else console.log(err)
            })
        } catch (error) {
            console.log(error)
        }

    }
)

Router.delete(
    '/delete/:id',
    async(req,res) => {
        const id = req.params.id;
        await Item.findByIdAndRemove(id).exec();
        res.send('Deleted');
    }
)


export default Router