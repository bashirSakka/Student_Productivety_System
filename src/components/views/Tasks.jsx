import { useState, useEffect, useMemo } from 'react'
import Pill from '../ui/Pill'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Modal from '../ui/Modal'
import ConfirmModal from '../ui/ConfirmModal'
import EmptyState from '../ui/EmptyState'
import emptyTasks from '../../assets/animations/noData.json'
import { taskService } from '../../services/taskService'
import useAuthStore from '../../store/authStore'
import useTaskStore from '../../store/taskStore'
import { toast } from 'sonner'

import {
  IconTrash,
  IconCalendar,
  IconEdit,
  IconCirclePlus
} from '@tabler/icons-react'

const PRIORITY_COLORS = {
  low:    'bg-sage-light text-sage-dark',
  medium: 'bg-peach-light text-peach-dark',
  high:   'bg-peach text-peach-dark'
}

const emptyForm = { title: '', description: '', due_at: '', priority: 'medium' }

export default function Tasks () {
  const userId = useAuthStore(state => state.id)
  const setStoreTasks = useTaskStore(state => state.setTasks)
  const [tasks, setTasks] = useState([])

  useEffect(() => { setStoreTasks(tasks) }, [tasks, setStoreTasks])

  const [form, setForm] = useState(emptyForm)
  const [display, setDisplay] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks () {
      const { data } = await taskService.getAll(userId)
      setTasks(data)
      setIsLoading(false)
    }
    if (userId) fetchTasks()
  }, [userId])

  const isLate = t => t.status !== 'completed' && t.due_at && new Date(t.due_at) < new Date()

  const doneCount = tasks.filter(t => t.status === 'completed').length
  const lateCount = tasks.filter(isLate).length
  const progress  = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchStatus =
        statusFilter === 'all'  ? true :
        statusFilter === 'done' ? t.status === 'completed' :
        statusFilter === 'late' ? isLate(t) :
        statusFilter === 'left' ? t.status !== 'completed' : true

      const matchPriority =
        priorityFilter === 'all' ? true : t.priority === priorityFilter

      return matchStatus && matchPriority
    })
  }, [tasks, statusFilter, priorityFilter])

  const stats = [
    { label: 'Done', value: doneCount,                  color: 'text-sage-dark' },
    { label: 'Left', value: tasks.length - doneCount,   color: 'text-sage-dark' },
    { label: 'Late', value: lateCount,                  color: 'text-red-700'   }
  ]

  function openModal (type, task = null) {
    setSelected(task)
    setActiveModal(type)
    if (type === 'edit' && task)
      setForm({
        title:       task.title ?? '',
        description: task.description ?? '',
        due_at:      task.due_at ?? '',
        priority:    task.priority ?? 'medium'
      })
  }

  function closeModal () {
    setActiveModal(null)
    setSelected(null)
    setForm(emptyForm)
  }

  async function handleSubmit (e) {
    e.preventDefault()
    if (!form.title.trim()) return
    const { data } = await taskService.create({ ...form, user_id: userId, status: 'pending' })
    setTasks(prev => [...prev, data])
    setForm(emptyForm)
    setDisplay(false)
    toast.success('Task added')
  }

  async function handleEdit (e) {
    e.preventDefault()
    if (!form.title.trim()) return
    await taskService.update(selected.id, form)
    setTasks(prev => prev.map(t => t.id === selected.id ? { ...t, ...form } : t))
    toast.success('Task updated')
    closeModal()
  }

  async function handleDelete () {
    await taskService.remove(selected.id)
    setTasks(prev => prev.filter(t => t.id !== selected.id))
    toast.success('Task deleted')
    closeModal()
  }

  async function handleToggle (task) {
    const status = task.status === 'completed' ? 'pending' : 'completed'
    const completed_at = status === 'completed' ? new Date().toISOString() : null
    await taskService.update(task.id, { status, completed_at })
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status, completed_at } : t))
  }

  async function handleClearAll () {
    await Promise.all(tasks.map(t => taskService.remove(t.id)))
    setTasks([])
    toast.success('All tasks cleared')
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
              onClick={handleClearAll}
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
            <span>{progress}%</span>
          </div>
          <div className='w-full bg-white h-2 rounded-md'>
            <div
              className='bg-sage rounded-md h-full transition-all duration-500'
              style={{ width: `${progress}%` }}
            />
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

      <div className='flex flex-wrap gap-4 mt-4'>
        <div className='flex gap-1.5'>
          {['all', 'left', 'done', 'late'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs px-3 py-1 rounded-md border capitalize cursor-pointer transition-colors ${
                statusFilter === s
                  ? s === 'late'
                    ? 'bg-red-100 text-red-600 border-red-300'
                    : 'bg-lavender-dark text-white border-lavender-dark'
                  : 'border-border-strong text-text-muted hover:bg-cream2'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className='flex gap-1.5'>
          {['all', ...Object.keys(PRIORITY_COLORS)].map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`text-xs px-3 py-1 rounded-md border capitalize cursor-pointer transition-colors ${
                priorityFilter === p
                  ? 'bg-lavender-dark text-white border-lavender-dark'
                  : 'border-border-strong text-text-muted hover:bg-cream2'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`${
          !display ? 'hidden' : 'block'
        } bg-white border border-sage-light rounded-[10px] py-2.5 px-3.5 mt-4`}
      >
        <input
          type='text'
          value={form.title ?? ''}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className='w-full bg-transparent focus:outline-none text-xs font-family-body mb-3'
          placeholder='Task title...'
        />
        <input
          type='text'
          value={form.description ?? ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className='w-full bg-transparent focus:outline-none text-xs font-family-body text-text-muted mb-3'
          placeholder='Description (optional)'
        />
        <div className='flex items-center mb-2 gap-2 border border-border-strong rounded-md px-3 py-1.5 bg-cream2 w-fit'>
          <IconCalendar size={14} className='text-text-muted shrink-0' />
          <input
            type='date'
            value={form.due_at ?? ''}
            onChange={e => setForm({ ...form, due_at: e.target.value })}
            className='bg-transparent focus:outline-none text-xs font-family-body text-text-primary [&::-webkit-calendar-picker-indicator]:opacity-0'
          />
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
          <div className='flex flex-row gap-2'>
            {Object.keys(PRIORITY_COLORS).map(p => (
              <Pill
                key={p}
                onClick={() => setForm({ ...form, priority: p })}
                className={`cursor-pointer transition-all border border-border-strong capitalize ${
                  form.priority === p ? PRIORITY_COLORS[p] : ''
                }`}
              >
                {p}
              </Pill>
            ))}
          </div>
          <div className='flex flex-row gap-2'>
            <Button onClick={() => setDisplay(false)}>Cancel</Button>
            <Button className='bg-sage-dark text-white' onClick={handleSubmit}>
              Add task
            </Button>
          </div>
        </div>
      </div>

      {filteredTasks.map(task => {
        const late = isLate(task)
        return (
        <Card key={task.id} className={`mt-3 border-l-4 ${late ? 'border-l-red-400' : 'border-l-transparent'}`}>
          <div className='flex flex-row gap-4'>
            <div className='group grid size-4 grid-cols-1 mt-0.5'>
              <input
                id={`task-${task.id}`}
                type='checkbox'
                checked={task.status === 'completed'}
                onChange={() => handleToggle(task)}
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
                className={`text-xs font-primary mb-1 ${
                  task.status === 'completed' ? 'line-through text-text-muted' : ''
                }`}
              >
                {task.title}
              </div>
              {task.description && (
                <p className='text-[11px] text-text-muted mb-2'>{task.description}</p>
              )}
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-2'>
                  {task.priority && (
                    <div
                      className={`w-fit font-normal text-xs py-0.5 px-2 rounded-[20px] capitalize ${
                        PRIORITY_COLORS[task.priority]
                      }`}
                    >
                      {task.priority}
                    </div>
                  )}
                  {task.due_at && (
                    <div className='flex items-center gap-1'>
                      <span className='text-xs text-text-muted'>{task.due_at}</span>
                      {late && <span className='text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-100 text-red-600'>Late</span>}
                    </div>
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
        )
      })}

      {isLoading && (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='mt-3 rounded-[10px] border border-border-strong p-4 animate-pulse'>
            <div className='flex gap-4'>
              <div className='w-4 h-4 rounded-full bg-cream3 mt-0.5 shrink-0' />
              <div className='flex-1 flex flex-col gap-2'>
                <div className='h-3 bg-cream3 rounded w-2/3' />
                <div className='h-2.5 bg-cream3 rounded w-1/3' />
              </div>
            </div>
          </div>
        ))
      )}

      {!isLoading && filteredTasks.length === 0 && !display && (
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
            <label className='text-[11px] text-text-muted'>Title</label>
            <input
              value={form.title ?? ''}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder='Task title...'
              className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[11px] text-text-muted'>Description</label>
            <input
              value={form.description ?? ''}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder='Optional...'
              className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[11px] text-text-muted'>Due date</label>
            <div className='flex items-center gap-2 border border-border-strong rounded-md px-3 py-1.5 bg-cream2 w-fit'>
              <IconCalendar size={14} className='text-text-muted shrink-0' />
              <input
                type='date'
                value={form.due_at ?? ''}
                onChange={e => setForm({ ...form, due_at: e.target.value })}
                className='bg-transparent focus:outline-none text-xs text-text-primary [&::-webkit-calendar-picker-indicator]:opacity-0'
              />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-[11px] text-text-muted'>Priority</label>
            <div className='flex gap-2'>
              {Object.keys(PRIORITY_COLORS).map(p => (
                <Pill
                  key={p}
                  className={`cursor-pointer capitalize ${
                    form.priority === p ? PRIORITY_COLORS[p] : ''
                  }`}
                  onClick={() => setForm({ ...form, priority: p })}
                >
                  {p}
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
        onConfirm={handleDelete}
        title='Delete Task?'
        message={`"${selected?.title}" will be permanently removed.`}
      />
    </div>
  )
}
