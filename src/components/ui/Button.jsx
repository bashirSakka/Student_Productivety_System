import { twMerge } from 'tailwind-merge'

export default function Button ({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'border flex items-center justify-center  rounded-md border-border-strong py-1.5 px-4 font-medium text-xs cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
