// src/components/calendar/CalendarGrid.jsx
import { useState } from 'react'
import Card from '../../ui/Card'
import { IconArrowBadgeRight, IconArrowBadgeLeft } from '@tabler/icons-react'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

// Returns array of { date: Date, isCurrentMonth: boolean }
function buildCalendarDays (year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []

  // Trailing days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false
    })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), isCurrentMonth: true })
  }

  // Leading days from next month to fill 6 rows (42 cells)
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(year, month + 1, d), isCurrentMonth: false })
  }

  return cells
}

function isSameDay (a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

// Color dot config per event category
const DOT_COLORS = {
  lavender: 'bg-[#C5BFDF]',
  peach: 'bg-[#F2C9B0]',
  sage: 'bg-[#8FAF8C]',
  sky: 'bg-[#B5D4E8]'
}

export default function CalendarGrid ({
  events = {},
  selectedDate,
  onSelectDate
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const cells = buildCalendarDays(viewYear, viewMonth)

  function prevMonth () {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(y => y - 1)
    } else setViewMonth(m => m - 1)
  }

  function nextMonth () {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(y => y + 1)
    } else setViewMonth(m => m + 1)
  }

  // events keyed by "YYYY-MM-DD" → array of { color: 'lavender'|'peach'|'sage'|'sky', ... }
  function getDotsForDate (date) {
    const key = date.toISOString().split('T')[0]
    return events[key] || []
  }

  return (
    <Card className='flex-1 p-5'>
      {/* Calendar header */}
      <div className='flex items-center justify-between mb-5'>
        <span className='text-[15px] font-medium text-text-primary'>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div className='flex gap-1.5'>
          <button
            onClick={prevMonth}
            className='w-7 h-7 hover:bg-cream3 hover:border-cream3 hover:text-white cursor-pointer transition duration-200   flex items-center justify-center rounded-md border border-border-strong text-text-secondary hover:bg-surface-subtle transition-colors'
            aria-label='Previous month'
          >
            <IconArrowBadgeLeft stroke={2} />
          </button>
          <button
            onClick={nextMonth}
            className='w-7 h-7 hover:bg-cream3 hover:border-cream3 hover:text-white cursor-pointer transition duration-200 flex items-center justify-center rounded-md border border-border-strong text-text-secondary hover:bg-surface-subtle transition-colors'
            aria-label='Next month'
          >
            <IconArrowBadgeRight stroke={2} />
          </button>
        </div>
      </div>

      {/* Day-of-week labels */}
      <div className='grid grid-cols-7 mb-1'>
        {DAYS.map(d => (
          <div
            key={d}
            className='text-center text-[11px] text-text-muted tracking-[0.04em] pb-2.5'
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className='grid grid-cols-7 gap-0.5'>
        {cells.map(({ date, isCurrentMonth }, idx) => {
          const isToday = isSameDay(date, today)
          const isSelected = selectedDate && isSameDay(date, selectedDate)
          const dots = getDotsForDate(date)

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className={[
                'aspect-square flex flex-col items-center justify-start pt-1.5 rounded-lg transition-colors cursor-pointer',
                isSelected && !isToday ? 'bg-[#F0EDF8]' : '',
                !isSelected && !isToday ? 'hover:bg-surface-subtle' : ''
              ].join(' ')}
            >
              {/* Date number */}
              <span
                className={[
                  'text-[13px] leading-none',
                  isToday
                    ? 'bg-text-primary text-white w-6 h-6 rounded-full flex items-center justify-center'
                    : isCurrentMonth
                    ? 'text-text-secondary'
                    : 'text-text-muted/50'
                ].join(' ')}
              >
                {date.getDate()}
              </span>

              {/* Event dots */}
              {dots.length > 0 && (
                <div className='flex gap-0.5 mt-1'>
                  {dots.slice(0, 3).map((ev, i) => (
                    <span
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        DOT_COLORS[ev.color] ?? 'bg-text-muted'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </Card>
  )
}
