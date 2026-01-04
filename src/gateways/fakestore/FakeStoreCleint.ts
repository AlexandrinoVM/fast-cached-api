import { Product } from "../../services/itemService";



export class FakeStoreClient{
    async getProduct(id:number): Promise<Product | null>{
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if(!res.ok) return null
        return res.json()
    }
}
