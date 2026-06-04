import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import NavLinks from './NavLinks'
import { IconX } from '@tabler/icons-react'

const pageNames = {
  '/': 'Dashboard',
  '/courses': 'Courses',
  '/tasks': 'Tasks',
  '/calendar': 'Calendar',
  '/pomodoro': 'Pomodoro',
  '/gpa': 'GPA Calc',
  '/notes': 'Notes'
}

export default function Burger () {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const pageName = pageNames[location.pathname] || 'Dashboard'

  return (
    <header className='sticky top-0 z-30 flex items-center justify-between px-[18px] h-[52px] bg-cream2 border-b border-black/10'>
      <div className='font-display text-[15px] font-medium text-text-main'>
        study<span className='italic text-sagedark'>flow</span>
      </div>
      <span className='absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-text-main'>
        {pageName}
      </span>
      <button
        onClick={() => setOpen(!open)}
        className='w-[34px] h-[34px] rounded-[7px] flex items-center justify-center text-text-muted hover:bg-cream3 transition-colors'
      >
        <div className='flex flex-col gap-[4.5px]'>
          <span className='block w-[18px] h-[1.5px] bg-text-muted rounded-sm' />
          <span className='block w-[13px] h-[1.5px] bg-text-muted rounded-sm' />
          <span className='block w-[18px] h-[1.5px] bg-text-muted rounded-sm' />
        </div>
      </button>
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />
      {/* drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-cream2 z-50 shadow-lg transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h1 className='p-8 flex justify-between text-base font-family-display font-medium px-2 pb-5'>
          <div>
            study<span className='italic text-sagedark'>flow</span>
          </div>
          <IconX stroke={2} onClick={() => setOpen(false)} />
        </h1>
        <NavLinks onNavigate={() => setOpen(false)} />
      </div>
    </header>
  )
}
