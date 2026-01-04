import { Response,Request } from "express"
import pool from "../db/pg_client.js"
import Redis, { connectRedis } from "../db/redis_client.js"
import { ItemRespository } from "../repositories/ItemRepository.js";
import { throws } from "node:assert";
import { FakeStoreClient } from "../gateways/fakestore/FakeStoreCleint.js";
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
    constructor(private repo:ItemRespository,
                private cache:typeof Redis,
                private externalApi:FakeStoreClient
                ){}
    async CreateItem(data:Product){
        const {id,title,price,description} = data 

        const item = await this.repo.Create(id,title,price,description) 
        return item
    }

    async ListItems(){
        const result = await this.repo.List()  
        return result
    }

    async listById(id:number){
        const cacheKey = `item:${id}`
        
        //try get from the redis cache
        const cached = await this.cache.get(cacheKey) 
        if(cached){
            return JSON.parse(cached)
        }        

        //try get from the database 
        const item=await this.repo.ListById(id) 
        if(item){
            await this.cache.set(cacheKey,JSON.stringify(item),{EX:300})
            return item
        }
        //fetch direct from the api
        const product = await this.externalApi.getProduct(id) 
        if(!product){
            return null
        }

        //set new iten to the cache and in the database
        const created = await this.repo.Create(product.id,
        product.title,
        product.price,
        product.description
        ) 
        await this.cache.set(cacheKey,JSON.stringify(created),{EX:300})
        return created 
    }
    
    async deleteItems(id:number){
        const result =await this.repo.Delete(id) 
        if(result){
            this.cache.del(`item:${id}`)
        }
        return
    }

}
