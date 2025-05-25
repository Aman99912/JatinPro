import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Register from './Pages/Register/register'
import Login from './Pages/Register/login'
import Home from './Pages/Homepage/home'
import PrivateRoute from './Pages/Register/privateRoute'
import Navbar from './components/Navbar'

// Separate component to handle layout logic
function AppWrapper() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App
