import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

//main dashboard component
// Button will be used to add a new task
function Dashboard({addBoard, taskBoards}) {
    const navigate = useNavigate();
    const handleAddTask = () => {
        navigate('/add-task');
    }
    const testBoard = {
        name: "My Project Board",
        boards: [
            {
                title: "To Do",
                items: [
                {
                    taskName: "Set up backend",
                    taskDescription: "Install Express, Mongoose, etc.",
                    date: "2025-05-07"
                },
                {
                    taskName: "Set up frontend",
                    taskDescription: "Initialize React app",
                    date: "2025-05-08"
                }
                ]
            },
            {
                title: "In Progress",
                items: []
            }
        ]
    };

    const boardsToRender = [];
    taskBoards.forEach(board => {
        const itemsToRender =[];
        board.items.forEach(item => {
            itemsToRender.push(
                <tr>
                    <td>{item.taskName}</td>
                </tr>
            )
        });
        boardsToRender.push(
            <div className="Group">
                <thead><tr><th>{board.title}</th></tr></thead>
                <tbody>{itemsToRender}</tbody>
            </div>
        );
    });



    return (
    <div>
        <div className="Groups">
            {boardsToRender}
        </div>
        <button onClick={()=>addBoard(testBoard)}>Add Board</button>
        <button onClick={handleAddTask}>Add Task</button>
    </div>
  )
}

export default Dashboard