import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardColumn from './BoardColumn';
import '../App.css';
import axios from 'axios';

//Dashboard Component
//Displays general dashboard layout and calls on separate BoardColumns and passes info to each.
function Dashboard({ addBoard, taskBoards }) {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [boardName, setBoardName] = useState('');

  const handleAddTask = () => {

    navigate('/add-task');

  };

  const handleAddBoard = async () => {

    if (!boardName.trim()) return;

    await addBoard({

      name: boardName.trim(),
      boards: [

        {
          title: "To Do",
          items: []
        }

      ]

    });

    setShowModal(false);
    setBoardName('');
    window.location.reload(); //Backlog refresh just in case (from debugging review earlier)


  };

  return (

    <div>

      {taskBoards.length === 0 ? (

        <div className="no-boards">

          <h2>No Active Boards</h2>

        </div>

      ) : (
        <div className="dashboard">

          {taskBoards.map((board, index) => (

            <div key={index} className="board-wrapper">

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{board.name}</h2>

                <button onClick={async () => {
                  if (window.confirm(`Delete board "${board.name}"?`)) {
                    try {
                      await axios.delete(`http://localhost:5001/api/boards/${board._id}`);
                      window.location.reload();
                    } catch (err) {
                      console.error('Failed to delete board:', err);
                    }
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

      )}

      <div style={{ marginTop: '1rem' }}>

        <button onClick={() => setShowModal(true)}>Add Board</button>

        <button onClick={handleAddTask} style={{ marginLeft: '10px' }}>Add Task</button>

      </div>



      {/* Add Board Modal */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal">

            <h3>Name Your New Board</h3>

            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Board name"
            />

            <div className="modal-actions">

              <button onClick={handleAddBoard}>Create</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;
