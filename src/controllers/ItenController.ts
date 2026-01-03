import { Response,Request } from "express"
import { ItemService, Product } from "../services/itemService.js"

export class ItemController{
    static async List(req:Request,res:Response){
        try{
            const users = await ItemService.ListItems();
            res.status(200).json(users)
        }catch(err){
            res.status(500).json({message: 'Error trying to list itens'})
            console.log(`error in Itemcontroller.List:${err}`)
        }
    }
    static async Create(req:Request,res:Response){
        try{
            const produtc:Product= req.body
            const user = await ItemService.CreateItem(produtc)
            res.status(201).json(user)
        }catch(err){
            res.status(500).json({message: 'error trying to create iten'})
            console.log(`error in ItemController.Create:${err}`)
        }
    }
    static async getItemById(req:Request,res:Response){
        try{
           const id = Number(req.params.id)
            if(isNaN(id) || id <= 0){
                res.status(400).json({message: 'error invalid id'})
                return
            }
            const user = await ItemService.listById(id)
            if(!user){
                res.status(404).json({message: 'item not found'}) 
                return
            }
            res.status(200).json(user)
        }catch(err){
            res.status(400).json({message: 'error trying to find item'})
            console.log(`error in Itemcontroller.getItemById:${err}`)
        }
    }
}
