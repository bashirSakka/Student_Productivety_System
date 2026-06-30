import { useState, useEffect } from 'react'
import api from '../../lib/api'
import useAuthStore from '../../store/authStore'
import {
  IconZoom,
  IconEdit,
  IconTrash,
  IconArrowLeft,
  IconArrowRight,
  IconPin,
  IconPinnedFilled
} from '@tabler/icons-react'
import EmptyState from '../ui/EmptyState'
import emptyTasks from '../../assets/animations/noData.json'
import Modal from '../ui/Modal'
import ConfirmModal from '../ui/ConfirmModal'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { toast } from 'sonner'

export default function Notes () {
  const [notes, setNotes] = useState([])
  const [open, setOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const userId = useAuthStore(state => state.id)

  useEffect(() => {
    async function fetchNotes () {
      const resp = await api.get(
        `/api/notes?user_id=${userId}&page=${pageNumber}`
      )
      setNotes(resp.data.data)
      setLastPage(resp.data.last_page ?? 1)
      setIsLoading(false)
    }
    if (userId) fetchNotes()
  }, [userId, pageNumber])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const [form, setForm] = useState({
    title: '',
    content: '',
    course_tag: '',
    color: 'bg-lavender'
  })

  const [activeTab, setActiveTab] = useState('Notes')
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    course_tag: '',
    color: 'bg-lavender'
  })

  const filteredNotes = search.trim()
    ? notes.filter(
        n =>
          n.title?.toLowerCase().includes(search.toLowerCase()) ||
          n.content?.toLowerCase().includes(search.toLowerCase()) ||
          n.course?.toLowerCase().includes(search.toLowerCase())
      )
    : notes

  const close = () => setOpen(false)

  async function handleSubmit () {
    if (!form.title.trim()) return
    const { data } = await api.post('/api/note', {
      ...form,
      user_id: userId,
      pinned: false
    })
    setNotes(prev => [...prev, data])
    setForm({ title: '', content: '', course_tag: '', color: 'bg-lavender' })
    toast.success('Note created')
    close()
  }

  function openEdit (note) {
    setEditForm({
      title: note.title,
      content: note.content,
      course_tag: note.course,
      color: note.color
    })
    setEditOpen(true)
  }
  async function handleEdit () {
    if (!editForm.title.trim()) return
    const note = selected ?? notes.at(-1)

    const resp = await api.patch(`/api/note/${note.id}`, editForm)
    console.log(resp)
    const merged = { ...editForm, course: editForm.course_tag }
    setNotes(prev =>
      prev.map(n => (n.id === note.id ? { ...n, ...merged } : n))
    )
    if (selected) setSelected(prev => ({ ...prev, ...merged }))
    toast.success('Note updated')
    setEditOpen(false)
  }

  async function handlePin (note) {
    const pinned = !note.pinned
    await api.patch(`/api/note/${note.id}`, { pinned })
    setNotes(prev => prev.map(n => (n.id === note.id ? { ...n, pinned } : n)))
    if (selected?.id === note.id) setSelected(prev => ({ ...prev, pinned }))
  }

  async function handleDelete () {
    const note = selected ?? notes.at(-1)
    await api.delete(`/api/note/${note.id}`)
    setNotes(prev => prev.filter(n => n.id !== note.id))
    setSelected(null)
    toast.success('Note deleted')
    setDeleteOpen(false)
  }

  return (
    <div className='flex flex-col h-full'>
      {/* Small-screen tabs */}
      <div className='flex gap-1 p-3 border-b border-border-strong lg:hidden'>
        {['Notes', 'View'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-xs px-4 py-1.5 rounded-md border cursor-pointer transition-colors ${
              activeTab === tab
                ? 'bg-lavender-dark text-white border-lavender-dark'
                : 'border-border-strong text-text-muted hover:bg-cream2'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='flex flex-1 overflow-hidden'>
      <div className={`flex-1 overflow-y-auto p-6 ${activeTab !== 'View' ? 'hidden lg:block' : ''}`}>
        {isLoading ? null : notes.length === 0 ? (
          <EmptyState
            animation={emptyTasks}
            title='No notes yet'
            subtitle='Add your first note to get started'
          />
        ) : (
          (() => {
            const note = selected ?? notes.at(-1)
            return (
              <div className='w-full lg:max-w-2xl'>
                <div className='flex items-center justify-between mb-4'>
                  <span
                    className={`${note.color} inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full`}
                  >
                    {note.course || 'untagged'}
                  </span>
                  <div className='flex gap-1'>
                    <button
                      onClick={() => openEdit(note)}
                      className='p-1.5 rounded-md hover:bg-cream2 transition-colors cursor-pointer'
                    >
                      <IconEdit size={30} stroke={2} color='blue' />
                    </button>
                    <button
                      onClick={() => setDeleteOpen(true)}
                      className='p-1.5 rounded-md hover:bg-cream2 transition-colors cursor-pointer'
                    >
                      <IconTrash size={30} stroke={2} color='red' />
                    </button>
                  </div>
                </div>
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

      <div className={`w-full lg:w-72 lg:shrink-0 h-full flex flex-col lg:border-l border-border-strong p-2 ${activeTab !== 'Notes' ? 'hidden lg:flex' : ''}`}>
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
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='rounded-[10px] border border-border-strong p-3 animate-pulse'>
                  <div className='h-2.5 bg-cream3 rounded w-3/4 mb-2' />
                  <div className='h-2 bg-cream3 rounded w-full mb-1' />
                  <div className='h-2 bg-cream3 rounded w-2/3' />
                </div>
              ))
            : filteredNotes.map(el => (
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
              onClick={() => { setSelected(el); setActiveTab('View') }}
            >
              <div className='flex items-center justify-between mt-2'>
                <div
                  className={`${el.color} rounded-[99px] font-medium text-[10px] w-fit py-px px-1.75`}
                >
                  {el.course}
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    handlePin(el)
                  }}
                  className='p-0.5 rounded cursor-pointer hover:bg-cream2 transition-colors'
                >
                  {el.pinned ? (
                    <IconPinnedFilled
                      size={13}
                      className='text-lavender-dark'
                    />
                  ) : (
                    <IconPin size={13} className='text-text-muted' />
                  )}
                </button>
              </div>
            </Card>
          ))}
          {!isLoading && filteredNotes.length === 0 && (
            <p className='text-xs text-text-muted text-center mt-4'>
              {search.trim() ? 'No matches found' : 'No notes yet'}
            </p>
          )}
        </div>

        <div className='flex items-center justify-between mx-3 mt-2 mb-1'>
          <button
            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
            disabled={pageNumber === 1}
            className='p-1.5 rounded-md border border-border-strong text-text-muted hover:bg-cream2 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors'
          >
            <IconArrowLeft size={14} stroke={2} />
          </button>
          <span className='text-xs text-text-muted'>
            {pageNumber} / {lastPage}
          </span>
          <button
            onClick={() => setPageNumber(p => Math.min(lastPage, p + 1))}
            disabled={pageNumber === lastPage}
            className='p-1.5 rounded-md border border-border-strong text-text-muted hover:bg-cream2 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors'
          >
            <IconArrowRight size={14} stroke={2} />
          </button>
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
                value={form.course_tag}
                onChange={e => setForm({ ...form, course_tag: e.target.value })}
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

        <Modal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          header='Edit note'
        >
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] text-text-muted'>Title</label>
              <input
                value={editForm.title}
                onChange={e =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] text-text-muted'>Content</label>
              <textarea
                value={editForm.content}
                onChange={e =>
                  setEditForm({ ...editForm, content: e.target.value })
                }
                rows={4}
                className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark resize-none'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] text-text-muted'>Course tag</label>
              <input
                value={editForm.course}
                onChange={e =>
                  setEditForm({ ...editForm, course: e.target.value })
                }
                className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
              />
            </div>
            <div className='flex justify-end gap-2 mt-1'>
              <button
                onClick={() => setEditOpen(false)}
                className='text-xs px-4 py-1.5 rounded-md border border-border-strong text-text-primary hover:bg-cream2 transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className='text-xs px-4 py-1.5 rounded-md bg-lavender-dark text-white hover:opacity-90 transition-opacity cursor-pointer'
              >
                Save changes
              </button>
            </div>
          </div>
        </Modal>

        <ConfirmModal
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
          title='Delete note?'
          message='This note will be permanently removed. This cannot be undone.'
        />
      </div>
      </div>
    </div>
  )
}
