import { useViewport } from '../../hooks/ViewportContext'

export default function GridSection ({ navbar, burger, page }) {
  const { isMobile } = useViewport()
  if (isMobile) {
    return (
      <div className='flex flex-col h-full border border-border-strong rounded-[10px] overflow-hidden'>
        <div className='sticky top-0 z-30'>{burger}</div>
        <div className='flex-1 overflow-y-auto bg-cream '>{page}</div>
      </div>
    )
  } else {
    return (
      <div className='flex h-full border border-border-strong rounded-[10px] overflow-hidden'>
        <div className='w-[220px] shrink-0'>{navbar}</div>
        <div
          className='flex-1 overflow-y-auto  bg-cream
'
        >
          {page}
        </div>
      </div>
    )
  }
}
