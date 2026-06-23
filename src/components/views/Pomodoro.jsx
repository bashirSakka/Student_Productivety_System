import Card from '../ui/Card'
import Pill from '../ui/Pill'
import Button from '../ui/Button'
import PomodoroWidget from '../pomodoro/PomodoroWidget'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import { useCounterStore, useWorkStore, initialState, sessionMapping } from '../../store/pomodoroStore'
export default function Pomodoro () {
  const isActive = useCounterStore(state => state.isActive)
  const reset = useCounterStore(state => state.reset)
  const start = useCounterStore(state => state.start)
  const stop = useCounterStore(state => state.stop)
  const increment = useCounterStore(state => state.increment)
  const decrement = useCounterStore(state => state.decrement)
  const work=useWorkStore(state => state.work);
  const setWork=useWorkStore(state=>state.setWork)
  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const STATES = [
    { key: 'work', label: 'Focus duration', min: 1, max: 90 },
    { key: 'shortBreak', label: 'Short Break', min: 1, max: 30 },
    { key: 'longBreak', label: 'Long Break', min: 1, max: 60 },
    { key: 'round', label: 'Rounds Before Long Break', min: 1, max: 10 }
  ]

  const activeTab = 'bg-peach-light text-peach-dark border-[--var(peach)]'

  const buttons = [
    { label: 'Reset', onClick: () => reset() },
    {
      label: isActive ? 'Pause' : 'Start',
      onClick: () => {
        isActive ? stop() : start()
      }
    },
    { label: 'Skip', onClick: () => console.log('skip') }
  ]

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-family-display font-medium '>
        Promodoro Timer
      </h2>
      <p className='text-text-muted text-xs'>
        Stay focused, take breaks, get things done!
      </p>
      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
        <Card className='col-span-2'>
          <div className='flex flex-row mb-8 gap-2'>
            {['Focus', 'Short Break', 'Long Break'].map(key => (
              <Pill
                key={sessionMapping[key] || 'longBreak'}
                className={
                  initialState.session === sessionMapping[key] ? activeTab : ''
                }
              >
                {key}
              </Pill>
            ))}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <PomodoroWidget
              widthHeight='w-[180px] h-[180px]'
              textSize='text-5xl'
            ></PomodoroWidget>
            <p className='text-[11px] mt-3 text-text-muted uppercase tracking-[0.07em] mb-4'>
              {initialState.session === 'work'
                ? 'Focus Session '
                : initialState.session === 'shortBreak'
                ? 'Short Break Session '
                : 'Long Break Session '}
              - Round {initialState.round} of 4
            </p>
            <div className='flex flex-row mb-4 gap-2'>
              {buttons.map(btn => (
                <Button
                  onClick={btn.onClick}
                  key={btn.label}
                  className={`  hover:bg-black hover:text-white duration-200 transition-colors`}
                >
                  {btn.label}
                </Button>
              ))}
            </div>

            <div className='flex  gap-2 mb-4'>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className='w-[7px] h-[7px] bg-peach rounded-full'
                />
              ))}
            </div>
          </div>

          <p className='text-text-muted text-[10px] uppercase pt-3 border-t border-border-strong'>
            Today' stats
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
            <div className='bg-cream2 rounded-md p-3'>
              <p className='text-text-muted text-[10px] uppercase mb-2'>
                Sessions
              </p>
              <p className='text-2xl font-family-display  font-medium'>
                {initialState.round}
              </p>
            </div>{' '}
            <div className='bg-cream2 rounded-md p-3'>
              <p className='text-text-muted text-[10px] uppercase mb-2'>
                focus time
              </p>
              <p className='text-2xl font-family-display  font-medium'>3</p>
            </div>{' '}
            <div className='bg-cream2 rounded-md p-3'>
              <p className='text-text-muted text-[10px] uppercase mb-2'>goal</p>
              <p className='text-2xl font-family-display  font-medium'>3</p>
            </div>
          </div>
        </Card>
        <div className='flex flex-col col-span-1'>
          <Card className='mb-4'>
            {' '}
            <p className='text-text-muted uppercase text-[10px] mb-2'></p>
            <input
            value={work}
              type='text'
              onChange={(e) => {setWork(e.target.value)}}
              placeholder='What are you working on?'
              className='bg-cream text-xs p-3  w-full rounded-[6px] border border-border-strong focus:outline-none focus:ring-0'
            />
            <p className='text-text-muted  text-[10px] mt-2'>
              This will show on dashboard widget
            </p>
          </Card>
          <Card className='mb-4'>
            {' '}
            <p className='text-text-muted uppercase text-[10px] mb-2'>
              This Week
            </p>
            {WEEKDAYS.map(day => (
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-text-2 text-xs w-[7%] shrink-0'>
                  {day}
                </span>
                <div className='bg-cream2 w-[82%] h-[6px] rounded-[99px]'>
                  <div className='h-full bg-peach rounded-[99px] w-[70%]'></div>
                </div>
                <span className='text-text-2 text-xs w-[7%] text-right shrink-0'>
                  8
                </span>
              </div>
            ))}
          </Card>

          <Card>
            {STATES.map(st => (
              <div
                key={st.key}
                className='flex items-center justify-between border-b border-border-strong p-2'
              >
                <label className='text-sm text-text-primary font-medium'>
                  {st.label}
                </label>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => decrement()}
                    className='w-6 h-6 flex border border-border-strong cursor-pointer bg-cream items-center justify-center rounded-md hover:bg-cream3 text-text-muted'
                  >
                    <IconMinus size={14} stroke={2} />
                  </button>
                  <span className='text-sm text-text-primary w-6 text-center'>
                    {initialState.Timers[st.key]}
                  </span>
                  <button
                    onClick={() => increment()}
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
