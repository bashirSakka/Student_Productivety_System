import { useState, useEffect } from 'react'
import useGpaStore from '../../store/gpaStore'
import { IconCircleDashedX, IconPlus, IconLock } from '@tabler/icons-react'
import api from '../../lib/api'
import useAuthStore from '../../store/authStore'
import Card from '../ui/Card'

const LETTER_POINTS = { A: 4, B: 3, C: 2, D: 1, F: 0 }

const GRADE_STYLE = {
  A: { pill: 'bg-sage-light text-sage-dark', bar: 'bg-sage' },
  B: { pill: 'bg-sky-100 text-sky-400', bar: 'bg-sky' },
  C: { pill: 'bg-lavender-light text-lavender-dark', bar: 'bg-lavender' },
  D: { pill: 'bg-peach-light text-peach-dark', bar: 'bg-peach' },
  F: { pill: 'bg-peach text-peach-dark', bar: 'bg-peach-dark' }
}

let _id = 0
const newRow = () => ({
  id: `local-${++_id}`,
  name: '',
  grade: 'A',
  credits: 3,
  locked: false
})

export default function GPACalculator () {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userId = useAuthStore(state => state.id)

  useEffect(() => {
    async function fetchCompleted () {
      const { data } = await api.get('/api/courses')
      const completed = data
        .filter(c => c.status === 'completed')
        .map(c => ({
          id: `course-${c.id}`,
          name: c.name,
          grade: (() => {
            const raw =
              typeof c.grade === 'string' ? c.grade : c.grade?.letter ?? 'A'
            return Object.keys(LETTER_POINTS).includes(raw) ? raw : 'A'
          })(),
          credits: c.credits,
          semester: c.semester ?? null,
          locked: true
        }))

      setCourses(completed)
      setIsLoading(false)
    }
    if (userId) fetchCompleted()
  }, [userId])
  const [semester, setSemester] = useState('all')

  const semesters = [
    'all',
    ...new Set(courses.filter(c => c.semester).map(c => c.semester))
  ]

  function addCourse () {
    setCourses(prev => [
      ...prev,
      { ...newRow(), semester: semester === 'all' ? null : semester }
    ])
  }

  function update (id, field, value) {
    setCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  function remove (id) {
    setCourses(prev => prev.filter(c => c.id !== id))
  }

  const visibleCourses =
    semester === 'all'
      ? courses
      : courses.filter(
          c => c.semester === semester || (!c.locked && !c.semester)
        )

  const totalCredits = visibleCourses.reduce(
    (s, c) => s + Number(c.credits || 0),
    0
  )
  const totalPoints = visibleCourses.reduce(
    (s, c) => s + (LETTER_POINTS[c.grade] ?? 0) * Number(c.credits || 0),
    0
  )
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0
  const gpaPercent = (gpa / 4) * 100

  const setGpa         = useGpaStore(state => state.setGpa)
  const setStoreCourses = useGpaStore(state => state.setCourses)
  useEffect(() => { setGpa(gpa) }, [gpa, setGpa])
  useEffect(() => { setStoreCourses(courses) }, [courses, setStoreCourses])

  const gradeDist = Object.keys(LETTER_POINTS).map(g => ({
    grade: g,
    count: visibleCourses.filter(c => c.grade === g).length
  }))

  const stats = [
    { label: 'Total Credits', value: totalCredits },
    { label: 'Courses', value: visibleCourses.length },
    { label: 'Semester GPA', value: gpa.toFixed(2) },
    { label: 'Highest GPA', value: '4.00' }
  ]

  const [activeTab, setActiveTab] = useState('Courses')

  return (
    <div className='flex flex-col h-full font-family-display'>
      {/* Small-screen tabs */}
      <div className='flex gap-1 p-3 border-b border-border-strong lg:hidden'>
        {['Courses', 'Overview'].map(tab => (
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
      <div className={`flex-1 overflow-y-auto p-6 ${activeTab !== 'Courses' ? 'hidden lg:block' : ''}`}>
        <h2 className='text-2xl font-medium'>GPA Calculator</h2>
        <p className='text-text-muted text-xs mt-0.5'>
          Track your grades and calculate your GPA.
        </p>
        <div className='mt-5'>
          <div className='mb-4'>
            <select
              value={semester}
              onChange={e => setSemester(e.target.value)}
              className='text-xs bg-cream2 border border-border-strong rounded-md px-3 py-1.5 focus:outline-none focus:border-lavender-dark cursor-pointer capitalize'
            >
              {semesters.map(s => (
                <option key={s} value={s} className='capitalize'>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='rounded-[10px] border border-border-strong p-4 animate-pulse'>
                    <div className='h-3 bg-cream3 rounded w-2/3 mb-4' />
                    <div className='h-2.5 bg-cream3 rounded w-1/4 mb-2' />
                    <div className='flex gap-1 mb-3'>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className='w-7 h-7 bg-cream3 rounded-md' />
                      ))}
                    </div>
                    <div className='h-2.5 bg-cream3 rounded w-1/3' />
                  </div>
                ))
              : visibleCourses.map(course => {
              const pts =
                (LETTER_POINTS[course.grade] ?? 0) * Number(course.credits || 0)
              const style = GRADE_STYLE[course.grade] ?? GRADE_STYLE['A']
              return (
                <Card
                  key={course.id}
                  className={`flex flex-col gap-3 ${
                    course.locked ? 'bg-cream2' : ''
                  }`}
                >
                  <div className='flex items-start justify-between gap-2'>
                    {course.locked ? (
                      <p className='flex-1 text-sm font-medium text-text-primary'>
                        {course.name}
                      </p>
                    ) : (
                      <input
                        value={course.name}
                        onChange={e =>
                          update(course.id, 'name', e.target.value)
                        }
                        placeholder='Course name...'
                        className='flex-1 text-sm font-medium bg-transparent border-b border-border-strong focus:border-lavender-dark focus:outline-none placeholder:text-text-muted pb-0.5 transition-colors'
                      />
                    )}
                    {course.locked ? (
                      <IconLock
                        size={13}
                        stroke={2}
                        className='text-text-muted shrink-0'
                      />
                    ) : (
                      <button
                        onClick={() => remove(course.id)}
                        className='cursor-pointer text-text-muted hover:text-red-500 transition-colors shrink-0'
                      >
                        <IconCircleDashedX size={15} stroke={2} />
                      </button>
                    )}
                  </div>

                  <div className='flex flex-col gap-1'>
                    <span className='text-[11px] text-text-muted'>Grade</span>
                    {course.locked ? (
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md w-fit ${style.pill}`}
                      >
                        {course.grade}
                      </span>
                    ) : (
                      <div className='flex gap-1.5'>
                        {Object.keys(LETTER_POINTS).map(g => (
                          <button
                            key={g}
                            onClick={() => update(course.id, 'grade', g)}
                            className={`text-[11px] font-semibold w-7 h-7 rounded-md cursor-pointer border transition-all ${
                              course.grade === g
                                ? `${style.pill} border-transparent`
                                : 'bg-cream2 text-text-muted border-border-strong hover:bg-cream3'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1.5'>
                      <span className='text-[11px] text-text-muted'>
                        Credits
                      </span>
                      {course.locked ? (
                        <span className='text-xs font-medium'>
                          {course.credits}
                        </span>
                      ) : (
                        <input
                          type='number'
                          min={0}
                          max={9}
                          value={course.credits}
                          onChange={e =>
                            update(course.id, 'credits', e.target.value)
                          }
                          className='w-10 text-center text-xs bg-transparent border-b border-border-strong focus:border-lavender-dark focus:outline-none pb-0.5 transition-colors'
                        />
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${style.pill}`}
                    >
                      {pts} pts
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>


          <button
            onClick={addCourse}
            className='mt-3 flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer py-2'
          >
            <IconPlus size={14} stroke={2} />
            Add course
          </button>
        </div>
      </div>

      <div className={`w-full lg:w-72 lg:shrink-0 h-full overflow-y-auto lg:border-l border-border-strong p-4 flex flex-col gap-3 ${activeTab !== 'Overview' ? 'hidden lg:flex' : ''}`}>
        <div className='bg-cream2 rounded-md p-4 flex flex-col items-center'>
          <p className='text-[52px] font-normal leading-none mt-2'>
            {gpa.toFixed(2)}
          </p>
          <h2 className='text-xs text-text-muted uppercase mt-2 mb-3'>
            Semester GPA
          </h2>
          <div className='bg-cream3 w-full h-[6px] rounded-full'>
            <div
              className='h-full rounded-full bg-gradient-to-r from-sage to-sage-dark transition-all duration-500'
              style={{ width: `${gpaPercent.toFixed(1)}%` }}
            />
          </div>
          <div className='flex justify-between text-[10px] w-full text-text-muted mt-1'>
            {['0.0', '1.0', '2.0', '3.0', '4.0'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          {stats.map(s => (
            <div key={s.label} className='bg-cream2 rounded-md p-3'>
              <p className='text-[10px] text-text-muted uppercase mb-1'>
                {s.label}
              </p>
              <p className='text-xl font-medium'>{s.value}</p>
            </div>
          ))}
        </div>

        <Card>
          <p className='text-[10px] text-text-muted uppercase mb-3'>
            Grade distribution
          </p>
          {gradeDist.map(({ grade, count }) => (
            <div key={grade} className='flex items-center gap-2 mb-2'>
              <span
                className={`text-[11px] font-semibold w-4 ${
                  GRADE_STYLE[grade].pill.split(' ')[1]
                }`}
              >
                {grade}
              </span>
              <div className='flex-1 bg-cream3 h-[5px] rounded-full overflow-hidden'>
                <div
                  className={`h-full rounded-full ${GRADE_STYLE[grade].bar} transition-all duration-500`}
                  style={{
                    width: courses.length
                      ? `${(count / courses.length) * 100}%`
                      : '0%'
                  }}
                />
              </div>
              <span className='text-[10px] text-text-muted w-3 text-right'>
                {count}
              </span>
            </div>
          ))}
        </Card>
      </div>
      </div>
    </div>
  )
}
