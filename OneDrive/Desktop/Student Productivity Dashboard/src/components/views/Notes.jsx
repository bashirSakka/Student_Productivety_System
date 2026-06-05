import { useState } from 'react'
import { IconZoom } from '@tabler/icons-react'
import EmptyState from '../ui/EmptyState'
import emptyTasks from '../animations/noData.json'

export default function Notes () {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])

  function handleSubmit (e) {
    e.preventDefault()
    if (note.trim() === '') return // add this
    setNotes([...notes, { id: Date.now(), text: note }])
    setNote('')
  }

  //   return (
  //   <div>
  //      <form onSubmit={(e)=>{
  //   handleSubmit(e);
  //    }}>
  //     <input type="text" value={note} onChange={(e)=>setNote(e.target.value)} />
  //     <button type="submit">Add Note</button>
  //    </form>
  //  {  notes.map((note) => (
  //     <div key={note.id}>
  //      <p>{note.text}</p>
  //     </div>
  //    ))}
  //   </div>

  // )
  return (
    <div
      className='grid grid-cols-1 
 sm:grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6  '
    >
      <div className='col-span-2 p-4'>
        {notes.length === 0 && (
          <EmptyState
            animation={emptyTasks}
            title='No notes yet'
            subtitle='Add your first note to get started'
          />
        )}
      </div>
      <div className=' h-screen p-2  flex flex-col col-span-1 border-l border-border-strong'>
        <div className='p-3'>
          <h2 className='text-2xl font-family-display font-medium mb-4'>
            Notes
          </h2>
          <div className='flex items-center border border-border-strong bg-cream2 rounded-[6px] gap-1 p-2'>
            <IconZoom stroke={2} size={16} />

            <input
              type='text'
              placeholder='search your history...'
              className='ml-1 flex items-center w-full focus:outline-none'
            />
          </div>
        </div>
        {notes.length === 0 && (
          <EmptyState
            animation={emptyTasks}
            title='No notes yet'
            subtitle='Add your first note to get started'
          />
        )}

        <button class='m-[10px] p-[9px] bg-primary text-white border-none rounded-[6px] text-[13px] font-medium font-family-body cursor-pointer flex items-center justify-center gap-[6px]'>
          + New note
        </button>
      </div>
    </div>
  )
}
