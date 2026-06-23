import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import notFound from '../../assets/animations/_404.json'

export default function NotFound () {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-cream'>
      <div className='w-[80%]'>
        <DotLottieReact data={notFound} loop autoplay />
      </div>
    </div>
  )
}
