import express from 'express'
import cors from 'cors'
import Itemrouter from './routes/items-router'

const PORT = process.env.PORT || 3000
const hostname= process.env.HOSTNAME || 'http://localhost'

const app = express()

app.get('/',(req,res)=>{
    res.send('Testando api')
})

app.use(cors({
    origin: ['https://localhost:3000']
}))

app.use('/api',Itemrouter)

app.listen(PORT,()=>{
    console.log(`server running: ${hostname}:${PORT}`)
})

