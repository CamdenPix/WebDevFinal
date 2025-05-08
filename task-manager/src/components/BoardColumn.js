import React from 'react';
import TaskCard from './TaskCard';
import '../App.css';

//BoardColumn Component
//This component displays an overall task group column (i.e. To Do) and loops over tasks within it
function BoardColumn({ column }) {

  const items = Array.isArray(column?.items) ? column.items : [];

  return (

    <div className="board-column">

      <h3>{column?.title?.trim() || 'Untitled Column'}</h3>

      <div className="task-list">

        {items.length === 0 ? (
          <p className="no-tasks">No tasks yet.</p>

        ) : (

          items.map((item, index) => (
            <TaskCard key={index} task={item} />

          ))

        )}

      </div>

    </div>
    
  );
}

export default BoardColumn;