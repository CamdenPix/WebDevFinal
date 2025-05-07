import React from 'react'
import '../App.css'

// AddTask component
// This component will be used to add a new task
function AddTask() {
  return (
    <div>
            <h2>Add Task</h2>
            <form>
                <label>
                    Task Name:
                    <input type="text" name="taskName" />
                </label>
                <br />
                <label>
                    Description:
                    <textarea name="description"></textarea>
                </label>
                <br />
                <button type="submit">Add Task</button>
            </form>
        </div>
    
  )
}

export default AddTask