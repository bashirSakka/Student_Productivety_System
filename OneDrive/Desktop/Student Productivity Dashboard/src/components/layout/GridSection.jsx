import { useViewport } from '../../hooks/ViewportContext'

export default function GridSection ({ navbar, burger, dashboard }) {
  const { isMobile } = useViewport()
  if (isMobile) {
    return (
      <div className='flex flex-col border border-border-strong rounded-[10px] overflow-hidden '>
        <div className=''>{burger}</div>
        <div className='flex-1'>{dashboard}</div>
      </div>
    )
  } else {
    return (
      <div className='flex border border-border-strong rounded-[10px] overflow-hidden '>
        <div className='w-[220px] shrink-0'>{navbar}</div>
        <div className='flex-1'>{dashboard}</div>
      </div>
    )
  }
}
