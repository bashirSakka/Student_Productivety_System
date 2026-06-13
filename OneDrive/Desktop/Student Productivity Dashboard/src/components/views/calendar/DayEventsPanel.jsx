// src/components/calendar/DayEventsPanel.jsx
import Card from '../../ui/Card'

const COLOR_BAR = {
  lavender: 'bg-[#C5BFDF]',
  peach: 'bg-[#F2C9B0]',
  sage: 'bg-[#8FAF8C]',
  sky: 'bg-[#B5D4E8]'
}

const TAG_STYLES = {
  lavender: 'bg-[#EDEAF8] text-[#534AB7]',
  peach: 'bg-[#FDF0E9] text-[#C4845A]',
  sage: 'bg-[#EAF2E9] text-[#4A7A47]',
  sky: 'bg-[#E8F3FA] text-[#2E7DB0]'
}

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
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

function formatSelectedDate (date) {
  if (!date) return ''
  return `${DAY_NAMES[date.getDay()]}, ${
    MONTH_NAMES[date.getMonth()]
  } ${date.getDate()}`
}

export default function DayEventsPanel ({
  selectedDate,
  events = [],
  onAddEvent
}) {
  return (
    <Card header={formatSelectedDate(selectedDate)} className='p-4'>
      {events.length === 0 ? (
        <p className='text-[13px] text-text-muted py-2'>
          No events for this day.
        </p>
      ) : (
        <div className='divide-y divide-border-subtle'>
          {events.map((ev, i) => (
            <div
              key={i}
              className='flex gap-2.5 items-start py-2 first:pt-0 last:pb-0'
            >
              {/* Color bar */}
              <div
                className={`w-[3px] rounded-sm h-9 flex-shrink-0 mt-0.5 ${
                  COLOR_BAR[ev.color] ?? 'bg-text-muted'
                }`}
              />

              {/* Event info */}
              <div className='flex-1 min-w-0'>
                <p className='text-[13px] font-medium text-text-primary leading-snug'>
                  {ev.title}
                </p>
                <p className='text-[11px] text-text-muted mt-0.5'>{ev.time}</p>
                {ev.tag && (
                  <span
                    className={`inline-block text-[10px] px-1.5 py-0.5 rounded mt-1 ${
                      TAG_STYLES[ev.color] ??
                      'bg-surface-subtle text-text-muted'
                    }`}
                  >
                    {ev.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add event button */}
      <button
        onClick={onAddEvent}
        className='mt-3 w-full py-2 border border-dashed border-border-strong rounded-lg text-[13px] text-text-muted flex items-center justify-center gap-1.5 hover:bg-surface-subtle hover:text-text-secondary hover:border-text-muted transition-colors'
      >
        <i className='ti ti-plus text-sm' />
        Add event
      </button>
    </Card>
  )
}
