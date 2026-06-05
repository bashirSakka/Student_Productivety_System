import NavLinks from './NavLinks'

export default function Navbar () {
  return (
    <nav className='flex flex-col  border-r border-border-strong bg-cream2 h-full'>
      <h1 className='text-base font-family-display font-medium px-2 mt-10 ml-5 pb-5'>
        study<span className='italic text-sagedark'>flow</span>
      </h1>
      <NavLinks />
    </nav>
  )
}
