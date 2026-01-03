import { Response,Request } from "express"
import pool from "../db/pg_client.js"
import redis, { connectRedis } from "../db/redis_client.js"
import { ItemRespository } from "../repositories/ItemRepository.js";
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
        const item = await ItemRespository.Create(id,title,price,description) 
        return item
    }

    static async ListItems(){
        const result = await ItemRespository.List()  
        return result
    }

    static async listById(id:number){
        const cacheKey = `item:${id}`

        //try get from the redis cache
        const cached = await redis.get(cacheKey) 
        if(cached){
            console.log("returned by cache")
            return JSON.parse(cached)
        }        

        //try get from the database 
        const item=await ItemRespository.ListById(id) 
        if(item){
            console.log("returned by db")
            await redis.set(cacheKey,JSON.stringify(item),{EX:300})
            return item
        }


        //fetch direct from the api
        const getItemApi = await fetch(`https://fakestoreapi.com/products/${id}`)
        if(!getItemApi.ok){
            return null
        }
        const product:Product = await getItemApi.json() 

        //set new iten to the cache and in the database
        const created = await ItemRespository.Create(product.id,
        product.title,
        product.price,
        product.description
        ) 
        await redis.set(cacheKey,JSON.stringify(created),{EX:300})

        console.log('returned by external api')
        return created 
    }
    
    static async deleteItems(id:number){
        const result =await ItemRespository.Delete(id) 
        if(result){
            redis.del(`item:${id}`)
        }
        return
    }

}
