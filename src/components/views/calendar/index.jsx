// src/pages/CalendarPage.jsx
import { useState } from 'react'
import CalendarGrid from './CalendarGrid'
import DayEventsPanel from './DayEventsPanel'
import UpcomingDeadlines from './UpcomingDeadlines'

// ---------------------------------------------------------------------------
// Sample data — replace with your localStorage / state management layer
// ---------------------------------------------------------------------------

const SAMPLE_EVENTS = {
  '2026-06-02': [
    {
      color: 'lavender',
      title: 'Math Study Group',
      time: '3:00 PM – 5:00 PM',
      tag: 'Math'
    }
  ],
  '2026-06-04': [
    {
      color: 'peach',
      title: 'Essay Draft Due',
      time: 'Due · 11:59 PM',
      tag: 'English'
    },
    {
      color: 'sage',
      title: 'Physics Lab Report',
      time: 'Due · 11:59 PM',
      tag: 'Physics'
    }
  ],
  '2026-06-07': [
    {
      color: 'sky',
      title: 'Office Hours — Dr. Khalil',
      time: '10:00 AM – 11:00 AM',
      tag: 'Meeting'
    }
  ],
  '2026-06-09': [
    {
      color: 'lavender',
      title: 'Problem Set 3',
      time: 'Due · 11:59 PM',
      tag: 'Math'
    },
    {
      color: 'peach',
      title: 'Reading Response',
      time: 'Due · 8:00 AM',
      tag: 'English'
    }
  ],
  '2026-06-10': [
    {
      color: 'sage',
      title: 'Physics Lab Report',
      time: 'Due · 11:59 PM',
      tag: 'Physics'
    },
    {
      color: 'lavender',
      title: 'Study group — Math',
      time: '3:00 PM – 5:00 PM',
      tag: 'Math'
    },
    {
      color: 'sky',
      title: 'Office hours — Dr. Khalil',
      time: '10:00 AM – 11:00 AM',
      tag: 'Meeting'
    }
  ],
  '2026-06-12': [
    {
      color: 'peach',
      title: 'Essay Draft',
      time: 'Due · 11:59 PM',
      tag: 'English'
    }
  ],
  '2026-06-15': [
    { color: 'sky', title: 'CS Lab', time: '2:00 PM – 4:00 PM', tag: 'CS' }
  ],
  '2026-06-17': [
    {
      color: 'lavender',
      title: 'Midterm Exam',
      time: '9:00 AM – 11:00 AM',
      tag: 'Math'
    },
    { color: 'sage', title: 'Problem Set 4', time: 'Due · 11:59 PM', tag: 'CS' }
  ],
  '2026-06-19': [
    {
      color: 'peach',
      title: 'Final Essay',
      time: 'Due · 11:59 PM',
      tag: 'English'
    }
  ],
  '2026-06-23': [
    {
      color: 'sky',
      title: 'History Final Project',
      time: 'Due · 11:59 PM',
      tag: 'History'
    },
    {
      color: 'lavender',
      title: 'Math Review Session',
      time: '4:00 PM – 6:00 PM',
      tag: 'Math'
    }
  ],
  '2026-06-25': [
    {
      color: 'peach',
      title: 'Peer Review',
      time: 'Due · 11:59 PM',
      tag: 'English'
    }
  ],
  '2026-06-27': [
    {
      color: 'sage',
      title: 'Lab Writeup',
      time: 'Due · 11:59 PM',
      tag: 'Physics'
    }
  ],
  '2026-06-30': [
    {
      color: 'lavender',
      title: 'Final Exam Prep',
      time: '6:00 PM – 9:00 PM',
      tag: 'Math'
    }
  ]
}

const SAMPLE_DEADLINES = [
  {
    title: 'Midterm Exam',
    course: 'Math',
    dateLabel: 'Tomorrow',
    urgent: true
  },
  {
    title: 'Essay Draft',
    course: 'English',
    dateLabel: 'Jun 12',
    urgent: true
  },
  {
    title: 'Problem Set 4',
    course: 'Computer Science',
    dateLabel: 'Jun 17',
    urgent: false
  },
  {
    title: 'Final Project',
    course: 'History',
    dateLabel: 'Jun 23',
    urgent: false
  }
]

// ---------------------------------------------------------------------------

const TABS = ['Calendar', 'Events']

export default function CalendarPage () {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState('Calendar')

  const selectedKey = selectedDate?.toISOString().split('T')[0]
  const selectedEvents = SAMPLE_EVENTS[selectedKey] ?? []

  function handleSelectDate (date) {
    setSelectedDate(date)
    setActiveTab('Events')
  }

  function handleAddEvent () {
    console.log('Add event for', selectedKey)
  }

  const sidebar = (
    <div className='flex flex-col gap-4'>
      <DayEventsPanel
        selectedDate={selectedDate}
        events={selectedEvents}
        onAddEvent={handleAddEvent}
      />
      <UpcomingDeadlines deadlines={SAMPLE_DEADLINES} />
    </div>
  )

  return (
    <div className='flex-1 p-6 lg:p-9 lg:px-10 overflow-hidden'>
      {/* Page header */}
      <div className='mb-5'>
        <h1 className='font-display text-[26px] font-normal text-text-primary'>
          Calendar
        </h1>
        <p className='text-[13px] text-text-muted mt-0.5'>
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Small-screen tabs */}
      <div className='flex gap-1 mb-4 lg:hidden'>
        {TABS.map(tab => (
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

      {/* Small screens: show one panel at a time */}
      <div className='lg:hidden'>
        {activeTab === 'Calendar'
          ? <CalendarGrid
              events={SAMPLE_EVENTS}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          : sidebar
        }
      </div>

      {/* Large screens: two-column layout */}
      <div className='hidden lg:grid grid-cols-[1fr_260px] gap-5'>
        <CalendarGrid
          events={SAMPLE_EVENTS}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        {sidebar}
      </div>
    </div>
  )
}
