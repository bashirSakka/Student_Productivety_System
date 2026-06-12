import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

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
import { useCounterStore } from './store/pomodoroStore'
import Home from './components/views/Home'
function App () {
  const isActive = useCounterStore(state => state.isActive)
  const tick = useCounterStore(state => state.tick)
  useEffect(() => {
    if (!isActive) return
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [isActive])

  return (
    <ViewportProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/dashboard'
            element={
              <GridSection
                navbar={<Navbar />}
                burger={<Burger />}
                page={<Dashboard />}
              />
            }
          />{' '}
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
      </Router>
    </ViewportProvider>
  )
}

export default App
