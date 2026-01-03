import { Response,Request } from "express"
import pool from "../db/pg_client.js"
import redis, { connectRedis } from "../db/redis_client.js"
export interface ItemInterFaceDTO{
    name:string,
    id:number
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export class ItemService {
    static async CreateItem(data:Product){
        const {id,title,price,description} = data 
        const User = await pool.query(`INSERT into itens (name,id_item,price,description) 
            VALUES ($1,$2,$3,$4) RETURNING id,name,id_item,price,description`,[title,id,price,description]) 
        return User.rows[0]
    }

    static async ListItemsn(){
        const result =await pool.query("SELECT id,name,id_item from itens") 
        return result
    }

    static async listById(id:Number){
        const cacheKey = `item:${id}`

        //try get from the redis cache
        const cached = await redis.get(cacheKey) 
        if(cached){
            console.log("returned by cache")
            return JSON.parse(cached)
        }        

        //try get from the database 
        const dbiten = await pool.query("SELECT id,name,id_item from itens where id_item = ($1)",[id])
        if(dbiten.rowCount != 0){
            console.log("returned by db")
            await redis.set(cacheKey,JSON.stringify(dbiten),{EX:300})
            return dbiten.rows[0]
        }


        //fetch direct from the api
        const getItemApi = await fetch(`https://fakestoreapi.com/products/${id}`)
        if(!getItemApi.ok){
            console.log("returned by cache")
            return null
        }
        const product:Product = await getItemApi.json() 

        //set new iten to the cache and in the database
        await redis.set(cacheKey,JSON.stringify(product),{EX:300})
        await this.CreateItem(product) 

        console.log('returned by external api')
        return product

    }
}
