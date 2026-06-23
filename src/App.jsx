import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import ViewportProvider from './hooks/ViewportContext'
import GridSection from './components/layout/GridSection'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Burger from './components/layout/Burger'
import Dashboard from './components/views/Dashboard'
import Notes from './components/views/Notes'
import Pomodoro from './components/views/Pomodoro'
import Courses from './components/views/Courses'
import Tasks from './components/views/Tasks'
import Calendar from './components/views/calendar'
import NotFound from './components/views/NotFound'
import GPACalculator from './components/views/GPACalculator'
import { useCounterStore } from './store/pomodoroStore'
import Home from './components/landing/Home'
import Login from './components/views/auth/Login'
import Register from './components/views/auth/Register'
import { Toaster } from 'sonner'
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
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<Dashboard />} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/courses'
            element={
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<Courses />} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/tasks'
            element={
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<Tasks />} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/calendar'
            element={
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<Calendar />} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/pomodoro'
            element={
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<Pomodoro />} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/gpa'
            element={
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<GPACalculator />} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/notes'
            element={
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<Notes />} />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster position='bottom-right' richColors />
      </Router>
    </ViewportProvider>
  )
}

export default App
