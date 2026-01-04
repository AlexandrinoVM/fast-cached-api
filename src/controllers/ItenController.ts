import { Response,Request } from "express"
import { ItemService, Product } from "../services/itemService.js"

export class ItemController{
    constructor(private itemService:ItemService){}

    async List(req:Request,res:Response){
        try{
            const users = await this.itemService.ListItems();
            res.status(200).json(users)
        }catch(err){
            res.status(500).json({message: 'Error trying to list itens'})
            console.log(`error in Itemcontroller.List:${err}`)
        }
    }

    async Create(req:Request,res:Response){
        try{
            const produtc:Product= req.body
            const user = await this.itemService.CreateItem(produtc)
            res.status(201).json(user)
        }catch(err){
            res.status(500).json({message: 'error trying to create iten'})
            console.log(`error in ItemController.Create:${err}`)
        }
    }

    async getItemById(req:Request,res:Response){
        try{
           const id = Number(req.params.id)
            if(isNaN(id) || id <= 0){
                res.status(400).json({message: 'error invalid id'})
                return
            }
            const user = await this.itemService.listById(id)
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

    async Delete(req:Request,res:Response){
        try{
            const id = Number(req.params.id)
            const item= await this.itemService.deleteItems(id);
            res.status(200).json(item)
        }catch(err){
            res.status(500).json({message: 'Error trying to delete item'})
            console.log(`error in Itemcontroller.Delete:${err}`)
        }
    }
}
