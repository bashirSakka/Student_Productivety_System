import Card from '../ui/Card'
import Pill from '../ui/Pill'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { IconTrash, IconEdit } from '@tabler/icons-react'

import { useState } from 'react'
export default function Courses () {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
  }
  return (
    <div className='p-6'>
      <div className='flex flex-row justify-between'>
        <div className=''>
          <h2 className='text-2xl font-family-display font-medium '>Courses</h2>
          <p className='text-text-muted'>
            This is where your courses will be displayed.
          </p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className='h-fit bg-lavender-light text-lavender-dark hover:bg-lavender-hover transition-colors duration-200'
        >
          Add course
        </Button>
        <Modal isOpen={open} onClose={close} header='Add a course'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-3'>
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[11px] text-text-muted'>
                  Course code
                </label>
                <input
                  placeholder='e.g. CS 301'
                  className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
                />
              </div>
              <div className='flex flex-col gap-1 w-24'>
                <label className='text-[11px] text-text-muted'>Credits</label>
                <input
                  placeholder='3'
                  className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
                />
              </div>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-[11px] text-text-muted'>Course name</label>
              <input
                placeholder='e.g. Data Structures'
                className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
              />
            </div>

            <div className='flex gap-3'>
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[11px] text-text-muted'>
                  Instructor
                </label>
                <input
                  placeholder='Dr. ...'
                  className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
                />
              </div>
              <div className='flex flex-col gap-1 flex-1'>
                <label className='text-[11px] text-text-muted'>
                  Current grade (%)
                </label>
                <input
                  placeholder='0'
                  className='border border-border-strong rounded-md px-3 py-2 text-xs bg-cream focus:outline-none focus:border-lavender-dark'
                />
              </div>
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
                    className={`w-6 h-6 rounded-full ${color} border-2 border-transparent cursor-pointer`}
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
              <button className='text-xs px-4 py-1.5 rounded-md bg-lavender-light text-lavender-dark hover:bg-lavender transition-colors cursor-pointer'>
                Save course
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6'>
        {['Courses', 'Credit hours', 'Current GPA', 'Completed'].map(el => (
          <Card key={el} header={el} body='4' className='bg-cream2' />
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6'>
        <Card
          header='Cs 30l'
          body='Data Structure & Algorithm'
          bodyClass='text-[13.5px]/[1.4] mt-3 font-medium font-family-display'
        >
          <div className='flex mt-3 mb-3 items-center text-xs text-text-3'>
            Dr.Soha Farhat
          </div>
          <div className='border-t pt-2  border-[#EAE5DB] flex flex-row justify-between items-center'>
            <div className='font-medium  bg-sage-light w-fit text-sage-dark rounded-[6px] text-[11px] py-0.5 px-2'>
              A <span>- 90%</span>
            </div>
            <div className=' flex flex-row gap-2'>
              <IconTrash stroke={2} color='red' className='cursor-pointer' />
              <IconEdit stroke={2} color='blue' className='cursor-pointer' />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
