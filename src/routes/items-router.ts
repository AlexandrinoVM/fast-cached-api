import express from 'express'
import { ItemController } from '../controllers/ItenController.js'
import { itemService } from '../container.js'
const Itemrouter = express.Router()
const itemController = new ItemController(itemService)

Itemrouter.get('/iten', (req, res) =>
  itemController.List(req, res)
)

Itemrouter.post('/iten', (req, res) =>
  itemController.Create(req, res)
)

Itemrouter.get('/iten/:id', (req, res) =>
  itemController.getItemById(req, res)
)

Itemrouter.delete('/iten/:id', (req, res) =>
  itemController.Delete(req, res)
)

export default Itemrouter






