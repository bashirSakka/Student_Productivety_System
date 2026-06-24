import { Link } from 'react-router-dom'

export default function NotFound () {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-cream gap-3'>
      <p className='text-[96px] font-medium font-family-display leading-none text-text-primary'>404</p>
      <p className='text-text-muted text-sm'>This page doesn't exist.</p>
      <Link
        to='/'
        className='mt-2 text-xs px-4 py-2 rounded-md bg-lavender-light text-lavender-dark hover:bg-lavender transition-colors'
      >
        Go home
      </Link>
    </div>
  )
}
