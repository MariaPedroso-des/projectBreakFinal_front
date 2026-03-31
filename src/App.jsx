import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import HikingDetailPage from './pages/HikingDetailPage.jsx'
import HikingsPage from './pages/HikingsPage.jsx'

const App = () => {
  const [data, setData] = useState(null)
  const urlAPI = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000'
  const [update, setUpdate] = useState(false); //para que no recargue constantemente

  const fetchData = async () => {
    try {
      const response = await fetch(`${urlAPI}/api/hikings`)
      const resData = await response.json()
      setData(resData)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [update])
  
  return (
    <Router>
      <div>
        {data === null
        ? (<div>Cargando...</div>)
        :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hikings" element={<HikingsPage data={data} />} />
          <Route path="/hikings/:id" element={<HikingDetailPage data={data} />} />
        </Routes>
        }
      </div>
    </Router>
  )
}

export default App