import { twMerge } from 'tailwind-merge'

export default function Pill ({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={twMerge('w-max border border-border-strong rounded-full py-1.5 px-4 font-medium text-xs', className)}
    >
      {children}
    </div>
  )
}
