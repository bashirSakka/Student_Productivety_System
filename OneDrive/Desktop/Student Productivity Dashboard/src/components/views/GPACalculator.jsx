import { useState } from 'react'
import { IconCircleDashedX } from '@tabler/icons-react'
import { IconPlus } from '@tabler/icons-react'
import Card from '../ui/Card'
import Pill from '../ui/Pill'
export default function GPACalculator () {
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

  const john = [
    { class: 'Math', grade: 'A', credits: 4 },
    { class: 'English', grade: 'B', credits: 3 },
    { class: 'Physics', grade: 'C', credits: 4 },
    { class: 'History', grade: 'A', credits: 3 },
    { class: 'Computer Science', grade: 'B', credits: 3 }
  ]
  const letterGrades = [
    { name: 'A', points: 4 },
    { name: 'B', points: 3 },
    { name: 'C', points: 2 },
    { name: 'D', points: 1 },
    { name: 'F', points: 0 }
  ]
  const selectedBtn = 'bg-black text-white'
  let summation = 0
  let credits = 0
  john.forEach(course => {
    const grade = letterGrades.find(g => g.name === course.grade)
    summation += grade.points * course.credits
    credits += course.credits
  })
  const percentage = (summation / (credits * 4)) * 100

  const data = [
    {
      name: 'Total Credits',
      value: credits
    },
    {
      name: 'Courses',
      value: 4
    },
    {
      name: 'cumulative gpa',
      value: 3.5
    },
    {
      name: 'highest gpa',
      value: 4
    }
  ]
  const semesters = [
    {
      id: 'semester1',
      label: 'Semester 1'
    },
    {
      id: 'semester2',
      label: 'Semester 2'
    },
    {
      id: 'add',
      label: '+ Add'
    }
  ]

  const [selected, setSelected] = useState('semester1')

  return (
    <div className='p-6 font-family-display'>
      <h2 className='text-2xl font-family-display font-medium '>
        GPA Calculator
      </h2>
      <p className='text-text-muted text-xs'>
        Track your grades and calculate your GPA here.
      </p>

      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card className=' p-4 col-span-2'>
          <div className='flex flex-row mb-8 gap-2'>
            {semesters.map(key => (
              <Pill
                key={key.id}
                onClick={() => setSelected(key.id)}
                className={key.id === selected ? selectedBtn : 'hover:bg-cream2 cursor-pointer transition-colors duration-200'}
              >
                {key.label}
              </Pill>
            ))}
          </div>
          <div className='overflow-x-auto'>
            <table className=' table-fixed min-w-[600px]  w-full mt-4 [&_td]:pt-[11px] [&_td]:pr-[10px] [&_td]:pb-[11px] [&_td]:pl-0 [&_td]:border-b [&_td]:border-border-strong [&_td]:align-middle'>
              <thead>
                <tr className='border-b border-border-strong pb-3 text-text-3 text-[10px] uppercase font-medium'>
                  <th className='w-[40%] pb-[10px] pr-[10px] text-left '>
                    Courses
                  </th>
                  <th className='w-[15%] pb-[10px] pr-[10px] text-left'>
                    Grades
                  </th>
                  <th className='w-[15%] pb-[10px] pr-[10px] text-left'>
                    Credits
                  </th>
                  <th className='w-[15%] pb-[10px] pr-[10px] text-left'>
                    Points
                  </th>
                  <th className='w-[15%] pb-[10px] pr-[10px] '></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type='text'
                      value='Calculus II'
                      placeholder='Course Name'
                    />
                  </td>
                  <td>
                    {' '}
                    <div>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country-name'
                        className='bg-cream2 border cursor-pointer focus:outline-none focus:ring-0 focus:shadow-0 border-border-strong rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent'
                      >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>F</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <input
                      type='text'
                      value='4'
                      className='bg-cream2 border border-border-strong w-15 text-center rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-0 focus:border-transparent'
                    />
                  </td>
                  <td>4</td>
                  <td>
                    <IconCircleDashedX
                      stroke={2}
                      className='transition  duration-200 cursor-pointer hover:text-red-500'
                    />
                  </td>
                </tr>{' '}
                <tr>
                  <td>
                    <input
                      type='text'
                      value='Calculus II'
                      placeholder='Course Name'
                    />
                  </td>
                  <td>
                    {' '}
                    <div>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country-name'
                        className='bg-cream2 border cursor-pointer focus:outline-none focus:ring-0 focus:shadow-0 border-border-strong rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent'
                      >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>F</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <input
                      type='text'
                      value='4'
                      className='bg-cream2 border border-border-strong w-15 text-center rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-0 focus:border-transparent'
                    />
                  </td>
                  <td>4</td>
                  <td>
                    <IconCircleDashedX
                      stroke={2}
                      className='transition  duration-200 cursor-pointer hover:text-red-500'
                    />
                  </td>
                </tr>{' '}
                <tr>
                  <td>
                    <input
                      type='text'
                      value='Calculus II'
                      placeholder='Course Name'
                    />
                  </td>
                  <td>
                    {' '}
                    <div>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country-name'
                        className='bg-cream2 border cursor-pointer focus:outline-none focus:ring-0 focus:shadow-0 border-border-strong rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent'
                      >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>F</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <input
                      type='text'
                      value='4'
                      className='bg-cream2 border border-border-strong w-15 text-center rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-0 focus:border-transparent'
                    />
                  </td>
                  <td>4</td>
                  <td>
                    <IconCircleDashedX
                      stroke={2}
                      className='transition  duration-200 cursor-pointer hover:text-red-500'
                    />
                  </td>
                </tr>{' '}
                <tr>
                  <td>
                    <input
                      type='text'
                      value='Calculus II'
                      placeholder='Course Name'
                    />
                  </td>
                  <td>
                    {' '}
                    <div>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country-name'
                        className='bg-cream2 border cursor-pointer focus:outline-none focus:ring-0 focus:shadow-0 border-border-strong rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent'
                      >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>F</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <input
                      type='text'
                      value='4'
                      className='bg-cream2 border border-border-strong w-15 text-center rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-0 focus:border-transparent'
                    />
                  </td>
                  <td>4</td>
                  <td>
                    <IconCircleDashedX
                      stroke={2}
                      className='transition  duration-200 cursor-pointer hover:text-red-500'
                    />
                  </td>
                </tr>{' '}
                <tr>
                  <td>
                    <input
                      type='text'
                      value='Calculus II'
                      placeholder='Course Name'
                    />
                  </td>
                  <td>
                    {' '}
                    <div>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country-name'
                        className='bg-cream2 border cursor-pointer focus:outline-none focus:ring-0 focus:shadow-0 border-border-strong rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent'
                      >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>F</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <input
                      type='text'
                      value='4'
                      className='bg-cream2 border border-border-strong w-15 text-center rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-0 focus:border-transparent'
                    />
                  </td>
                  <td>4</td>
                  <td>
                    <IconCircleDashedX
                      stroke={2}
                      className='transition  duration-200 cursor-pointer hover:text-red-500'
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type='text'
                      value=''
                      placeholder='Add course name...'
                    />
                  </td>
                  <td>
                    {' '}
                    <div>
                      <select
                        id='country'
                        name='country'
                        autocomplete='country-name'
                        className='bg-cream2 border cursor-pointer focus:outline-none focus:ring-0 focus:shadow-0 border-border-strong rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent'
                      >
                        <option>-</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>F</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <input
                      type='text'
                      value='0'
                      className='bg-cream2 border border-border-strong w-15 text-center rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-0 focus:border-transparent'
                    />
                  </td>
                  <td>-</td>
                  <td>
                    <IconCircleDashedX
                      stroke={2}
                      className='transition  duration-200 cursor-pointer hover:text-red-500'
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className='hover:text-primary flex items-center gap-2 font-family-body text-text-3 mt-4 text-xs cursor-pointer py-3'>
            <IconPlus stroke={2} size={16} />
            Add course
          </button>
        </Card>
        <div className='flex flex-col col-span-2 lg:col-span-1'>
          <div className='bg-cream2 mb-3 rounded-md p-4 flex flex-col items-center'>
            <p className='text-[52px] font-font-display font-normal mt-2'>
              {(summation / credits).toFixed(2)}
            </p>
            <h2 className='text-xs text-text-3 uppercase mt-2 mb-2'>
              Semester GPA{' '}
            </h2>

            <div className='bg-cream3 w-full h-[6px] rounded-[99px]'>
              <div
                className='h-full rounded-[99px] bg-gradient-to-r from-sage to-sage-dark'
                style={{ width: `${percentage.toFixed(2)}%` }}
              />
            </div>
            <div className='flex justify-between text-[10px] w-full text-text-3'>
              {['0.0', '1.0', '2.0', '3.0', '4.0'].map((mark, i) => (
                <span key={i}>{mark}</span>
              ))}
            </div>
          </div>
          <div className='mb-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {data.map((item, index) => (
              <div className='bg-cream2 rounded-md p-3' key={index}>
                <p className='text-text-muted text-[10px] uppercase mb-2'>
                  {item.name}
                </p>
                <p className='text-xl font-medium'>{item.value}</p>
              </div>
            ))}
          </div>
          <Card>
            <p className='text-text-muted text-[10px] uppercase mb-2'>
              Grade distribution
            </p>

            {classes.map((cls, i) => (
              <div key={i} className='flex items-center justify-between  p-2'>
                <div className='flex items-center gap-3'>
                  <label className='text-sm text-text-primary font-medium'>
                    {cls.grade}
                  </label>
                </div>
                <div className='bg-cream3 w-[75%] h-[6px] rounded-[99px]'>
                  <div
                    className={`h-full rounded-[99px] ${colorGrade[cls.grade]}`}
                    style={{ width: `${percentage.toFixed(2)}%` }}
                  />
                </div>
                2
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
