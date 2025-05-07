import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

//main dashboard component
// Button will be used to add a new task
function Dashboard() {
    const navigate = useNavigate();
    const handleAddTask = () => {
        navigate('/add-task');
    }
  return (
    <div>
        <h1>Task Nest</h1>
        <p>Welcome to the Task Nest task managing dashboard!</p>
        <button onClick={handleAddTask}>Add Task</button>
    </div>
  )
}

export default Dashboard