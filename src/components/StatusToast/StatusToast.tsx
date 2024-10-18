import React, { useEffect } from 'react';

import { StatusToastProps } from './StatusToast.types';

/**
 * Toast component to show status messages when an action is performed
 *
 * @param {string} title Title of the toast
 * @param {string} message Message of the toast
 * @param {'sucess' | 'danger'} type Type of the toast: 'success' or 'danger'
 * @param {() => void} onClose Function to close the toast
 *
 * @returns {JSX.Element} StatusToast component
 */
const StatusToast = ({ title, message, type, onClose }: StatusToastProps) => {
  const timeout = 5000; // 5 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const toastCardStyle = { width: '18rem', zIndex: '10' } as React.CSSProperties;

  return (
    <div className="d-block mx-auto fixed-top mt-5" style={toastCardStyle}>
      <div className={`card ${type === 'success' ? 'text-bg-success' : 'text-bg-danger'}`}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <p className="card-text mt-2">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusToast;
