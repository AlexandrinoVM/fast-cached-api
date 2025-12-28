import express from 'express'


const Itemrouter = express.Router()


Itemrouter.post('/itens',(req,res)=>{
    res.send('Item Created')

})
Itemrouter.get('/itens/:id',(req,res)=>{
    const id:number = +req.params.id
    res.send(`Item Created ${id}`)

})

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






