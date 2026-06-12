import { useCounterStore } from '../../store/pomodoroStore'

export default function PomodoroWidget ({
  children,
  header = '',
  widthHeight = '',
  textSize = ''
}) {
  const count = useCounterStore(state => state.count)
  const minutes = Math.floor(count / 60) || 0
  const seconds = count % 60 || 0
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-[11px]  text-text-muted uppercase tracking-[0.07em] mb-3'>
        {header}
      </p>
      <div
        className={`flex mt-3 items-center justify-center rounded-full border  border-peach bg-peach-light ${textSize} font-family-display ${widthHeight}`}
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      {children}
    </div>
  )
}
