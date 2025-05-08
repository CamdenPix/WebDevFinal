import React from 'react';
import '../App.css';

//Modal Component
//This component is a reusable template for different modals that appear when the user is generating new boards/tasks
function Modal({ title, children, onClose }) {

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h3>{title}</h3>

        {children}
        <div className="modal-actions">

          <button onClick={onClose}>Cancel</button>

        </div>
      </div>

    </div>
    
  );
}

export default Modal;
