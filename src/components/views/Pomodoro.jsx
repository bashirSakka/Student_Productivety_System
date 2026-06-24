import Card from '../ui/Card'
import Pill from '../ui/Pill'
import Button from '../ui/Button'
import PomodoroWidget from '../pomodoro/PomodoroWidget'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import { useCounterStore, useWorkStore, sessionMapping } from '../../store/pomodoroStore'

export default function Pomodoro () {
  const isActive          = useCounterStore(state => state.isActive)
  const session           = useCounterStore(state => state.session)
  const round             = useCounterStore(state => state.round)
  const timers            = useCounterStore(state => state.timers)
  const completedSessions = useCounterStore(state => state.completedSessions)
  const start             = useCounterStore(state => state.start)
  const stop              = useCounterStore(state => state.stop)
  const reset             = useCounterStore(state => state.reset)
  const setSession        = useCounterStore(state => state.setSession)
  const incrementTimer    = useCounterStore(state => state.incrementTimer)
  const decrementTimer    = useCounterStore(state => state.decrementTimer)
  const work    = useWorkStore(state => state.work)
  const setWork = useWorkStore(state => state.setWork)

  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const STATES = [
    { key: 'work',       label: 'Focus duration'          },
    { key: 'shortBreak', label: 'Short Break'              },
    { key: 'longBreak',  label: 'Long Break'               },
    { key: 'round',      label: 'Rounds Before Long Break' }
  ]

  const sessionLabel = session === 'work'
    ? 'Focus Session'
    : session === 'shortBreak'
    ? 'Short Break Session'
    : 'Long Break Session'

  const focusMinutes = completedSessions * timers.work
  const focusDisplay = focusMinutes >= 60
    ? `${Math.floor(focusMinutes / 60)}h ${focusMinutes % 60}m`
    : `${focusMinutes}m`

  const buttons = [
    { label: 'Reset', onClick: reset },
    { label: isActive ? 'Pause' : 'Start', onClick: isActive ? stop : start },
    { label: 'Skip',  onClick: () => setSession(session === 'work' ? 'shortBreak' : 'work') }
  ]

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-family-display font-medium'>Pomodoro Timer</h2>
      <p className='text-text-muted text-xs'>Stay focused, take breaks, get things done!</p>
      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
        <Card className='col-span-2'>
          <div className='flex flex-row mb-8 gap-2'>
            {['Focus', 'Short Break', 'Long Break'].map(key => (
              <Pill
                key={key}
                onClick={() => setSession(sessionMapping[key])}
                className={`cursor-pointer transition-colors ${
                  session === sessionMapping[key] ? 'bg-peach-light text-peach-dark' : ''
                }`}
              >
                {key}
              </Pill>
            ))}
          </div>

          <div className='flex flex-col items-center justify-center'>
            <PomodoroWidget widthHeight='w-[180px] h-[180px]' textSize='text-5xl' />
            <p className='text-[11px] mt-3 text-text-muted uppercase tracking-[0.07em] mb-4'>
              {sessionLabel} — Round {round} of {timers.round}
            </p>
            <div className='flex flex-row mb-4 gap-2'>
              {buttons.map(btn => (
                <Button
                  key={btn.label}
                  onClick={btn.onClick}
                  className='hover:bg-black hover:text-white duration-200 transition-colors'
                >
                  {btn.label}
                </Button>
              ))}
            </div>
            <div className='flex gap-2 mb-4'>
              {Array.from({ length: timers.round }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.75 h-1.75 rounded-full ${i < round ? 'bg-peach' : 'bg-cream3'}`}
                />
              ))}
            </div>
          </div>

          <p className='text-text-muted text-[10px] uppercase pt-3 border-t border-border-strong'>
            Today's stats
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
            <div className='bg-cream2 rounded-md p-3'>
              <p className='text-text-muted text-[10px] uppercase mb-2'>Sessions</p>
              <p className='text-2xl font-family-display font-medium'>{completedSessions}</p>
            </div>
            <div className='bg-cream2 rounded-md p-3'>
              <p className='text-text-muted text-[10px] uppercase mb-2'>Focus time</p>
              <p className='text-2xl font-family-display font-medium'>{focusDisplay}</p>
            </div>
            <div className='bg-cream2 rounded-md p-3'>
              <p className='text-text-muted text-[10px] uppercase mb-2'>Goal</p>
              <p className='text-2xl font-family-display font-medium'>{timers.round} rounds</p>
            </div>
          </div>
        </Card>

        <div className='flex flex-col col-span-1'>
          <Card className='mb-4'>
            <p className='text-text-muted uppercase text-[10px] mb-2'></p>
            <input
              value={work}
              type='text'
              onChange={e => setWork(e.target.value)}
              placeholder='What are you working on?'
              className='bg-cream text-xs p-3 w-full rounded-md border border-border-strong focus:outline-none focus:ring-0'
            />
            <p className='text-text-muted text-[10px] mt-2'>This will show on dashboard widget</p>
          </Card>

          <Card className='mb-4'>
            <p className='text-text-muted uppercase text-[10px] mb-2'>This Week</p>
            {WEEKDAYS.map(day => (
              <div key={day} className='flex items-center gap-2 mb-2'>
                <span className='text-text-2 text-xs w-[7%] shrink-0'>{day}</span>
                <div className='bg-cream2 w-[82%] h-[6px] rounded-[99px]'>
                  <div className='h-full bg-peach rounded-[99px] w-[70%]' />
                </div>
                <span className='text-text-2 text-xs w-[7%] text-right shrink-0'>8</span>
              </div>
            ))}
          </Card>

          <Card>
            {STATES.map(st => (
              <div
                key={st.key}
                className='flex items-center justify-between border-b border-border-strong p-2 last:border-0'
              >
                <label className='text-sm text-text-primary font-medium'>{st.label}</label>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => decrementTimer(st.key)}
                    className='w-6 h-6 flex border border-border-strong cursor-pointer bg-cream items-center justify-center rounded-md hover:bg-cream3 text-text-muted'
                  >
                    <IconMinus size={14} stroke={2} />
                  </button>
                  <span className='text-sm text-text-primary w-6 text-center'>
                    {timers[st.key]}
                  </span>
                  <button
                    onClick={() => incrementTimer(st.key)}
                    className='w-6 h-6 flex border border-border-strong cursor-pointer bg-cream items-center justify-center rounded-md hover:bg-cream3 text-text-muted'
                  >
                    <IconPlus size={14} stroke={2} />
                  </button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
