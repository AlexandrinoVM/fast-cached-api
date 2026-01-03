import pool from "../db/pg_client";
import { Product } from "../services/itemService";

export class ItemRespository {
    static async Create(id:number,
        title:string,
        price:number,
        description:string
    ){
        const User = await pool.query(`INSERT into itens (name,id_item,price,description) 
VALUES ($1,$2,$3,$4) RETURNING id,name,id_item,price,description`,[title,id,price,description]) 
        return User.rows[0]
    } 

    static async List(){
        const result =await pool.query("SELECT id,name,id_item from itens") 
        return result.rows
    }

    static async ListById(id:number){
        const dbiten = await pool.query("SELECT id,name,id_item from itens where id_item = ($1)",[id])
        return dbiten.rows[0] ?? null
    }

    static async Delete(id:number){
        const item = await pool.query("DELETE from itens WHERE id_item = ($1)",[id])
        return item
    }

}
