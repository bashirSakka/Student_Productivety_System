import Card from '../ui/Card'
import Pill from '../ui/Pill'
import Button from '../ui/Button'

export default function Courses () {
  return (
    <div className='p-6'>
      <div className='flex flex-row justify-between'>
        <div className=''>
          <h2 className='text-2xl font-family-display font-medium '>Courses</h2>
          <p className='text-text-muted'>
            This is where your courses will be displayed.
          </p>
        </div>
        <Button className='bg-lavender-light text-lavender-dark hover:bg-lavender-hover transition-colors duration-200'>
          Add course
        </Button>
      </div>
    </div>
  )
}
