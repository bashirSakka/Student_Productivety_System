import Modal from './Modal'

export default function ConfirmModal ({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} header={title}>
      <p className='text-xs text-text-muted mb-5'>{message}</p>
      <div className='flex gap-2 justify-end'>
        <button
          onClick={onClose}
          className='text-xs px-4 py-1.5 rounded-md border border-border-strong text-text-primary hover:bg-cream2 transition-colors cursor-pointer'
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className='text-xs px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer'
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}
