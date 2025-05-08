import React from 'react';
import TaskCard from './TaskCard';
import '../App.css';

//BoardColumn Component
//This component displays an overall task group column (i.e. To Do) and loops over tasks within it

function BoardColumn({ board }) {
  return (

    <div className="board-column">
      <h3>{board.title}</h3>
      
      {board.items.map((item, index) => (
        <TaskCard key={index} task={item} />
      ))}

    </div>

  );

}

export default BoardColumn;
