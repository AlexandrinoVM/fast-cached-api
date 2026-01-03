import express from 'express'
import client from '../db/pg_client.js'
import { ItemController } from '../controllers/ItenController.js'

const Itemrouter = express.Router()

Itemrouter.get("/iten",ItemController.List)
Itemrouter.post("/iten",ItemController.Create)
Itemrouter.get("/iten/:id",ItemController.getItemById)


export default Itemrouter






