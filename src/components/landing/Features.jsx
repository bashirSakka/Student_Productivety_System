import { useInView } from 'react-intersection-observer'
import {
  IconCalendar,
  IconCalculator,
  IconClockHour3,
  IconNote,
  IconReportAnalytics,
  IconChecklist
} from '@tabler/icons-react'
import Card from '../ui/Card'
import { bgLanding, bgLanding2 } from './tokens'

const FEATURES = [
  {
    icon: IconCalculator,
    title: 'gpa calculator',
    desc: 'track grades across every course. supports 4.0, 5.0, and percentage scales, with what-if projections.'
  },
  {
    icon: IconClockHour3,
    title: 'pomodoro timer',
    desc: 'configurable focus and break sessions with gentle sound cues and streaks that keep you honest.'
  },
  {
    icon: IconNote,
    title: 'smart notes',
    desc: 'linked directly to your courses, so every note carries its context and is easy to find at exam time.'
  },
  {
    icon: IconCalendar,
    title: 'study calendar',
    desc: 'see deadlines and exam dates at a glance, week by week, with reminders before things sneak up.'
  },
  {
    icon: IconChecklist,
    title: 'task planner',
    desc: 'assign tasks to courses, set priorities, and watch your week clear itself one checkbox at a time.'
  },
  {
    icon: IconReportAnalytics,
    title: 'progress reports',
    desc: 'weekly summaries of your gpa trend, focused hours, and completions — momentum you can actually see.'
  }
]

export default function Features () {
  const { ref, inView: visible } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <section id='features' className={`${bgLanding2} py-14 sm:py-24 border-b-[0.5px] border-black/8`}>
      <div className='max-w-285 mx-auto px-4 sm:px-8'>
        <div className='text-center max-w-[600px] mx-auto mb-13 flex flex-col gap-3.5 items-center'>
          <span className='text-xs font-medium text-amber-800 tracking-[0.16em] lowercase'>
            everything you need
          </span>
          <h2 className='font-serif font-medium text-[clamp(26px,3.2vw,36px)] leading-[1.12] tracking-[-0.02em] text-[#2E2A24]'>
            built around how students
            <br />
            actually work
          </h2>
          <p className='text-[15px] text-[#7A7265] leading-[1.6]'>
            six quiet tools that talk to each other — your grades, time, and
            notes finally living in the same place.
          </p>
        </div>
        <div ref={ref} />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {FEATURES.map((f, i) => (
            <Card
              key={f.title}
              className={visible ? 'animate-slideUp' : 'opacity-0'}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-[42px] h-[42px] rounded-lg ${bgLanding} border-[0.5px] border-amber-600 flex items-center justify-center text-[21px] text-amber-700 mb-4.5`}>
                <f.icon />
              </div>
              <h3 className='font-serif font-medium text-[17px] text-[#2E2A24] mb-2 tracking-[-0.01em]'>
                {f.title}
              </h3>
              <p className='text-[13.5px] text-[#7A7265] leading-[1.6]'>{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
