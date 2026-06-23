import { useInView } from 'react-intersection-observer'
import { btn } from './tokens'

export default function ClosingCTA () {
  const { ref, inView: visible } = useInView({
    threshold: 0.15,
    triggerOnce: true
  })
  return (
    <section className='bg-amber-50 border-y border-black/10'>
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-8 py-[clamp(48px,6vw,72px)] flex flex-wrap items-center justify-between gap-7 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <h2 className='font-serif font-medium text-[clamp(24px,3vw,34px)] tracking-[-0.02em] leading-tight text-slate-900'>
            ready to take back your semester?
          </h2>
          <p className='mt-2 text-sm text-slate-600'>
            free forever for students. set up in under two minutes.
          </p>
        </div>
        <a
          href='#top'
          className={`inline-flex items-center shrink-0 rounded-lg ${btn} px-5 py-3 text-sm font-medium text-white hover:bg-amber-700 transition-colors`}
        >
          open studyflow
        </a>
      </div>
    </section>
  )
}
