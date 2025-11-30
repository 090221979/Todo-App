import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { connectDB } from "./config/db.js"


const app = express()
app.use(express.json())
app.use(cors({ origin: 'https://todo-9gmstacdp-090221979s-projects.vercel.app' }))


mongoose.connect(process.env.MONGOOB_URI || 'mongodb://localhost:27017/todos')
    .then(()=>console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB error: ', err))    


const todoSchema = new mongoose.Schema(
    {
        data:String,
        complete: {type: Boolean, default: false}
    })
const Todo = mongoose.model('Todo',todoSchema)

app.get('/api/todos',async(req,res)=>
    {
        const todos = await Todo.find()
        res.json(todos)
    })

app.post('/api/todos', async (req,res)=>
    {
        const todo = new Todo({data:req.body.text})
        await todo.save()
        res.json(todo)
    })

app.put('/api/todos/:id',async (req,res)=>
    {
        const todo = await Todo.findByIdAndUpdate
        (
            req.params.id,
            {complete:req.body.complete},
            {new:true}
        )
        res.json(todo)
    })

app.delete('/api/todos', async (req,res)=>
    {
        await Todo.findByIdAndDelete(req.params.id)
        res.json({message:'deleted'})
    })

const PORT = 5000
connectDB()
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))

