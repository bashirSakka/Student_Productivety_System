import { useCounterStore, useWorkStore } from '../../store/pomodoroStore'
import Card from '../ui/Card'
import PomodoroWidget from '../pomodoro/PomodoroWidget'
import useGpaStore from '../../store/gpaStore'
import useTaskStore from '../../store/taskStore'

export default function Dashboard () {
  const hour = new Date().getHours()
  const gpa      = useGpaStore(state => state.gpa)
  const classes  = useGpaStore(state => state.courses)
  const allTasks = useTaskStore(state => state.tasks)
  const session  = useCounterStore(state => state.session)
  const round    = useCounterStore(state => state.round)
  const timers   = useCounterStore(state => state.timers)

  const dueTasks = allTasks
    .filter(t => t.status !== 'completed' && t.due_at)
    .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))
    .slice(0, 5)

  const gradeColor = g => ({
    A: 'bg-sage-light text-sage-dark',
    B: 'bg-sky-light text-sky',
    C: 'bg-lavender-light text-lavender-dark',
    D: 'bg-peach-light text-peach-dark',
    F: 'bg-red-200 text-red-700'
  })[g?.[0]] ?? 'bg-cream3 text-text-muted'

  const sessionLabel = session === 'work'
    ? 'Focus'
    : session === 'shortBreak'
    ? 'Short Break'
    : 'Long Break'

  const cardData = [
    {
      title: 'Current GPA',
      value: gpa !== null ? gpa.toFixed(2) : '—',
      tagColor: 'text-sage-dark',
      tagBgColor: 'bg-sage-light',
      tag: '↑ from 3.65'
    },
    {
      title: 'Focus Today',
      value: '1h 40m',
      tagColor: 'text-peach-dark',
      tagBgColor: 'bg-peach-light',
      tag: '5 sessions left'
    },
    {
      title: 'deadlines',
      value: `${dueTasks.length} due`,
      tagColor: 'text-lavender-dark',
      tagBgColor: 'bg-lavender-light',
      tag: 'this week'
    }
  ]
  let greeting, icon

  if (hour < 12) {
    greeting = 'Good Morning'
    icon = '☀'
  } else if (hour < 17) {
    greeting = 'Good Afternoon'
    icon = '🌤'
  } else if (hour < 21) {
    greeting = 'Good Evening'
    icon = '🌇'
  } else {
    greeting = 'Good Night'
    icon = '🌙'
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date())

  const work = useWorkStore(state => state.work)

  return (
    <div className='p-4'>
      <div className='mb-10'>
        <h2 className='font-family-display text-xl'>
          {greeting} {icon}
        </h2>
        <p className='text-text-muted text-sm'>Today is {formattedDate}</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        {cardData.map((card, index) => (
          <Card key={index} header={card.title} body={card.value}>
            <div
              className={`${card.tagBgColor} ${card.tagColor} inline-block text-[10px] px-[7px] py-[2px] rounded-[99px] mt-[6px] font-medium`}
            >
              {card.tag}
            </div>
          </Card>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-6'>
        <div className='flex flex-col'>
          <p className='text-[11px] text-text-muted uppercase tracking-[0.07em] mb-[5px]'>
            Today's Tasks
          </p>
          <Card>
            {dueTasks.length === 0
              ? <p className='text-xs text-text-muted text-center py-4'>No upcoming deadlines</p>
              : dueTasks.map(task => (
                <div
                  key={task.id}
                  className='flex items-center justify-between font-medium border-b border-border-strong p-2 last:border-0'
                >
                  <label className='text-sm text-text-primary'>{task.title}</label>
                  <p className='text-xs text-text-muted'>{task.due_at}</p>
                </div>
              ))
            }
          </Card>
        </div>
        <div className='flex flex-col'>
          <p className='text-[11px] text-text-muted uppercase tracking-[0.07em] mb-[5px]'>
            Pomodoro
          </p>
          <Card>
            <PomodoroWidget
              header={sessionLabel}
              widthHeight='w-[88px] h-[88px]'
              textSize='text-[20px]'
            >
              <p className='mt-4 text-xs text-text-secondary'>{work}</p>
              <div className='flex mt-4 gap-2'>
                {Array.from({ length: timers.round }).map((_, i) => (
                  <div key={i} className={`w-1.75 h-1.75 rounded-full ${i < round ? 'bg-peach' : 'bg-cream3'}`} />
                ))}
              </div>
            </PomodoroWidget>
          </Card>
        </div>
      </div>

      <div className='flex flex-col w-full lg:w-150 mt-6'>
        <p className='text-[11px] text-text-muted uppercase tracking-[0.07em] mb-1.25'>
          GPA Overview
        </p>
        <Card>
          {classes.length === 0
            ? <p className='text-xs text-text-muted text-center py-4'>Visit GPA Calculator to load your courses</p>
            : classes.map((cls, i) => (
              <div
                key={i}
                className='flex items-center justify-between border-b border-border-strong p-2 last:border-0'
              >
                <label className='text-sm text-text-primary font-medium'>{cls.name}</label>
                <span className={`text-xs font-medium py-0.5 px-2 rounded-full ${gradeColor(cls.grade)}`}>
                  {cls.grade}
                </span>
              </div>
            ))
          }
        </Card>
      </div>
    </div>
  )
}
