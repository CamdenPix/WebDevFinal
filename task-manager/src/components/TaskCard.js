import React from 'react';
import '../App.css'; 

//Specfic individual TaskCard component
//This component showcases one specific task

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h4>{task.taskName}</h4>
      <p>{task.taskDescription}</p>
      <small>Due: {task.date}</small>
    </div>
  );
}

export default TaskCard;
