import { Prisma } from "@prisma/client/extension";
import pool from "../db/pg_client";
import { Product } from "../services/itemService";

export class ItemRespository {
    async Create(id:number,
        title:string,
        price:number,
        description:string
    ){
        const item = await pool.query(`INSERT into itens (name,id_item,price,description) 
VALUES ($1,$2,$3,$4) RETURNING id,name,id_item,price,description`,[title,id,price,description]) 
        return item.rows[0]
    } 

    async List(){
        const result =await pool.query("SELECT id,name,id_item from itens") 
        return result.rows
    }

    async ListById(id:number){
        const dbiten = await pool.query("SELECT id,name,id_item from itens where id_item = ($1)",[id])
        return dbiten.rows[0] ?? null
    }

    async Delete(id:number){
        const item = await pool.query("DELETE from itens WHERE id_item = ($1)",[id])
        return item
    }

}
