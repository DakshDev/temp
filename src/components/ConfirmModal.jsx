import React from 'react';

const ConfirmModal = ({ isOpen, title = 'Confirm', message, onCancel, onConfirm, cancelLabel = 'Cancel', confirmLabel = 'Delete', confirmLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}
        <div className="flex items-center gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmLoading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
            type="button"
          >
            {confirmLoading ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
