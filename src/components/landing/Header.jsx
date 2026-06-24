import { Link } from 'react-router-dom'

export default function LandingHeader ({ view }) {
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b-[0.5px] transition-colors duration-200 ${
        view ? 'border-border-strong' : ' border-transparent'
      }`}
      style={{ background: 'color-mix(in srgb, #FAEEDA 86%, transparent)' }}
    >
      <div className='max-w-[1140px] mx-auto px-4 sm:px-8 flex items-center justify-between h-16'>
        {/* Brand wordmark */}
        <a
          href='#top'
          className='inline-flex items-baseline gap-px font-serif text-[19px] font-medium tracking-[-0.02em] text-amber-900 no-underline'
        >
          studyflow
          <span className='w-[7px] h-[7px] rounded-full bg-[#D85A30] inline-block ml-[3px] -mb-0.5' />
        </a>

        {/* Center nav links */}
        <nav className='hidden sm:flex items-center gap-[30px]'>
          {['features', 'students', 'faq'].map(id => (
            <a
              key={id}
              href={`#${id}`}
              className='text-sm text-text-amber-900 no-underline hover:text-[#D85A30] transition-colors duration-150'
            >
              {id}
            </a>
          ))}
        </nav>

        {/* Right: sign in + CTA */}
        <div className='flex items-center gap-[18px]'>
          <Link
            to='/register'
            className='hidden sm:inline text-sm text-[#7A7265] no-underline'
          >
            Sign Up
          </Link>
          <Link
            to='/login'
            className='inline-flex items-center bg-[#D85A30] text-white py-2 px-4 rounded-lg text-[13px] font-medium no-underline hover:opacity-90 transition-opacity duration-150'
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  )
}
