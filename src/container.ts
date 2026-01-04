import { ItemRespository } from "./repositories/ItemRepository"
import { FakeStoreClient } from "./gateways/fakestore/FakeStoreCleint"
import { ItemService } from "./services/itemService"
import Redis from "./db/redis_client"

const itemRepository = new ItemRespository()
const fakeStoreClient = new FakeStoreClient()


export const itemService = new ItemService(
    itemRepository,
    Redis,
    fakeStoreClient
)
