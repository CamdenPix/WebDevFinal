import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardColumn from './BoardColumn';
import '../App.css';
import axios from 'axios';

//Dashboard Component
//Displays general dashboard layout and calls on separate BoardColumns and passes info to each.
function Dashboard({ addBoard, taskBoards }) {
  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate('/add-task');
  };

  return (
    <div>

      <div className="dashboard">

      {taskBoards.map((board, index) => (
        <div key={index}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <h2>{board.name}</h2>
        
        
        <button onClick={async () => {
          try {
            await axios.delete(`http://localhost:5001/api/boards/${board._id}`);
            window.location.reload();
          } catch (err) {
            console.error('Failed to delete board:', err);
          }
        }}>
          Delete
        </button>
      </div>


          {board.boards.map((col, i) => (
            <BoardColumn key={i} column={col} />
          ))}

        </div>

      ))}


      </div>

      <button onClick={async () => {
          await addBoard({
            name: "My Project Board",
            boards: [
              {
                title: "To Do",
                items: [
                  {
                    taskName: "Set up backend",
                    taskDescription: "Install Express, Mongoose, etc.",
                    date: "2025-05-07"
                  }
                ]
              }
            ]
          });
          window.location.reload(); //DEBUGGING: forcing dashboard to refresh after every instance of adding a board
        }}>
          Add Board
        </button>

      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default Dashboard;
