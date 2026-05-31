import Notes from './components/views/Notes'
import Pomodoro from './components/views/Pomodoro'
import GridSection from './components/layout/GridSection'
import Navbar from './components/layout/Navbar'
import Burger from './components/layout/Burger'
import ViewportContext from './hooks/ViewportContext'
import Dashboard from './components/views/Dashboard'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewportProvider from './hooks/ViewportContext'

function App () {
  return (
    <ViewportProvider>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <GridSection
                navbar={<Navbar />}
                burger={<Burger />}
                dashboard={<Dashboard />}
              />
            }
          />
          <Route
            path='/notes'
            element={
              <GridSection
                navbar={<Navbar />}
                burger={<Burger />}
                dashboard={<Notes />}
              />
            }
          />
          <Route
            path='/pomodoro'
            element={
              <GridSection
                navbar={<Navbar />}
                burger={<Burger />}
                dashboard={<Pomodoro />}
              />
            }
          />
        </Routes>
      </Router>
    </ViewportProvider>
  )
}

export default App
