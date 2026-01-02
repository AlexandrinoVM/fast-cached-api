import express from 'express'
import client from '../db/pg_client'

const Itemrouter = express.Router()

Itemrouter.post('/itens',(req,res)=>{
    res.send('Item Created')

})
Itemrouter.get('/itens/:id',async (req,res)=>{
  try {
    const id = Number(req.params.id)

    const result = await client.query('SELECT NOW()')

    res.send(`Item ${id} - database time: ${result.rows[0].now}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('Database error')
  }})

Itemrouter.get('/itens',(req,res)=>{
    res.send('itens get')
})

Itemrouter.put('/itens',(req,res)=>{
    res.send('Itens Created')
})

Itemrouter.delete('/itens/:id',(req,res)=>{
    const id:number = +req.params.id
    res.send(`Itens deleted:${id}`)
})


export default Itemrouter






