import { useState } from 'react'
import Pill from '../ui/Pill'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Modal from '../ui/Modal'
import ConfirmModal from '../ui/ConfirmModal'
import EmptyState from '../ui/EmptyState'
import emptyTasks from '../animations/noData.json'
import useTaskStore from '../../store/taskStore'

import {
  IconTrash,
  IconCalendar,
  IconEdit,
  IconCirclePlus
} from '@tabler/icons-react'

const stats = [
  { label: 'Done', value: 5, color: 'text-sage-dark' },
  { label: 'Left', value: 5, color: 'text-sage-dark' },
  { label: 'Late', value: 5, color: 'text-red-700' }
]

export default function Tasks () {
  const tasks = useTaskStore(state => state.tasks)
  const TagColors = {
    Study: 'bg-peach-light text-peach-dark',
    Project: 'bg-lavender-light text-lavender-dark',
    HomeWork: 'bg-peach text-peach-dark'
  }

  const addTask = useTaskStore(state => state.addTask)
  const editTask = useTaskStore(state => state.editTask)
  const deleteTask = useTaskStore(state => state.deleteTask)
  const clearTasks = useTaskStore(state => state.clearTasks)
  const toggleTask = useTaskStore(state => state.toggleTask)

  const [form, setForm] = useState({ label: '', tag: '', due: '' })
  const [display, setDisplay] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [selected, setSelected] = useState(null)

  function openModal (type, task = null) {
    setSelected(task)
    setActiveModal(type)
    if (type === 'edit' && task)
      setForm({ label: task.label, tag: task.tag, due: task.due })
  }
  function closeModal () {
    setActiveModal(null)
    setSelected(null)
    setForm({ label: '', tag: '', due: '' })
  }
  function handleEdit (e) {
    e.preventDefault()
    if (!form.label.trim()) return
    editTask(selected.id, form)
    closeModal()
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (!form.label.trim()) return

    addTask(form)
    setForm({ label: '', tag: '', due: '' })
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-family-display font-medium'>Tasks</h2>
          <p className='text-text-muted text-xs'>Stay on top of your work.</p>
        </div>
        <div className='flex gap-2'>
          {tasks.length > 0 && (
            <Button
              onClick={() => clearTasks()}
              className='text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition duration-250'
            >
              Clear all
            </Button>
          )}
          <Button onClick={() => setDisplay(prev => !prev)}>
            Add Task <IconCirclePlus className='ml-1' />
          </Button>
        </div>
      </div>
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
      <div
        className={`${
          !display ? 'hidden' : 'block'
        } bg-white border-1 border-sage-light rounded-[10px] py-[10px] px-[14px] mt-4`}
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
                onClick={() => setForm({ ...form, tag: el })}
                className={`cursor-pointer transition-all  border-1 border-border-strong ${
                  form.tag == el ? `  ${TagColors[el]}` : ''
                }`}
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

      {tasks.map(task => (
        <Card key={task.id} className='mt-3'>
          <div className='flex flex-row gap-4'>
            <div className='group grid size-4 grid-cols-1 mt-0.5'>
              <input
                id={`task-${task.id}`}
                type='checkbox'
                checked={task.done}
                onChange={() => toggleTask(task.id)}
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
                className={`text-xs font-primary mb-2 ${
                  task.done ? 'line-through text-text-muted' : ''
                }`}
              >
                {task.label}
              </div>
              <div className='flex flex-row  justify-between items-center'>
                <div className=' flex flex-row gap-2'>
                  {task.tag && (
                    <div
                      className={`w-fit font-normal text-xs py-0.5 px-2.25 rounded-[20px] ${
                        TagColors[task.tag]
                      }`}
                    >
                      {task.tag}
                    </div>
                  )}
                  {task.due && (
                    <div className='text-xs text-text-muted'>{task.due}</div>
                  )}
                </div>
                <div className='flex flex-row gap-2'>
                  <button onClick={() => openModal('edit', task)}>
                    <IconEdit
                      size={25}
                      className='text-text-muted hover:text-sky-800 cursor-pointer'
                    />
                  </button>
                  <button onClick={() => openModal('delete', task)}>
                    <IconTrash
                      size={25}
                      className='text-text-muted hover:text-red-500 cursor-pointer'
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {tasks.length === 0 && !display && (
        <EmptyState
          animation={emptyTasks}
          title='No tasks yet'
          subtitle='Add your first task to get started'
        />
      )}

      <Modal
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        header='Edit Task'
      >
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label className='text-[11px] text-text-muted'>Task name</label>
            <input
              value={form.label}
              onChange={e => setForm({ ...form, label: e.target.value })}
              placeholder='Task name...'
              className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[11px] text-text-muted'>Due date</label>
            <div className='flex items-center gap-2 border border-border-strong rounded-md px-3 py-1.5 bg-cream2 w-fit'>
              <IconCalendar size={14} className='text-text-muted shrink-0' />
              <input
                type='date'
                value={form.due}
                onChange={e => setForm({ ...form, due: e.target.value })}
                className='bg-transparent focus:outline-none text-xs text-text-primary [&::-webkit-calendar-picker-indicator]:opacity-0'
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[11px] text-text-muted'>Tag</label>
            <div className='flex gap-2'>
              {['Study', 'Project', 'HomeWork'].map(el => (
                <Pill
                  key={el}
                  className={`cursor-pointer ${
                    form.tag === el ? 'bg-sage-light text-sage-dark' : ''
                  }`}
                  onClick={() => setForm({ ...form, tag: el })}
                >
                  {el}
                </Pill>
              ))}
            </div>
          </div>
          <div className='flex justify-end gap-2 mt-1'>
            <button
              onClick={closeModal}
              className='text-xs px-4 py-1.5 rounded-md border border-border-strong text-text-primary hover:bg-cream2 transition-colors cursor-pointer'
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className='text-xs px-4 py-1.5 rounded-md bg-sage-dark text-white hover:bg-sage transition-colors cursor-pointer'
            >
              Save changes
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        onConfirm={() => {
          deleteTask(selected?.id)
          closeModal()
        }}
        title='Delete Task?'
        message={`"${selected?.label}" will be permanently removed.`}
      />
    </div>
  )
}
