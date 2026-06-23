import Card from '../ui/Card'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import ConfirmModal from '../ui/ConfirmModal'
import FormInput from '../ui/FormInput'
import { IconTrash, IconEdit, IconCirclePlus } from '@tabler/icons-react'
import { useState } from 'react'

const colorMap = {
  'bg-sage': {
    borderColor: 'border-l-sage',
    gradeClass: 'bg-sage-light text-sage-dark'
  },
  'bg-lavender': {
    borderColor: 'border-l-lavender',
    gradeClass: 'bg-lavender-light text-lavender-dark'
  },
  'bg-peach': {
    borderColor: 'border-l-peach',
    gradeClass: 'bg-peach-light text-peach-dark'
  },
  'bg-sky': {
    borderColor: 'border-l-sky',
    gradeClass: 'bg-sky-light text-sky'
  },
  'bg-cream3': {
    borderColor: 'border-l-cream3',
    gradeClass: 'bg-cream3 text-text-primary'
  }
}

function letterFromPercent (p) {
  if (p >= 90) return 'A'
  if (p >= 80) return 'B'
  if (p >= 70) return 'C'
  if (p >= 60) return 'D'
  return 'F'
}

const initialCourses = [
  {
    code: 'CS 301',
    name: 'Data Structures & Algorithms',
    instructor: 'Dr. Soha Farhat',
    grade: { letter: 'A', percent: 90 },
    credits: 3,
    color: 'bg-sage',
    borderColor: 'border-l-sage',
    gradeClass: 'bg-sage-light text-sage-dark'
  },
  {
    code: 'MATH 201',
    name: 'Linear Algebra',
    instructor: 'Dr. Khalil Mansour',
    grade: { letter: 'B+', percent: 87 },
    credits: 3,
    color: 'bg-lavender',
    borderColor: 'border-l-lavender',
    gradeClass: 'bg-lavender-light text-lavender-dark'
  }
]

const emptyForm = {
  code: '',
  name: '',
  instructor: '',
  percent: '',
  credits: '',
  color: 'bg-sage'
}

const actions = [
  { type: 'create', icons: IconCirclePlus, card: false },
  { type: 'edit', icons: IconEdit, card: true, color: 'blue' },
  { type: 'delete', icons: IconTrash, card: true, color: 'red' }
]

export default function Courses () {
  const [courseList, setCourseList] = useState(initialCourses)
  const [activeModal, setActiveModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)

  function openModal (type, course = null) {
    setSelected(course)
    setActiveModal(type)
    if (type === 'edit' && course) {
      setForm({
        code: course.code,
        name: course.name,
        instructor: course.instructor,
        percent: course.grade.percent,
        credits: course.credits,
        color: course.color
      })
    }
  }

  function closeModal () {
    setActiveModal(null)
    setSelected(null)
    setForm(emptyForm)
  }

  function handleSave () {
    if (!form.code.trim() || !form.name.trim()) return
    const { borderColor, gradeClass } = colorMap[form.color]
    const percent = Number(form.percent)
    const course = {
      code: form.code,
      name: form.name,
      instructor: form.instructor,
      grade: { letter: letterFromPercent(percent), percent },
      credits: Number(form.credits),
      color: form.color,
      borderColor,
      gradeClass
    }
    if (activeModal === 'create') {
      setCourseList(prev => [...prev, course])
    } else {
      setCourseList(prev =>
        prev.map(c => (c.code === selected.code ? course : c))
      )
    }
    closeModal()
  }

  function handleDelete () {
    setCourseList(prev => prev.filter(c => c.code !== selected?.code))
    closeModal()
  }

  return (
    <div className='p-6'>
      <div className='flex flex-row justify-between'>
        <div>
          <h2 className='text-2xl font-family-display font-medium'>Courses</h2>
          <p className='text-text-muted'>
            This is where your courses will be displayed.
          </p>
        </div>
        <Button
          onClick={() => openModal('create')}
          className='h-fit bg-lavender-light text-lavender-dark hover:bg-lavender-hover transition-colors duration-200'
        >
          Add course{' '}
          <IconCirclePlus stroke={2} className='ml-1 cursor-pointer' />
        </Button>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6'>
        {['Courses', 'Credit hours', 'Current GPA', 'Completed'].map(el => (
          <Card key={el} header={el} body='4' className='bg-cream2' />
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6'>
        {courseList.map(el => (
          <Card
            key={el.code}
            header={el.code}
            body={el.name}
            bodyClass='text-[13.5px]/[1.4] mt-3 font-medium font-family-display'
            className={`border-l-4 ${el.borderColor}`}
          >
            <div className='flex mt-3 mb-3 items-center text-xs text-text-3'>
              {el.instructor}
            </div>
            <div className='border-t pt-2 border-cream3 flex flex-row justify-between items-center'>
              <div
                className={`font-medium w-fit ${el.gradeClass} rounded-md text-[11px] py-0.5 px-2`}
              >
                {el.grade.letter} <span>- {el.grade.percent}</span>
              </div>
              <div className='flex flex-row gap-2'>
                {actions
                  .filter(a => a.card)
                  .map(a => (
                    <button key={a.type} onClick={() => openModal(a.type, el)}>
                      <a.icons
                        color={a.color}
                        stroke={2}
                        className='cursor-pointer'
                      />
                    </button>
                  ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={activeModal === 'create' || activeModal === 'edit'}
        onClose={closeModal}
        header={activeModal === 'edit' ? 'Edit Course' : 'Create Course'}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex gap-3'>
            <FormInput
              label='Course code'
              value={form.code}
              onChange={e => setForm({ ...form, code: e.target.value })}
              placeholder='e.g. CS 301'
              className='flex-1 focus:border-lavender-dark'
            />
            <FormInput
              label='Credits'
              value={form.credits}
              onChange={e => setForm({ ...form, credits: e.target.value })}
              placeholder='3'
              className='w-24 focus:border-lavender-dark'
            />
          </div>

          <FormInput
            label='Course name'
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder='e.g. Data Structures'
            className='focus:border-lavender-dark'
          />

          <div className='flex gap-3'>
            <FormInput
              label='Instructor'
              value={form.instructor}
              onChange={e => setForm({ ...form, instructor: e.target.value })}
              placeholder='Dr. ...'
              className='flex-1 focus:border-lavender-dark'
            />
            <FormInput
              label='Current grade (%)'
              value={form.percent}
              onChange={e => setForm({ ...form, percent: e.target.value })}
              placeholder='0'
              className='flex-1 focus:border-lavender-dark'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-[11px] text-text-muted'>Accent color</label>
            <div className='flex gap-2'>
              {Object.keys(colorMap).map(color => (
                <button
                  key={color}
                  onClick={() => setForm({ ...form, color })}
                  className={`w-6 h-6 rounded-full ${color} border-2 cursor-pointer transition-all ${
                    form.color === color
                      ? 'border-text-primary scale-110'
                      : 'border-transparent'
                  }`}
                />
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
              onClick={handleSave}
              className='text-xs px-4 py-1.5 rounded-md bg-lavender-dark text-white hover:opacity-90 transition-opacity cursor-pointer'
            >
              {activeModal === 'edit' ? 'Save changes' : 'Save course'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        onConfirm={handleDelete}
        title='Delete Course?'
        message={`"${selected?.name}" will be permanently removed. This cannot be undone.`}
      />
    </div>
  )
}
