import { useInView } from 'react-intersection-observer'
import Button from '../ui/Button'
import Pill from '../ui/Pill'
import LandingHeader from '../landing/Header'
import LogosBand from '../landing/LogosBand'
import Features from '../landing/Features'
import Testimonials from '../landing/Testimonials'
import FAQ from '../landing/FAQ'
import ClosingCTA from '../landing/ClosingCTA'
import { bgLanding, bgLanding2, btn } from '../landing/tokens'
import Card from '../ui/Card'

const tools = ['gpa', 'pomodoro', 'notes', 'calendar', 'tasks', 'reports']

export default function Home () {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <div className='relative min-h-screen'>
      <LandingHeader view={inView} />

      {/* Hero */}
      <section
        className={`${bgLanding} border-b-[0.5px] border-black/10`}
        id='top'
      >
        <div className='max-w-285 mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[1.04fr_0.96fr] gap-8 lg:gap-14 pt-[clamp(48px,8vw,104px)] pb-[clamp(48px,7vw,92px)] items-center'>
          {/* LEFT: headline copy */}
          <div className='animate-slideInLeft text-center lg:text-left flex flex-col items-center lg:items-start'>
            <span className='inline-flex items-center gap-2 text-[12.5px] font-medium text-[#7A7265] bg-white border-[0.5px] border-black/15 py-1.5 px-3.5 rounded-[20px] mb-6.5'>
              <span className='w-[10%] h-1.5 rounded-full bg-amber-600' />
              free for students · spring 2026
            </span>

            <h1 className='font-serif font-medium text-[clamp(38px,5.4vw,62px)] leading-[1.04] tracking-[-0.03em] text-[#2E2A24] mb-[22px] max-w-[16ch]'>
              your whole semester,{' '}
              <em className='italic text-amber-800'>
                finally in one calm place.
              </em>
            </h1>

            <p className='text-[clamp(15px,1.5vw,18px)] text-amber-900 leading-[1.65] max-w-[46ch] mb-[34px]'>
              studyspace brings your gpa, tasks, notes, and focus sessions
              together — so you spend less time organizing and more time
              actually learning.
            </p>

            <div className='flex gap-3 flex-wrap mb-[22px]'>
              <a
                href='#top'
                className='rounded-lg text-sm font-medium no-underline'
              >
                <Button className={btn}>start now</Button>
              </a>
              <a
                href='#features'
                className='inline-flex items-center gap-2 text-[#D85A30] hover:bg-[#D85A30] hover:text-white py-3 px-5.5 rounded-lg text-sm font-medium no-underline border-[0.5px] border-amber-600 transition-colors duration-160'
              >
                see how it works
              </a>
            </div>

            <div className='flex items-center gap-2 text-[13px] text-[#7A7265] mb-[22px]'>
              <i className='ti ti-heart text-[#7A72B0] text-[15px]' />
              loved by 4,200+ students · no credit card
            </div>

            <div className='flex flex-wrap gap-2'>
              {tools.map(t => (
                <Pill key={t} className='bg-white border-amber-600'>
                  {t}
                </Pill>
              ))}
            </div>
          </div>

          {/* RIGHT: app mockup */}
          <div className='hidden lg:block animate-slideInRight w-full rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] bg-white'>
            {/* browser bar */}
            <div
              className={`${bgLanding2} flex flex-row gap-6 items-center px-3.5 py-2.75 border-b-[0.5px] border-b-border-strong`}
            >
              <div className='flex flex-row gap-1'>
                {['bg-peach', 'bg-sky-600', 'bg-lavender'].map(t => (
                  <div key={t} className={`w-3 h-3 rounded-full ${t}`} />
                ))}
              </div>
              <div className='rounded-full px-3 py-0.75 w-fit bg-white border border-gray-300 text-xs'>
                studyflow.app/dashboard
              </div>
            </div>

            <div className='flex flex-row'>
              {/* sidebar nav */}
              <div
                className={`py-4 flex flex-col items-center gap-3 px-3 border-r border-r-border-strong ${bgLanding2}`}
              >
                <div
                  className={`w-7.5 h-7.5 rounded-lg ${btn} flex justify-center items-center text-base font-medium`}
                >
                  S
                </div>
                <div className={`w-7.5 h-7.5 rounded-lg ${btn} opacity-50`} />
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6.5 h-6.5 rounded-lg ${btn} opacity-0`}
                  />
                ))}
              </div>

              {/* main content */}
              <div className='flex-1 pt-4.5 px-5 pb-5.5'>
                <div className='flex items-center justify-between'>
                  <div className='text-lg font-medium font-serif'>
                    good evening, maya
                  </div>
                  <div className='text-xs text-text-muted'>
                    tuesday · week 6
                  </div>
                </div>

                <div className='mt-5'>
                  <div className='flex flex-row gap-4'>
                    {/* GPA card */}
                    <Card header='term gpa' className='w-1/2'>
                      <div className='text-[30px] font-medium'>
                        3.87 <span className='text-xs text-text-3'>+0.21</span>
                      </div>
                      <div className='flex flex-row items-end h-6.5 gap-0.75 mt-2'>
                        <span className='h-[48%] w-1.5 rounded-sm bg-amber-700 opacity-30' />
                        <span className='h-[55%] w-1.5 rounded-sm bg-amber-700 opacity-30' />
                        <span className='h-[30%] w-1.5 rounded-sm bg-amber-700 opacity-30' />
                        <span className='h-[40%] w-1.5 rounded-sm bg-amber-700 opacity-30' />
                        <span className='h-full w-1.5 rounded-sm bg-amber-700' />
                      </div>
                    </Card>

                    {/* Focus session card */}
                    <Card header='focus session' className='w-1/2'>
                      <div className='flex items-center gap-3 mt-1'>
                        <svg
                          width='48'
                          height='48'
                          viewBox='0 0 48 48'
                          className='shrink-0 -rotate-90'
                        >
                          <circle
                            cx='24'
                            cy='24'
                            r='19'
                            fill='none'
                            stroke='#FAEEDA'
                            strokeWidth='4.5'
                          />
                          <circle
                            cx='24'
                            cy='24'
                            r='19'
                            fill='none'
                            stroke='#D85A30'
                            strokeWidth='4.5'
                            strokeDasharray='119.4'
                            strokeDashoffset='30'
                            strokeLinecap='round'
                          />
                        </svg>
                        <div className='flex flex-col gap-0.5'>
                          <span className='text-[22px] font-medium leading-none'>
                            18:24
                          </span>
                          <span className='text-[11px] text-text-3'>
                            3 / 4 sessions
                          </span>
                          <span className='flex items-center gap-1 text-[11px] text-sage-dark mt-0.5'>
                            <span className='w-1.5 h-1.5 rounded-full bg-sage-dark' />
                            focusing
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Tasks card */}
                  <Card className='mt-3 p-0 rounded-lg'>
                    <div className='text-xs text-primary pt-2.75 pb-2.25 px-3.5'>
                      today's tasks
                    </div>
                    <div className='border-b border-b-border-strong' />

                    {/* done task */}
                    <div className='flex items-center justify-between px-3.5 py-2.25 border-b border-b-border-strong'>
                      <div className='flex items-center gap-2.5'>
                        <div className='rounded-[4px] w-3.75 h-3.75 bg-amber-600 border-amber-600 border shrink-0' />
                        <span className='text-xs line-through text-primary'>
                          study ch.9 — threads
                        </span>
                      </div>
                      <Pill>cs 410</Pill>
                    </div>

                    {/* pending task */}
                    <div className='flex items-center justify-between px-3.5 py-2.25 border-b border-b-border-strong'>
                      <div className='flex items-center gap-2.5'>
                        <div className='rounded-[4px] w-3.75 h-3.75 border border-border-strong shrink-0' />
                        <span className='text-xs text-primary'>
                          refine the report
                        </span>
                      </div>
                      <Pill>cs 490</Pill>
                    </div>

                    {/* animating task */}
                    <div className='flex items-center justify-between px-3.5 py-2.25 border-b border-b-border-strong'>
                      <div className='flex items-center gap-2.5'>
                        <div className='rounded-[4px] w-3.75 h-3.75 animate-checkTask border shrink-0' />
                        <span className='relative text-xs primary animate-taskEnd'>
                          review the last chapter
                          <span className='absolute left-0 top-1/2 h-px bg-text-3 animate-taskEnd' />
                        </span>
                      </div>
                      <Pill>cs 350</Pill>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='' ref={ref}>
        <LogosBand />
        <Features />
        <Testimonials />
        <FAQ />
        <ClosingCTA />
      </div>
    </div>
  )
}
