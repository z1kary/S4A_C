import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getFilm } from '../actions/allActions'
import { isEmpty } from '../components/Utils'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteModal from '../components/AdminComponents/DeleteModal'
import EditModal from '../components/AdminComponents/EditModal'
import FilmModal from '../components/FilmModal'

const Film = () => {
  const filmId = useLocation().pathname.replace('/film/', '')
  const film = useSelector((state) => state.getOneReducer)
  const isAdmin = useSelector((state) => state.userReducer)
  const dispatch = useDispatch(null)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const refEditModal = useRef(null)
  const refDeleteModal = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isEmpty(refEditModal.current) && event.target.className === "modal-wrapper") {
        setEditModal(false)
      } else if (!isEmpty(refDeleteModal.current) && event.target.className === "modal-wrapper") {
        setDeleteModal(false)
      }
    }

    if (!isEmpty(filmId) && isEmpty(film)) {
      dispatch(getFilm(filmId))
    } else if (!isEmpty(filmId) && !isEmpty(film)) {
      if (film._id !== filmId) {
        dispatch(getFilm(filmId))
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dispatch, film, filmId])

  return (
    <div className="page manga-page">
      <div className="manga-wrapper">
        <div className="manga-picture">
          <img src={`${process.env.REACT_APP_API_URL}${film.picture}`} alt=""/>
        </div>
        <div className="manga-details">
          <div className="title">{film.title}</div>
          {film.description === "aaa" ? (
            <div className="null"></div>
          ) : (
            <div className="desc">{film.description}</div>
          )}
        </div>
      </div>
      {!isEmpty(isAdmin) && (
        <div className="admin-controls">
          <div className="btn" onClick={() => setEditModal(true)}><FontAwesomeIcon icon={faPencil} /></div>
          <div className="btn" onClick={() => {
            setDeleteModal(true)
            // setDeleteType("manga")
            }}><FontAwesomeIcon icon={faTrashCan} /></div>
        </div>
      )}

      <div className="manga-container">
        <FilmModal filePath={film.videoUrl} thumbnail={film.thumbnail} />
      </div>

      {editModal && (
        <div className="modal-wrapper" ref={refEditModal}>
          <EditModal manga={film} />
        </div>
      )}
      {deleteModal && (
        <div className="modal-wrapper" ref={refDeleteModal}>
          <DeleteModal manga={film} />
        </div>
      )}
    </div>
  )
}

export default Film
