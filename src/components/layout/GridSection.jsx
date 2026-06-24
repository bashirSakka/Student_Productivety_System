import { useViewport } from '../../hooks/ViewportContext'

export default function GridSection ({ navbar, burger, page }) {
  const { isMobile } = useViewport()

  if (isMobile) {
    return (
      <div className='flex flex-col h-full border border-border-strong rounded-[10px] overflow-hidden'>
        {burger}
        <div className='flex-1 overflow-y-auto bg-cream pt-13'>{page}</div>
      </div>
    )
  } else {
    return (
      <div className='h-screen p-3 bg-cream'>
        <div className='flex h-full border border-border-strong rounded-[10px] overflow-hidden'>
          <div className='w-55 shrink-0 h-full overflow-y-auto'>{navbar}</div>
          <div className='flex-1 overflow-y-auto bg-cream'>
            {page}
          </div>
        </div>
      </div>
    )
  }
}
