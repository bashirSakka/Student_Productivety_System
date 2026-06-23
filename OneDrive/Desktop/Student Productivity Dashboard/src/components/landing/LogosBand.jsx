const unis = [
  { icon: 'ti-building-bank', name: 'berkeley' },
  { icon: 'ti-school', name: 'nyu' },
  { icon: 'ti-building-arch', name: 'uw madison' },
  { icon: 'ti-books', name: 'uoft' },
  { icon: 'ti-bell-school', name: 'ucla' }
]

export default function LogosBand ({ ref }) {
  return (
    <section ref={ref} className='bg-white border-b-[0.5px] border-black/8'>
      <div className='max-w-285 mx-auto py-6.5 px-4 sm:px-8 flex items-center justify-center gap-10 flex-wrap'>
        <span className='text-[11.5px] text-[#7A7265] tracking-[0.04em]'>
          trusted by students at
        </span>
        <div className='flex items-center gap-8.5 flex-wrap justify-center'>
          {unis.map(({ icon, name }) => (
            <span
              key={name}
              className='inline-flex items-center gap-1.75 font-serif text-[15px] font-medium text-[#2E2A24] opacity-55'
            >
              <i className={`ti ${icon} text-base text-[#7A72B0]`} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
