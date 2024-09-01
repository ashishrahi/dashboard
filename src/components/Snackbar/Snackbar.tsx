import React, { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Snackbar will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 max-w-xs w-full bg-blue-500 text-white rounded-md shadow-lg transition-opacity ${
        open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDuration: '500ms', transitionProperty: 'opacity, transform' }}
    >
      <div className="flex items-center">
        <div className="flex-1">{message}</div>
        <button onClick={onClose} className="ml-4 text-gray-200 hover:text-gray-100">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
