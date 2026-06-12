import { useViewport } from '../../hooks/ViewportContext'
import { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import typingAnimation from '../animations/typing.json'

export default function GridSection ({ navbar, burger, page }) {
  const { isMobile } = useViewport()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])
  if (loading) {
    return (
      <div className='h-screen flex flex-col items-center justify-center bg-cream'>
        <div className='w-[80%]'>
          <DotLottieReact data={typingAnimation} loop autoplay />
        </div>
        <p className='text-text-muted text-sm mt-4'>Loading studyflow...</p>
      </div>
    )
  }

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
