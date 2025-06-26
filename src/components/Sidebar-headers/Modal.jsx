import React, { useEffect, useState } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle enter animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content slide-${isOpen ? 'in' : 'out'}`}>
        <button className="close-btn" onClick={onClose}>← Back</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;