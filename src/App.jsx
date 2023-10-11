import { useEffect, useState } from 'react'
import { List } from './components/List'
import axios from 'axios'
import { baseURL } from './utils/constant'

function App() {
  
  const [task1, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [updateUI, setUpdateUI] = useState(false)
  const [updateID, setUpdateID] = useState(null)
  const [refresh,setRefresh] = useState(0)
  
  const Get = async ()=>{
    await axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data)
      setTasks(res.data)
    })
    setRefresh(refresh+1)
  }
  
  useEffect( () => {
    Get()
  }, [updateUI,refresh])

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: task1 }).then((res) => {
      console.log(res.data)
      setTask("")
      setUpdateUI((prevState) => !prevState)
    })
  }
  
  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateID}`, { task: task1 }).then((res) => {
      console.log(res.data)
      setTask("")
      setUpdateUI((prevState) => !prevState)
    })
  }
  
  const updateMode = (id, text) => {
    console.log(text);
    setTask(text)
    setUpdateID(id)
  }
  
  return (
    <div>
      <h1 style={{ fontSize: '24px', textAlign: 'center' }}>TO-DO List</h1>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          value={task1}
          onChange={(e) => {
            setTask(e.target.value)
          }}
        />
        <button
          type="submit"
          onClick={updateID ? updateTask : addTask}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {updateID ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            updateMode={updateMode}
            setUpdateUI={setUpdateUI}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
