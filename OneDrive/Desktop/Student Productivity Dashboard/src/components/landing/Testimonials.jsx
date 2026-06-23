import { useInView } from 'react-intersection-observer'
import { bgLanding } from './tokens'

const TESTIMONIALS = [
  {
    quote:
      "i used to keep grades in a spreadsheet, deadlines in my head, and notes in five apps. now it's all one place. my gpa went up half a point.",
    initials: 'mj',
    name: 'maya j.',
    role: 'cs junior · berkeley'
  },
  {
    quote:
      "the pomodoro timer linked to my tasks is the only thing that's ever made me study before the night before. quietly addictive.",
    initials: 'dt',
    name: 'devon t.',
    role: 'pre-med · nyu'
  },
  {
    quote:
      "nothing here shouts at me. it just shows what's due and how i'm doing. that's exactly what i wanted and never found.",
    initials: 'sl',
    name: 'sara l.',
    role: 'econ sophomore · uoft'
  }
]

function TestimonialCard ({ t, i }) {
  const { ref, inView: visible } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <div
      ref={ref}
      className={`bg-white border-[0.5px] border-black/8 rounded-xl p-6 flex flex-col gap-4.5 ${
        visible ? 'animate-slideUp' : 'opacity-0'
      }`}
      style={{ animationDelay: `${i * 80}ms` }}
    >
      <i className='ti ti-quote text-[19px] text-amber-700 leading-none' />
      <p className='text-[14.5px] text-[#2E2A24] leading-[1.6] flex-1'>{t.quote}</p>
      <div className='flex items-center gap-2.75'>
        <span className={`w-9.5 h-9.5 shrink-0 rounded-full ${bgLanding} border-[0.5px] border-amber-600 flex items-center justify-center font-serif font-medium text-[14px] text-amber-800`}>
          {t.initials}
        </span>
        <div>
          <b className='text-[13.5px] font-medium text-[#2E2A24] block'>{t.name}</b>
          <span className='text-[12px] text-[#7A7265]'>{t.role}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials () {
  const { ref: headerRef, inView: headerVisible } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <section id='students' className={`${bgLanding} py-14 sm:py-24 border-b-[0.5px] border-black/10`}>
      <div className='max-w-285 mx-auto px-4 sm:px-8'>
        <div
          ref={headerRef}
          className={`text-center max-w-150 mx-auto mb-13 flex flex-col gap-3.5 items-center ${
            headerVisible ? 'animate-slideUp' : 'opacity-0'
          }`}
        >
          <span className='text-xs font-medium text-amber-700 tracking-[0.16em] lowercase'>
            loved by students
          </span>
          <h2 className='font-serif font-medium text-[clamp(26px,3.2vw,36px)] leading-[1.12] tracking-[-0.02em] text-[#2E2A24]'>
            a calmer way to get through
            <br />
            the term
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
