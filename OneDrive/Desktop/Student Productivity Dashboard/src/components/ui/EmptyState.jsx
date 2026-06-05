import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function EmptyState ({ animation, title, subtitle }) {
  return (
    <div className='flex flex-col items-center justify-center py-10 text-center'>
      <div className='w-45'>
        <DotLottieReact data={animation} loop autoplay />
      </div>
      <p className='text-text-primary font-medium text-sm mt-2'>{title}</p>
      <p className='text-text-muted text-xs mt-1'>{subtitle}</p>
    </div>
  )
}
