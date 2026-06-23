import { twMerge } from 'tailwind-merge'

export default function FormInput ({ label, className = '', ...props }) {
  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='text-[11px] text-text-muted'>{label}</label>}
      <input
        className={twMerge(
          'border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none',
          className
        )}
        {...props}
      />
    </div>
  )
}
