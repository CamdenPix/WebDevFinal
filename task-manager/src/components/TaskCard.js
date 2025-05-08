import React from 'react';
import '../App.css'; 

//Specfic individual TaskCard component
//This component showcases one specific task and provides the user the option to change the task status

function TaskCard({ task, onMoveLeft, onMoveRight, onDelete }) {

  return (

    <div className="task-card">

      <strong>{task.taskName}</strong>

      <p>{task.taskDescription}</p>

      <small>Due: {task.date}</small>

      <div className="task-card-actions">

        {onMoveLeft && <button onClick={onMoveLeft}>&uarr;</button>}
        {onDelete && <button className="delete-button" onClick={onDelete}>🗑️</button>}
        {onMoveRight && <button onClick={onMoveRight}>&darr;</button>}

      </div>

    </div>

  );

}

export default TaskCard;
