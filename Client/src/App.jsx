import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/Register/register'
import Login from './Pages/Register/login'
import Home from './Pages/Homepage/home'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
