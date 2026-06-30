import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'

import ViewportProvider from './hooks/ViewportContext'
import GridSection from './components/layout/GridSection'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Burger from './components/layout/Burger'
import { useCounterStore } from './store/pomodoroStore'
import useThemeStore from './store/themeStore'
import Home from './components/landing/Home'
import Login from './components/views/auth/Login'
import Register from './components/views/auth/Register'
import { Toaster } from 'sonner'

const Dashboard    = lazy(() => import('./components/views/Dashboard'))
const Notes        = lazy(() => import('./components/views/Notes'))
const Pomodoro     = lazy(() => import('./components/views/Pomodoro'))
const Courses      = lazy(() => import('./components/views/Courses'))
const Tasks        = lazy(() => import('./components/views/Tasks'))
const Calendar     = lazy(() => import('./components/views/calendar'))
const GPACalculator = lazy(() => import('./components/views/GPACalculator'))
const Settings     = lazy(() => import('./components/views/Settings'))
const NotFound     = lazy(() => import('./components/views/NotFound'))
function App () {
  const isActive = useCounterStore(state => state.isActive)
  const tick = useCounterStore(state => state.tick)
  const theme = useThemeStore(state => state.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!isActive) return
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [isActive, tick])

  return (
    <ViewportProvider>
      <Router>
        <Suspense fallback={null}>
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
          <Route
            path='/settings'
            element={
              <ProtectedRoute>
                <GridSection navbar={<Navbar />} burger={<Burger />} page={<Settings />} />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </Suspense>
        <Toaster position='bottom-right' richColors />
      </Router>
    </ViewportProvider>
  )
}

export default App
