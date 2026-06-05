import Card from '../ui/Card'

export default function Dashboard () {
  const hour = new Date().getHours()
  const classes = [
    { class: 'Math', grade: 'A', credits: 4 },
    { class: 'English', grade: 'B', credits: 3 },
    { class: 'Physics', grade: 'C', credits: 4 },
    { class: 'History', grade: 'A', credits: 3 },
    { class: 'Computer Science', grade: 'B', credits: 3 }
  ]
  const colorGrade = {
    A: 'bg-sage-light',
    B: 'bg-sky-light',
    C: 'bg-lavender-light',
    D: 'bg-red-light',
    F: 'bg-red-light'
  }

  const cardData = [
    {
      title: 'Current GPA',
      value: '3.8',
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
      value: '3 due',
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
            {[
              'Review lecture notes',
              'Submit assignment',
              'Study for exam',
              'Read chapter 4'
            ].map((task, i) => (
              <div
                key={i}
                className='flex items-center justify-between font-medium border-b border-border-strong p-2'
              >
                <div className='flex items-center gap-3'>
                  <div className='group grid size-4 grid-cols-1'>
                    <input
                      type='checkbox'
                      className='col-start-1 row-start-1 appearance-none rounded-sm border border-border-strong bg-cream checked:border-sage-dark checked:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark forced-colors:appearance-auto'
                    />
                    <svg
                      viewBox='0 0 14 14'
                      fill='none'
                      className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white'
                    >
                      <path
                        d='M3 8L6 11L11 3.5'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='opacity-0 group-has-checked:opacity-100'
                      />
                    </svg>
                  </div>
                  <label className='text-sm text-text-primary'>{task}</label>
                </div>
                <p className='text-xs text-text-muted'>2 hours ago</p>
              </div>
            ))}
          </Card>
        </div>
        <div className='flex flex-col'>
          <p className='text-[11px] text-text-muted uppercase tracking-[0.07em] mb-[5px]'>
            Pomodoro
          </p>
          <Card>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-[11px] text-text-muted uppercase tracking-[0.07em] mb-3'>
                Focus Session
              </p>
              <div className='flex mt-3 items-center justify-center w-[88px] h-[88px] rounded-full border-4 border-peach bg-peach-light text-[20px] font-family-display'>
                23:55
              </div>
              <p className='mt-4 text-xs text-text-secondary'>
                Data Structures - review
              </p>
              <div className='flex mt-4 gap-2'>
                <div className='w-[7px] h-[7px] bg-peach rounded-full'></div>
                <div className='w-[7px] h-[7px] bg-peach rounded-full'></div>
                <div className='w-[7px] h-[7px] bg-peach rounded-full'></div>
                <div className='w-[7px] h-[7px] bg-peach rounded-full'></div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className='flex flex-col w-150'>
        <p className='text-[11px] text-text-muted uppercase text-text-primary tracking-[0.07em] mb-[5px]'>
          gpa overview
        </p>
        <Card>
          {classes.map((cls, i) => (
            <div
              key={i}
              className='flex items-center justify-between border-b border-border-strong p-2'
            >
              <div className='flex items-center gap-3'>
                <label className='text-sm text-text-primary font-medium'>
                  {cls.class}
                </label>
              </div>
              {console.log(colorGrade[cls.grade])}
              <p
                className={`text-xs font-medium py-[2px] px-[8px] rounded-[99px] ${
                  colorGrade[cls.grade]
                }`}
              >
                {cls.grade}
              </p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
