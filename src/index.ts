import express from 'express'
import cors from 'cors'
import Itemrouter from './routes/items-router.js'
import Redis, { connectRedis } from './db/redis_client.js'

const PORT = process.env.PORT || 3000
const hostname= process.env.HOSTNAME || 'http://localhost'

const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Testando api')
})

app.use(cors({
    origin: ['https://localhost:3000']
}))

app.use('/api',Itemrouter)

async function initServer(){
    await connectRedis()
    app.listen(PORT,()=>{
        console.log(`server running: ${hostname}:${PORT}`)
    })
}
initServer()

