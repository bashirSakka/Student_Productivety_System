// src/components/calendar/UpcomingDeadlines.jsx
import Card from '../../ui/Card'

// urgency: true → peach/orange tint
export default function UpcomingDeadlines ({ deadlines = [] }) {
  return (
    <Card header='Upcoming deadlines' className='p-4'>
      {deadlines.length === 0 ? (
        <p className='text-[13px] text-text-muted'>No upcoming deadlines.</p>
      ) : (
        <div className='divide-y divide-border-subtle'>
          {deadlines.map((item, i) => (
            <div
              key={i}
              className='flex items-center justify-between py-2 first:pt-0 last:pb-0'
            >
              <div className='min-w-0 mr-2'>
                <p className='text-[13px] text-text-primary leading-snug truncate'>
                  {item.title}
                </p>
                <p className='text-[11px] text-text-muted mt-0.5'>
                  {item.course}
                </p>
              </div>
              <span
                className={`text-[11px] flex-shrink-0 ${
                  item.urgent ? 'text-[#D4845A]' : 'text-text-muted'
                }`}
              >
                {item.dateLabel}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
