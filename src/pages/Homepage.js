import React, { useEffect, useRef, useState } from 'react'
import { getFilms, getMangas } from '../actions/allActions'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../components/Utils'
import AllMangas from '../components/AllMangas'
import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Homepage = () => {
  const dispatch = useDispatch()
  const mangas = useSelector((state) => state.mangasReducer)
  const films = useSelector((state) => state.filmsReducer)
  const [isLoading, setIsLoading] = useState(true)
  const [mangaSliderLength, setMangaSliderLength] = useState()
  const [filmSliderLength, setFilmSliderLength] = useState()
  const [mangaSliderPage, setMangaSliderPage] = useState(1)
  const [filmSliderPage, setFilmSliderPage] = useState(1)
  const refSliderManga = useRef(null)
  const refSliderFilm = useRef(null)

  const getSliders = (e) => {
    if (e === "mangas") {
      let content = [];
      for (let i = 1; i < mangaSliderLength + 1; i++) {
        content.push(<div key={i} className="slider"><AllMangas mangas={mangas} type={"mangas"} i={i}/></div>);
      }
      return content;
    } else if (e === 'films') {
      let content = [];
      for (let i = 1; i < filmSliderLength + 1; i++) {
        content.push(<div key={i} className="slider"><AllMangas films={films} type={"films"} i={i}/></div>);
      }
      return content;
    }
  }

  const getPagination = (e) => {
    if (e === "mangas") {
      let content = [];
      for (let i = 1; i < mangaSliderLength + 1; i++) {
        // console.log(i);
        // console.log(mangaSliderPage);
        content.push(<div key={i} className={i === mangaSliderPage ? "pag-item active" : "pag-item"} onClick={() => handleGoTo(i, "mangas")}></div>);
      }
      return content;
    } else if (e === "films") {
      let content = [];
      for (let i = 1; i < filmSliderLength + 1; i++) {
        // console.log(i);
        // console.log(mangaSliderPage);
        content.push(<div key={i} className={i === filmSliderPage ? "pag-item active" : "pag-item"} onClick={() => handleGoTo(i, "films")}></div>);
      }
      return content;
    }
  }

  const handleGoTo = (e, a) => {
    if (a === "mangas") {
      if (e === 1) {
        refSliderManga.current.style.transform = "translateX(0%)"
        setMangaSliderPage(1)
      } else if (e === 2) {
        refSliderManga.current.style.transform = "translateX(-25%)"
        setMangaSliderPage(2)
      } else if (e === 3) {
        refSliderManga.current.style.transform = "translateX(-50%)"
        setMangaSliderPage(3)
      } else if (e === 4) {
        refSliderManga.current.style.transform = "translateX(-75%)"
        setMangaSliderPage(4)
      }
    } else if (a === "films") {
      if (e === 1) {
        refSliderFilm.current.style.transform = "translateX(0%)"
        setFilmSliderPage(1)
      } else if (e === 2) {
        refSliderFilm.current.style.transform = "translateX(-25%)"
        setFilmSliderPage(2)
      } else if (e === 3) {
        refSliderFilm.current.style.transform = "translateX(-50%)"
        setFilmSliderPage(3)
      } else if (e === 4) {
        refSliderFilm.current.style.transform = "translateX(-75%)"
        setFilmSliderPage(4)
      }
    }
  }

  const handleGoLeft = (e) => {
    if (e === "manga") {
      if (mangaSliderPage === 1){
        // refSliderManga.current.style.transform = "translateX(0%)"
      } else if (mangaSliderPage === 2) {
        refSliderManga.current.style.transform = "translateX(0%)"
        setMangaSliderPage(1)
      } else if (mangaSliderPage === 3) {
        refSliderManga.current.style.transform = "translateX(-25%)"
        setMangaSliderPage(2)
      } else if (mangaSliderPage === 4) {
        refSliderManga.current.style.transform = "translateX(-50%)"
        setMangaSliderPage(3)
      }
      // else if (mangaSliderPage === 5) {
      //   refSliderManga.current.style.transform = "translateX(-75%)"
      //   setMangaSliderPage(4)
      // }
    } else if (e === 'film') {
      if (filmSliderPage === 1){
        // refSliderManga.current.style.transform = "translateX(0%)"
      } else if (filmSliderPage === 2) {
        refSliderFilm.current.style.transform = "translateX(0%)"
        setFilmSliderPage(1)
      } else if (filmSliderPage === 3) {
        refSliderFilm.current.style.transform = "translateX(-25%)"
        setFilmSliderPage(2)
      } else if (filmSliderPage === 4) {
        refSliderFilm.current.style.transform = "translateX(-50%)"
        setFilmSliderPage(3)
      }
    }
  }
  const handleGoRight = (e) => {
    if (e === "manga") {
      if (mangaSliderLength === 4) {
        if (mangaSliderPage === 1){
          refSliderManga.current.style.transform = "translateX(-25%)"
          setMangaSliderPage(2)
        } else if (mangaSliderPage === 2) {
          refSliderManga.current.style.transform = "translateX(-50%)"
          setMangaSliderPage(3)
        } else if (mangaSliderPage === 3) {
          refSliderManga.current.style.transform = "translateX(-75%)"
          setMangaSliderPage(4)
        }
      } else if (mangaSliderLength === 5) {
        if (mangaSliderPage === 1){
          refSliderManga.current.style.transform = "translateX(-25%)"
          setMangaSliderPage(2)
        } else if (mangaSliderPage === 2) {
          refSliderManga.current.style.transform = "translateX(-50%)"
          setMangaSliderPage(3)
        } else if (mangaSliderPage === 3) {
          refSliderManga.current.style.transform = "translateX(-75%)"
          setMangaSliderPage(4)
        } else if (mangaSliderPage === 4) {
          refSliderManga.current.style.transform = "translateX(-100%)"
          setMangaSliderPage(5)
        }
      }
      // else if (mangaSliderPage === 4) {
      //   refSliderManga.current.style.transform = "translateX(-100%)"
      //   setMangaSliderPage(5)
      // }
    } else if (e === 'film') {
      if (filmSliderLength === 2) {
        if (filmSliderPage === 1){
          refSliderFilm.current.style.transform = "translateX(-25%)"
          setFilmSliderPage(2)
        }
      } else if (filmSliderLength === 3) {
        if (filmSliderPage === 1) {
          refSliderFilm.current.style.transform = "translateX(-25%)"
          setFilmSliderPage(2)
        } else if (filmSliderPage === 2) {
          refSliderFilm.current.style.transform = "translateX(-50%)"
          setFilmSliderPage(3)
        }
      }
    }
  }

  useEffect(() => {
    if (isEmpty(mangas)) {
      dispatch(getMangas())
    }
    if (isEmpty(films)) {
      dispatch(getFilms())
    }
    if (!isEmpty(mangas) && !isEmpty(films)) {
      setMangaSliderLength(Math.ceil(mangas.length / 4))
      setFilmSliderLength(Math.ceil(films.length / 4))
      setTimeout(function() {
        setIsLoading(false)
      }.bind(), 200)
    }
    if (!isLoading) {
      refSliderManga.current.style.width = Math.ceil(mangas.length / 4) + "00%"
      refSliderFilm.current.style.width = Math.ceil(films.length / 4) + "00%"
    }
  }, [dispatch, mangas, films, isLoading])

  return (
    <div className="page homepage">

      <div className="slider-wrapper">

        {/* <div className="slider-container">
          <div className="slider-title">
            <h2>Most Viewed</h2>
          </div>
          <div className="slider">
            <div className="slider-item">
              <img src={process.env.REACT_APP_CLIENT_URL + "assets/img/hxh.webp"} alt=''/>
            </div>
            <div className="slider-item">
              <img src={process.env.REACT_APP_CLIENT_URL + "assets/img/hxh.webp"} alt=''/>
            </div>
            <div className="slider-item">
              <img src={process.env.REACT_APP_CLIENT_URL + "assets/img/hxh.webp"} alt=''/>
            </div>
            <div className="slider-item">
              <img src={process.env.REACT_APP_CLIENT_URL + "assets/img/hxh.webp"} alt=''/>
            </div>
          </div>
        </div> */}

        <div className="slider-container">
          <div className="slider-title">
            <Link to="/mangas">
              <h2>Best Mangas</h2>
              <div className="arrow-container">
                <div className="arrow"></div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </Link>
            {!isLoading && (
              <div className="slider-pagination">
                {getPagination("mangas")}
              </div>
            )}
          </div>
          {isLoading && (
            <div className="home-loader-container">
              <div className="loader-item"><div className="li"></div></div>
              <div className="loader-item"><div className="li"></div></div>
              <div className="loader-item"><div className="li"></div></div>
              <div className="loader-item"><div className="li"></div></div>
            </div>
          )}
            <div className={isLoading ? "s-container loading" : "s-container"}>
              <div className="btn-left" onClick={() => handleGoLeft("manga")}><FontAwesomeIcon icon={faAngleLeft} /></div>
              <div className="swc">
                <div className="slider-wrapper-container" ref={refSliderManga}>
                  {getSliders("mangas")}
                </div>
              </div>
              <div className="btn-right" onClick={() => handleGoRight("manga")}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
        </div>

        <div className="slider-container">
          <div className="slider-title">
            <Link to="/films">
              <h2>Best Films</h2>
              <div className="arrow-container">
                <div className="arrow"></div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </Link>
            {!isLoading && (
              <div className="slider-pagination">
                {getPagination("films")}
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="home-loader-container">
              <div className="loader-item"><div className="li"></div></div>
              <div className="loader-item"><div className="li"></div></div>
              <div className="loader-item"><div className="li"></div></div>
              <div className="loader-item"><div className="li"></div></div>
            </div>
          ) : (
            <div className="s-container">
              <div className="btn-left" onClick={() => handleGoLeft("film")}><FontAwesomeIcon icon={faAngleLeft} /></div>
              <div className="swc">
                <div className="slider-wrapper-container swcF" ref={refSliderFilm}>
                  {getSliders("films")}
                </div>
              </div>
              <div className="btn-right" onClick={() => handleGoRight("film")}><FontAwesomeIcon icon={faAngleRight} /></div>
            </div>
          )}
        </div>

        {/* <div className="slider-container">
          <div className="slider-title">
            <h2>Best Series</h2>
          </div>
          <div className="slider">
            <div className="slider-item">
              <img src={process.env.REACT_APP_CLIENT_URL + "assets/img/hxh.webp"} alt=''/>
            </div>
            <div className="slider-item">
              <img src={process.env.REACT_APP_CLIENT_URL + "assets/img/hxh.webp"} alt=''/>
            </div>
          </div>
        </div> */}

      </div>

    </div>
  )
}

export default Homepage
