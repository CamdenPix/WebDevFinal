import React from 'react';
import '../App.css'; 

//Specfic individual TaskCard component
//This component showcases one specific task and provides the user the option to change the task status

function TaskCard({ task, onMoveLeft, onMoveRight }) {

  return (

    <div className="task-card">

      <strong>{task.taskName}</strong>

      <p>{task.taskDescription}</p>

      <small>Due: {task.date}</small>

      <div className="task-actions">

        {onMoveLeft && <button onClick={onMoveLeft}>&larr;</button>}
        {onMoveRight && <button onClick={onMoveRight}>&rarr;</button>}

      </div>

    </div>

  );

}

export default TaskCard;
