import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardColumn from './BoardColumn';
import '../App.css';
import axios from 'axios';
import Modal from './Modal';

//Dashboard Component
//Displays general dashboard layout and calls on separate BoardColumns and passes info to each.
//Displays modal upon request to create new task board or specific task
function Dashboard({ addBoard, taskBoards }) {

  const navigate = useNavigate();

  const [boardName, setBoardName] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState('');

  const handleCreateBoard = async () => {
    if (!boardName.trim()) return;

    await addBoard({
      name: boardName.trim(),
      boards: [
        { title: "To Do", items: [] },
        { title: "In Progress", items: [] },
        { title: "Done", items: [] }
      ]
    });

    setBoardName('');
    setShowAddBoard(false);
    window.location.reload(); //Debugging: just in case of window refactor lag
  };


  const handleCreateTask = async () => {
    if (!taskName || !selectedBoardId) return alert("Please complete all fields.");

    try {
      const res = await axios.get(`http://localhost:5001/api/boards/${selectedBoardId}`);
      const board = res.data;

      const todoColumn = board.boards.find(col => col.title.toLowerCase() === 'to do');

      if (!todoColumn) {
        alert('No "To Do" column found on this board.');
        return;
      }
      
      todoColumn.items.push({
        taskName,
        taskDescription,
        date: taskDate
      });

      await axios.put('http://localhost:5001/api/boards', {
        _id: board._id,
        ...board
      });

      setShowAddTask(false);
      setTaskName('');
      setTaskDescription('');
      setTaskDate('');
      setSelectedBoardId('');
      window.location.reload();
    } 
    
    catch (err) {
      console.error("Error adding task:", err);
    }

  };

  const handleMoveTask = async (boardIndex, columnIndex, taskIndex, direction) => {
    try {

      const board = { ...taskBoards[boardIndex] };
      const sourceCol = board.boards[columnIndex];
      const targetCol = board.boards[columnIndex + direction];
  
      if (!sourceCol || !targetCol) return;
  
      const [movedTask] = sourceCol.items.splice(taskIndex, 1); //TASK DELETION 
  
      targetCol.items.push(movedTask); //TASK STATUS SHIFTER
  
      await axios.put('http://localhost:5001/api/boards', {

        _id: board._id,
        ...board

      });
  
      window.location.reload(); //a refresh is required here since there's a PUT request, possible dynamic integration so no hard refresh necesary?
    } 
    
    catch (err) {
      console.error('Error altering task status: ', err);
    }

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
                    } 
                    
                    catch (err) {
                      console.error('Failed to delete board:', err);
                    }

                  }

                }}>

                  Delete
                </button>

              </div>

              
              <div className="board-columns">
                {board.boards.map((col, i) => (

                  <BoardColumn
                    key={i}
                    column={col}
                    columnIndex={i}
                    boardIndex={index}
                    onMoveTask={handleMoveTask}
                  />

                ))}

              </div>

            </div>

          ))}

        </div>

      )}

      <div style={{ marginTop: '1rem' }}>

        <button onClick={() => setShowAddBoard(true)}>Add Board</button>

        <button onClick={() => setShowAddTask(true)}>Add Task</button>

      </div>




      {/* Add BOARD Modal */}
      {showAddBoard && (
        <Modal title="Name Your New Board" onClose={() => setShowAddBoard(false)}>

          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Board name"
          />

          <div className="modal-actions">
            <button onClick={handleCreateBoard}>Create</button>
          </div>

        </Modal>

      )}


      {/* Add TASK Modal */}
      {showAddTask && (
        <Modal title="Add New Task" onClose={() => setShowAddTask(false)}>

          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
          />

          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task description"
          />

          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />

          <select
            value={selectedBoardId}
            onChange={(e) => {

              setSelectedBoardId(e.target.value);

            }}
          >

            <option value="" disabled>Select a board</option>
            {taskBoards.map(board => (
              <option key={board._id} value={board._id}>{board.name}</option>
            ))}

          </select>

          <div className="modal-actions">
            <button onClick={handleCreateTask}>Add Task</button>
          </div>

        </Modal>

      )}

    </div>

  );

}

export default Dashboard;
