import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';


function AddTask() {

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {

    const newTask = {
      taskName,
      taskDescription,
      date

    };

    try {

      //temporarily hardcoding a board, if time permits, change to real board later
      const res = await axios.get('http://localhost:5001/api/boards');
      

      const firstBoard = res.data[0];

      //if no board exist then alert user
      //eventual idea of 3 board: To-Do, In-Progress, Done
      if (!firstBoard || !firstBoard.boards[0]) {
        alert('No board available to add task');
        return;
      }

      // Add to first column 
      firstBoard.boards[0].items.push(newTask);

      await axios.put('http://localhost:5001/api/boards', {

        name: firstBoard._id,
        ...firstBoard
      
    });

      alert('Task added!');
      navigate('/');
      window.location.reload();
    
    } 
    
    catch (err) {
      console.error(err);
      alert('Failed to add task');
    }

  };


  return (

    <div>

      <h2>Add Task</h2>

      <div>

        <label>
          Task Name:
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </label>

        <br />

        <label>
          Description:
          <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
        </label>

        <br />

        <label>
          Due Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <br />

        <button onClick={handleSubmit}>Add Task</button>

      </div>

    </div>

  );
}

export default AddTask;
