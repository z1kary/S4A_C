import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFilms } from '../actions/allActions'
import AddFilmModal from '../components/AdminComponents/AddFilmModal'
import MangaItem from '../components/MangaItem'
import { isEmpty } from '../components/Utils'

const Films = () => {
  const isAdmin = useSelector((state) => state.userReducer)
  const [newModal, setNewModal] = useState(false)
  const refNewModal = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const films = useSelector((state) => state.filmsReducer)
  const dispatch = useDispatch(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isEmpty(refNewModal.current) && event.target.className === "modal-wrapper") {
        setNewModal(false)
      }
    }

    if (isEmpty(films)) {
      dispatch(getFilms())
    }
    if (!isEmpty(films)) {
      setIsLoading(false)
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dispatch, films])

  return (
    <div className="page mangas-page">
      <div className="title">
        <h1>Films</h1>
        {!isEmpty(isAdmin) && (
          <div className="add-one" onClick={() => setNewModal(true)}>
            add new
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="loader">

        </div>
      ) : (
        <div className="mangas-container">
          {films.map((item, i) => {
            return (
              <Link to={"/film/" + item._id} key={i} className="slider-item">
                <MangaItem manga={item} />
              </Link>
            )
          })}
        </div>
      )}
      {newModal && (
        <div className="modal-wrapper" ref={refNewModal}>
          {/* <AddMangaModal onChange={(e) => handleChangeAdminModal(e)} /> */}
          <AddFilmModal onChange={() => {
            setNewModal(false)
            window.location = "/films"
            }}/>
        </div>
      )}
    </div>
  )
}

export default Films
