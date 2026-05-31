import { Link, useLocation } from 'react-router-dom'

const workspaceLinks = [
  { name: 'Dashboard', path: '/', color: 'bg-sage' },
  { name: 'Courses', path: '/courses', color: 'bg-lavender' },
  { name: 'Tasks', path: '/tasks', color: 'bg-peach' },
  { name: 'Calendar', path: '/calendar', color: 'bg-sky' }
]

const toolLinks = [
  { name: 'Pomodoro', path: '/pomodoro', color: 'bg-peach' },
  { name: 'GPA Calc', path: '/gpa', color: 'bg-sage' },
  { name: 'Notes', path: '/notes', color: 'bg-lavender' }
]

export default function NavLinks ({ onNavigate }) {
  const location = useLocation()

  const linkClass = path =>
    `flex items-center w-full cursor-pointer px-2.5 gap-2.5 py-1.5 text-text-secondary rounded-md text-sm ${
      location.pathname === path
        ? 'bg-white border border-border-strong'
        : 'duration-200 hover:bg-cream3'
    }`

  return (
    <div className='flex flex-col flex-1'>
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

      <div className='mt-auto pt-8'>
        <button className='flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13.5px] w-full text-left text-text-muted hover:bg-cream3 transition-colors'>
          <span className='w-2 h-2 rounded-full shrink-0 bg-cream3' />
          Settings
        </button>
      </div>
    </div>
  )
}
