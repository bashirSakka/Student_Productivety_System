import { useState } from 'react'
import { IconZoom } from '@tabler/icons-react'
import EmptyState from '../ui/EmptyState'
import emptyTasks from '../../assets/animations/noData.json'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function Notes () {
  const [notes, setNotes] = useState([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const [form, setForm] = useState({
    title: '',
    content: '',
    course: '',
    color: 'bg-lavender'
  })

  const close = () => setOpen(false)

  function handleSubmit () {
    if (!form.title.trim()) return
    setNotes([...notes, { ...form, id: Date.now() }])
    setForm({ title: '', content: '', course: '', color: 'bg-lavender' })
    close()
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='col-span-2 p-6'>
        {notes.length === 0 ? (
          <EmptyState
            animation={emptyTasks}
            title='No notes yet'
            subtitle='Add your first note to get started'
          />
        ) : (
          (() => {
            const note = selected ?? notes.at(-1)
            return (
              <div className='max-w-2xl'>
                <span
                  className={`${note.color} inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-4`}
                >
                  {note.course || 'untagged'}
                </span>
                <h1 className='font-serif font-bold text-[28px] leading-[1.2] tracking-[-0.02em] text-text-primary mb-4'>
                  {note.title}
                </h1>
                <div className='border-t border-border-strong mb-5' />
                <p className='text-sm text-text-secondary leading-[1.75] whitespace-pre-wrap'>
                  {note.content}
                </p>
              </div>
            )
          })()
        )}
      </div>

      <div className='h-screen p-2 flex flex-col col-span-1 border-l border-border-strong'>
        <div className='p-3'>
          <h2 className='text-2xl font-family-display font-medium mb-4'>
            Notes
          </h2>
          <div className='flex items-center border border-border-strong bg-cream2 rounded-[6px] gap-1 p-2'>
            <IconZoom stroke={2} size={16} />
            <input
              type='text'
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder='Search your notes...'
              className='ml-1 w-full focus:outline-none text-xs bg-transparent'
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 px-3 flex-1 overflow-y-auto'>
          {notes.map(el => (
            <Card
              key={el.id}
              header={el.title}
              headerClass='text-xs font-medium text-primary'
              body={
                el.content?.slice(0, 80) + (el.content?.length > 80 ? '…' : '')
              }
              bodyClass='text-xs text-text-3'
              className={`cursor-pointer transition-colors duration-150 ${
                selected?.id === el.id ? 'border-lavender-dark' : ''
              }`}
              onClick={() => setSelected(el)}
            >
              <div
                className={`${el.color} rounded-[99px] font-medium text-[10px] w-fit py-px px-1.75 mt-2`}
              >
                {el.course}
              </div>
            </Card>
          ))}
          {notes.length === 0 && (
            <EmptyState
              animation={emptyTasks}
              title='No notes yet'
              subtitle='Add your first note to get started'
            />
          )}
        </div>

        <Button
          onClick={() => setOpen(true)}
          className='mx-3 mb-3 mt-2 bg-primary text-white border-none text-[13px] font-medium cursor-pointer flex items-center justify-center gap-1.5'
        >
          + New note
        </Button>

        <Modal isOpen={open} onClose={close} header='New note'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] text-text-muted'>Title</label>
              <input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder='e.g. Lecture 4 – Recursion'
                className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-[11px] text-text-muted'>Content</label>
              <textarea
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder='Write your note...'
                rows={4}
                className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark resize-none'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-[11px] text-text-muted'>Course tag</label>
              <input
                value={form.course}
                onChange={e => setForm({ ...form, course: e.target.value })}
                placeholder='e.g. CS 301'
                className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-[11px] text-text-muted'>
                Accent color
              </label>
              <div className='flex gap-2'>
                {[
                  'bg-sage',
                  'bg-lavender',
                  'bg-peach',
                  'bg-sky',
                  'bg-cream3'
                ].map(color => (
                  <button
                    key={color}
                    onClick={() => setForm({ ...form, color })}
                    className={`w-6 h-6 rounded-full ${color} cursor-pointer transition-all ${
                      form.color === color
                        ? 'ring-2 ring-offset-1 ring-text-muted'
                        : 'border-2 border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className='flex justify-end gap-2 mt-1'>
              <button
                onClick={close}
                className='text-xs px-4 py-1.5 rounded-md border border-border-strong text-text-primary hover:bg-cream2 transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className='text-xs px-4 py-1.5 rounded-md bg-lavender-light text-lavender-dark hover:bg-lavender transition-colors cursor-pointer'
              >
                Save note
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
