export default function Modal ({ isOpen, onClose, header, children }) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative w-full max-w-sm rounded-xl bg-white border border-cream3 p-6 shadow-xl'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-text-muted hover:text-text-primary cursor-pointer text-sm'
        >
          ✕
        </button>
        {header && (
          <h3 className='text-sm font-medium text-text-primary mb-3'>{header}</h3>
        )}
        {children}
      </div>
    </div>
  )
}
