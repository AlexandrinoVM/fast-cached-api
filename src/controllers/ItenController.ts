import { Response,Request } from "express"
import { ItemService, Product } from "../services/itemService.js"

export class ItemController{
    static async List(req:Request,res:Response){
        const users = await ItemService.ListItemsn();
        return res.json(users)
    }
    static async Create(req:Request,res:Response){
        const produtc:Product= req.body
        const user = await ItemService.CreateItem(produtc)
        return res.status(201).json(user)
    }
    static async getItemById(req:Request,res:Response){
           const id:Number = Number(req.params.id)
            const user = await ItemService.listById(id)
            return res.status(200).json(user)
    }
}
