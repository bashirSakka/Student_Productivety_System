import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react'

const FAQ_ITEMS = [
  {
    q: 'is studyspace really free for students?',
    a: 'yes. every core tool — gpa, tasks, notes, calendar, pomodoro, and reports — is free forever with a student email. no credit card, no trial countdown.'
  },
  {
    q: 'do my notes and grades stay private?',
    a: 'always. your data is yours. we never sell it, and you can export everything or delete your account in one click whenever you like.'
  },
  {
    q: 'can i import my course schedule?',
    a: 'you can add courses by hand in a minute, or import an .ics calendar from most school systems. deadlines and exam dates flow straight into your study calendar.'
  },
  {
    q: 'which gpa scales are supported?',
    a: '4.0, 5.0 weighted, and straight percentage, with per-course credit weighting. switch scales any time without losing history.'
  },
  {
    q: 'does it work on my phone?',
    a: 'studyspace runs in any browser and installs as a lightweight app on ios and android, so your tasks and timer follow you between the library and your desk.'
  }
]

export default function FAQ () {
  const [open, setOpen] = useState({})

  const toggle = i => setOpen(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <section id='faq' className='py-14 sm:py-24 bg-white'>
      <div className='max-w-3xl mx-auto px-4 sm:px-8'>
        <div className='flex flex-col items-center gap-3.5 text-center mb-11'>
          <span className='text-xs font-medium uppercase tracking-[0.16em] text-amber-700'>
            good to know
          </span>
          <h2 className='font-serif font-medium text-[clamp(26px,3.2vw,36px)] leading-[1.12] tracking-[-0.02em] text-slate-900'>
            questions, answered
          </h2>
        </div>
        <div className='border-t border-slate-200'>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className='border-b border-slate-200'>
              <button
                onClick={() => toggle(i)}
                className='w-full cursor-pointer flex items-center justify-between gap-4 py-5 px-1 text-left text-base font-medium text-slate-900'
              >
                {item.q}
                <span
                  className={`text-lg text-amber-700 shrink-0 transition-transform duration-200 ${
                    open[i] ? 'rotate-45' : ''
                  }`}
                >
                  <IconPlus stroke={1} />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-600 max-h-1 ${
                  open[i] ? 'max-h-72' : ''
                }`}
              >
                <p className='pb-6 px-1 max-w-[64ch] text-[14.5px] leading-7 text-slate-600'>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
