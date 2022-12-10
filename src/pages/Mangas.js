import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createManga, getMangas } from '../actions/allActions'
import MangaItem from '../components/MangaItem'
import { isEmpty } from '../components/Utils'
import AddMangaModal from '../components/AdminComponents/AddMangaModal'

const Mangas = () => {
  const mangas = useSelector((state) => state.mangasReducer)
  const dispatch = useDispatch(null)
  const [isLoading, setIsLoading] = useState(true)
  const isAdmin = useSelector((state) => state.userReducer)
  const [newModal, setNewModal] = useState(false)
  const refNewModal = useRef(null)

  const handleChangeAdminModal = (e) => {
    if (!isEmpty(e.title)) {
      console.log(e);
      dispatch(createManga(e))
        .then(() => {
          window.location = "/mangas"
        })
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isEmpty(refNewModal.current) && event.target.className === "modal-wrapper") {
        setNewModal(false)
      }
    }

    if (isEmpty(mangas)) {
      dispatch(getMangas())
    }
    if (!isEmpty(mangas)) {
      setIsLoading(false)
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mangas, dispatch])

  return (
    <div className="page mangas-page">
      <div className="title">
        <h1>Mangas</h1>
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
          {mangas.map((item, i) => {
            return (
              <Link to={"/manga/" + item._id} key={i} className="slider-item">
                <MangaItem manga={item} />
              </Link>
            )
          })}
          {/* <div className="manga-item" key={i}>
                <img src={`${process.env.REACT_APP_API_URL}${item.picture}`} alt=""/>
                <div className="cover-item">
                  <div className="title">
                    {item.title}
                  </div>

                </div>
              </div> */}
        </div>
      )}
      {newModal && (
        <div className="modal-wrapper" ref={refNewModal}>
          <AddMangaModal onChange={(e) => handleChangeAdminModal(e)} />
        </div>
      )}
    </div>
  )
}

export default Mangas