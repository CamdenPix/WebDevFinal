import React from 'react';
import TaskCard from './TaskCard';
import '../App.css';

//BoardColumn Component
//This component displays an overall task group column (i.e. To Do) and loops over tasks within it
function BoardColumn({ column, columnIndex, boardIndex, onMoveTask }) {

  const items = Array.isArray(column?.items) ? column.items : [];

  return (

    <div className="board-column">

      <h3>{column?.title || 'Untitled Column'}</h3>

      {items.length === 0 ? (

        <p style={{ fontStyle: 'italic' }}>No tasks yet.</p>

      ) : (

        items.map((item, taskIndex) => (
          <TaskCard
            key={taskIndex}
            task={item}
            onMoveLeft={columnIndex > 0 ? () => onMoveTask(boardIndex, columnIndex, taskIndex, -1) : null}
            onMoveRight={columnIndex < 2 ? () => onMoveTask(boardIndex, columnIndex, taskIndex, 1) : null}
          />

        ))
      )}

    </div>

  );
}


export default BoardColumn;
