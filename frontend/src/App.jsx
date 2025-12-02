import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'

const API_URL = 'https://todo-app-5m4s.onrender.com'
  //process.env.REACT_APP_API_URL
  //'http://localhost:5000/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [input,setInput] = useState('')

  useEffect(()=>
    {
      fetchTodos()
    },[])

  const fetchTodos = async ()=>
      {
        const res = await axios.get(API_URL)
        setTodos(res.data)
      }

 const addText = async ()=> 
  {
    if(input.trim() !== "")
      {
        const res = await axios.post(API_URL,{data:input})
        setTodos([...todos,res.data])
        setInput("")
      }
  }

  const deleteItem = async (id)=>
  {
    await axios.delete(`${API_URL}/${id}`)
    setTodos(todos.filter(i=> i.id !== id))
  }

  const CheckMark = async (id, completed)=>
  {
    const res = await axios.put(`${API_URL}/${id}`, {complete:!complete})
    setTodos(todos.map(item=> item._id === id ? res.data : item))
  }

  return (
    <div>
      <h3>The Todo App</h3>
      <input
      placeholder='Please enter your Todo...'
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      onKeyDown={(e)=> e.key === "Enter" && addText()}/>
      <button onClick={addText}>Add</button>
      <ul>
        {
          todos.map((item)=>
            (
              <li key={item.id} className={item.complete ? 'strike' : ''}>
              <input
               type='checkbox'
               checked={item.complete}
               onChange={()=>CheckMark(item.id)}/>
               {item.data}
               <button onClick={()=>deleteItem(item.id)}>Delete</button>
               </li>
            ))
        }
      </ul>
    </div>
  )
}

export default App
