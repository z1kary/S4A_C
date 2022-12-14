import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createManga, getMangas } from '../actions/allActions'
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
      setTimeout(function() {
        setIsLoading(false)
      }.bind(), 500)
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mangas, dispatch])

  return (
    <div className="page mangas-page">
      <div className="title">
        {/* <h1>Mangas</h1> */}
        {!isEmpty(isAdmin) && (
          <div className="add-one" onClick={() => setNewModal(true)}>
            add new
          </div>
        )}
      </div>
      <div className="wrapped-mangas">
        {isLoading ? (
          <>
            <div className="loader-manga-item manga-item-container">
              <div className="picture-load"></div>
              <div className="right-container">
                <div className="title-load-r"></div>
                <div className="desc-load-r"></div>
                <div className="desc-load-r"></div>
                <div className="desc-load-r"></div>
                <div className="tags-load">
                  <div className="tag-container-load"></div>
                  <div className="tag-container-load"></div>
                  <div className="tag-container-load"></div>
                </div>
              </div>
            </div> 
            <div className="loader-manga-item manga-item-container">
              <div className="picture-load"></div>
              <div className="right-container">
                <div className="title-load-r"></div>
                <div className="desc-load-r"></div>
                <div className="desc-load-r"></div>
                <div className="desc-load-r"></div>
                <div className="tags-load">
                  <div className="tag-container-load"></div>
                  <div className="tag-container-load"></div>
                  <div className="tag-container-load"></div>
                </div>
              </div>
            </div> 
          </>
        ) : (
          <>
            <Link to="/manga/one-piece" className='manga-item-container' onClick={() => window.scrollTo(0, 0)}>
              <div className="picture">
                <img src={process.env.REACT_APP_API_URL + "uploads/one-piece-bg.jpeg"} alt="opbg" />
              </div>
              <div className="right-container">
                <div className="title-right">One Piece - All Saga</div>
                <div className="description-right">Monkey. D. Luffy refuse de laisser quiconque ou quoi que ce soit faire obstacle ?? sa qu??te pour devenir le roi de tous les pirates. Avec un parcours affr??t?? pour les eaux tra??tresses de Grand Line et au-del??, c'est un capitaine qui n'abandonnera jamais tant qu'il n'aura pas r??clam?? le plus grand tr??sor de la Terre : le l??gendaire One Piece !</div>
                <div className="tags">
                  <div className="tag-container">
                    <span>HD 1080p</span>
                  </div>
                  <div className="tag-container">
                    <span>VostFR</span>
                  </div>
                  <div className="tag-container">
                    <span>VF</span>
                  </div>
                </div>
              </div>
            </Link>
            {mangas.map((item, i) => {
              return !item.title.includes('One Piece') && (
                <Link to={"/manga/" + item._id} key={i} className="manga-item-container" onClick={() => window.scrollTo(0, 0)}>
                  <div className="picture">
                    <img src={process.env.REACT_APP_API_URL + item.picture} alt={i + "bg"} />
                  </div>
                  <div className="right-container">
                    <div className="title-right">{item.title}</div>
                    {item.description !== "aaa" && (
                      <div className="description-right">{item.description}</div>
                    )}
                    <div className="tags">
                      {item.format.map((item, i) => (
                        <div className="tag-container" key={i}>
                          {(item === "vf" && (
                            <span>VF</span>
                          ))}
                          {(item === "vostfr" && (
                            <span>VostFR</span>
                          ))
                          }
                          {item === "kai" && (
                            <span>Kai</span>
                          )}
                          {item === "hd" && (
                            <span>HD 1080p</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </>
        )}
      </div>
      {newModal && (
        <div className="modal-wrapper" ref={refNewModal}>
          <AddMangaModal onChange={(e) => handleChangeAdminModal(e)} />
        </div>
      )}
    </div>
  )
}

export default Mangas