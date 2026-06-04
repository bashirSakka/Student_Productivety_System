import { useState } from 'react'
import Pill from '../ui/Pill'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import { IconCalendar } from '@tabler/icons-react'
import emptyTasks from '../animations/noData.json'
const stats = [
  { label: 'Done', value: 5, color: 'text-sage-dark' },
  { label: 'Left', value: 5, color: 'text-sage-dark' },
  { label: 'Late', value: 5, color: 'text-red-700' }
]

export default function Tasks () {
  const [form, setForm] = useState({ label: '', tag: '', due: '' })
  const [display, setDisplay] = useState(false)
  // const handleSubmit = (field, value) => {
  //
  // }
  function handleSubmit (e) {
    e.preventDefault()
    if (!form.label.trim()) return
    setTasks([...tasks, { ...form, id: Date.now(), done: false }])
    setForm({ label: '', tag: '', due: '' })
  }

  const [tasks, setTasks] = useState([])

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-family-display font-medium'>Tasks</h2>
      <p className='text-text-muted text-xs'>Stay on top of your work.</p>
      <div className='w-full rounded-[10px] bg-sage-light p-3 flex items-center mt-6'>
        <div className='flex-1 flex flex-col gap-1'>
          <div className='flex justify-between text-xs text-sage-dark'>
            <span>Today's Progress</span>
            <span>47%</span>
          </div>
          <div className='w-full bg-white h-2 rounded-md'>
            <div className='bg-sage rounded-md w-[47%] h-full' />
          </div>
        </div>
        <div className='flex gap-4 ml-6'>
          {stats.map(({ label, value, color }) => (
            <div key={label} className={`text-center ${color}`}>
              <p className='text-sm font-medium'>{value}</p>
              <p className='text-[11px]'>{label}</p>
            </div>
          ))}
        </div>
      </div>
      {tasks.map(task => (
        <Card key={task.id} className='mt-3'>
          <div className='flex flex-row gap-4'>
            <div className='group grid size-4 grid-cols-1 mt-0.5'>
              <input
                id={`task-${task.id}`}
                type='checkbox'
                checked={task.done}
                onChange={() =>
                  setTasks(
                    tasks.map(t =>
                      t.id === task.id ? { ...t, done: !t.done } : t
                    )
                  )
                }
                className='col-start-1 row-start-1 appearance-none rounded-full border border-gray-300 bg-white checked:border-sage-dark checked:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-dark cursor-pointer'
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
            <div className='flex-1'>
              <div
                className={`text-xs font-normal mb-2 ${
                  task.done ? 'line-through text-text-muted' : ''
                }`}
              >
                {task.label}
              </div>
              <div className='flex flex-row gap-2'>
                {task.tag && (
                  <div className='bg-sage-light w-fit font-normal text-xs py-0.5 px-2.25 rounded-[20px] text-sage-dark'>
                    {task.tag}
                  </div>
                )}
                {task.due && (
                  <div className='text-xs text-text-muted'>{task.due}</div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}

      <div
        className={`${
          !display ? 'hidden' : 'block'
        } bg-white  border-1 border-sage-light rounded-[10px] py-[10px] px-[14px] mt-2`}
      >
        <input
          type='text'
          value={form.label}
          onChange={e => setForm({ ...form, label: e.target.value })}
          className='w-full bg-transparent focus:outline-none text-xs font-family-body mb-3'
          placeholder='Task name... '
        />

        <div className='flex items-center mb-2 gap-2 border border-border-strong rounded-md px-3 py-1.5 bg-cream2 w-fit'>
          <IconCalendar size={14} className='text-text-muted shrink-0' />
          <input
            type='date'
            value={form.due}
            onChange={e => setForm({ ...form, due: e.target.value })}
            className='bg-transparent focus:outline-none text-xs font-family-body text-text-primary [&::-webkit-calendar-picker-indicator]:opacity-0'
          />
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
          <div className='flex flex-row gap-2'>
            {['Study', 'Project', 'HomeWork'].map(el => (
              <Pill
                key={el}
                className='cursor-pointer'
                onClick={() => setForm({ ...form, tag: el })}
              >
                <p>{el}</p>
              </Pill>
            ))}
          </div>
          <div className='flex flex-row gap-2'>
            <Button onClick={() => setDisplay(prev => !prev)}>Cancel</Button>
            <Button
              className='bg-sage-dark text-white'
              onClick={e => handleSubmit(e)}
            >
              Add task
            </Button>
          </div>
        </div>
      </div>
      {tasks.length === 0 && !display && (
        <div className='flex flex-col items-center justify-center py-10 text-center'>
          <div className='w-45'>
            <DotLottieReact data={emptyTasks} loop autoplay />
          </div>
          <p className='text-text-primary font-medium text-sm mt-2'>
            No tasks yet
          </p>
          <p className='text-text-muted text-xs mt-1'>
            Add your first task to get started
          </p>
        </div>
      )}

      {tasks.length > 0 && (
        <button
          onClick={() => setTasks([])}
          className='text-xs text-text-muted hover:text-red-500 transition-colors cursor-pointer mt-4'
        >
          Clear all
        </button>
      )}

      <button
        onClick={() => setDisplay(prev => !prev)}
        className={`${
          display ? 'hidden' : 'block'
        } flex  items-center  hover:bg-cream2 hover:border-solid hover:text-text-primary transition-colors duration-150
  transition duration-250 gap-2 py-2.5 px-3.5 rounded-[10px] border-[1.5px] border-dashed border-cream3 text-text-muted text-[13.5px] cursor-pointer bg-transparent font-family-body w-full mt-1`}
      >
        + Add a task...
      </button>
    </div>
  )
}
