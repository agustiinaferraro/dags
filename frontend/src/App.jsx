import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import ItemRoute from './pages/ItemRoute.jsx'
import SectionRoute from './pages/SectionRoute.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:section" element={<SectionRoute />} />
          <Route path="/:section/:item" element={<ItemRoute />} />
        </Routes>
      </main>
    </>
  )
}
