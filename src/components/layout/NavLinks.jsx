import { Link, useLocation } from 'react-router-dom'
import Card from '../ui/Card'
import UserMenu from './UserMenu'
import { useState } from 'react'
const workspaceLinks = [
  { name: 'Dashboard', path: '/dashboard', color: 'bg-sage' },
  { name: 'Courses', path: '/courses', color: 'bg-lavender' },
  { name: 'Tasks', path: '/tasks', color: 'bg-peach' },
  { name: 'Calendar', path: '/calendar', color: 'bg-sky' }
]

const toolLinks = [
  { name: 'Pomodoro', path: '/pomodoro', color: 'bg-peach' },
  { name: 'GPA Calc', path: '/gpa', color: 'bg-sage' },
  { name: 'Notes', path: '/notes', color: 'bg-lavender' }
]

const accountLinks = [
  { name: 'Settings', path: '/settings', color: 'bg-cream3' }
]

export default function NavLinks ({ onNavigate }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const linkClass = path =>
    `flex items-center w-full cursor-pointer px-2.5 gap-2.5 py-1.5 text-text-secondary rounded-md text-sm border transition-colors duration-200 ${
      location.pathname === path
        ? 'bg-white border-border-strong'
        : 'border-transparent hover:bg-cream3'
    }`

  return (
    <div className='flex flex-col flex-1'>
      <div className='p-4'>
        <p className='px-2 mb-1 font-medium text-[10px] text-text-muted tracking-[0.08em] p-3 uppercase'>
          Workspace
        </p>
        {workspaceLinks.map(link => (
          <Link key={link.name} to={link.path} onClick={onNavigate}>
            <button className={linkClass(link.path)}>
              <div className={`rounded-full w-[8px] h-[8px] ${link.color}`} />
              {link.name}
            </button>
          </Link>
        ))}
        <p className='mt-3 px-2 mb-1 font-medium text-[10px] text-text-muted tracking-[0.08em] p-3 uppercase'>
          Tools
        </p>
        {toolLinks.map(link => (
          <Link key={link.name} to={link.path} onClick={onNavigate}>
            <button className={linkClass(link.path)}>
              <div className={`rounded-full w-[8px] h-[8px] ${link.color}`} />
              {link.name}
            </button>
          </Link>
        ))}
        <p className='mt-3 px-2 mb-1 font-medium text-[10px] text-text-muted tracking-[0.08em] p-3 uppercase'>
          Account
        </p>
        {accountLinks.map(link => (
          <Link key={link.name} to={link.path} onClick={onNavigate}>
            <button className={linkClass(link.path)}>
              <div className={`rounded-full w-[8px] h-[8px] ${link.color}`} />
              {link.name}
            </button>
          </Link>
        ))}
      </div>
      <div className='border-t p-2 border-border-strong'>
        <UserMenu open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}
