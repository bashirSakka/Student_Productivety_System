import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import typingAnimation from './components/animations/typing.json'
import ViewportProvider from './hooks/ViewportContext'
import GridSection from './components/layout/GridSection'
import Navbar from './components/layout/Navbar'
import Burger from './components/layout/Burger'
import Dashboard from './components/views/Dashboard'
import Notes from './components/views/Notes'
import Pomodoro from './components/views/Pomodoro'
import Courses from './components/views/Courses'
import Tasks from './components/views/Tasks'
import Calender from './components/views/Calender'
import NotFound from './components/views/NotFound'
import GPACalculator from './components/views/GPACalculator'

function App () {
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
  return (
    <ViewportProvider>
      <Router>
        <div className='h-screen overflow-hidden'>
          <Routes>
            <Route
              path='/'
              element={
                <GridSection
                  navbar={<Navbar />}
                  burger={<Burger />}
                  page={<Dashboard />}
                />
              }
            />
            <Route
              path='/courses'
              element={
                <GridSection
                  navbar={<Navbar />}
                  burger={<Burger />}
                  page={<Courses />}
                />
              }
            />
            <Route
              path='/tasks'
              element={
                <GridSection
                  navbar={<Navbar />}
                  burger={<Burger />}
                  page={<Tasks />}
                />
              }
            />
            <Route
              path='/calendar'
              element={
                <GridSection
                  navbar={<Navbar />}
                  burger={<Burger />}
                  page={<Calender />}
                />
              }
            />
            <Route
              path='/pomodoro'
              element={
                <GridSection
                  navbar={<Navbar />}
                  burger={<Burger />}
                  page={<Pomodoro />}
                />
              }
            />
            <Route
              path='/gpa'
              element={
                <GridSection
                  navbar={<Navbar />}
                  burger={<Burger />}
                  page={<GPACalculator />}
                />
              }
            />
            <Route
              path='/notes'
              element={
                <GridSection
                  navbar={<Navbar />}
                  burger={<Burger />}
                  page={<Notes />}
                />
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ViewportProvider>
  )
}

export default App
