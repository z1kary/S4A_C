import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Home from '../../pages/Homepage'
import Films from '../../pages/Films'
// import Series from '../../pages/Series'
import Mangas from '../../pages/Mangas'
import Admin from '../../pages/Admin'
import Watch from '../../pages/Watch'
import WatchFilm from '../../pages/Watch'
import Manga from '../../pages/Manga'
import Film from '../../pages/Film'
import OnePiece from '../../pages/OnePiece'

const index = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/films' element={<Films />} />
          {/* <Route path='/series' element={<Series />} /> */}
          <Route path='/mangas' element={<Mangas />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/manga/one-piece' element={<OnePiece />} />
          <Route path='/manga/:id' element={<Manga />} />
          <Route path='/film/:id' element={<Film />} />
          <Route path='/watch/:id/:season/ep-:ep/:format' element={<Watch />} />
          <Route path='/watch/:id' element={<WatchFilm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default index
