import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getManga } from '../actions/allActions'
import AddEp from '../components/AdminComponents/AddEp'
import DeleteModal from '../components/AdminComponents/DeleteModal'
import EditEpModal from '../components/AdminComponents/EditEpModal'
import EditModal from '../components/AdminComponents/EditModal'
import SModal from '../components/AdminComponents/SModal'
import { isEmpty } from '../components/Utils'

const Manga = () => {
  const mangaId = useLocation().pathname.replace('/manga/', '')
  const manga = useSelector((state) => state.getOneReducer)
  const dispatch = useDispatch(null)
  const [isVf, setIsVf] = useState(false)
  const [isVostfr, setIsVostfr] = useState(true)
  const [isKai, setIsKai] = useState(false)
  const isAdmin = useSelector((state) => state.userReducer)
  const [editMangaModal, setEditMangaModal] = useState(false)
  const [deleteMangaModal, setDeleteMangaModal] = useState(false)
  const [epModal, setEpModal] = useState(false)
  const refEditModal = useRef(null)
  const refDeleteModal = useRef(null)
  const refSeasonModal = useRef(null)
  const refEpModal = useRef(null)
  const refEditEpModal = useRef(null)
  const [season, setSeason] = useState()
  const [deleteType, setDeleteType] = useState("")
  const [deleteData, setDeleteData] = useState("")
  const [editEpModal, setEditEpModal] = useState(false)
  const [editEpData, setEditEpData] = useState()
  const [seasonModal, setSeasonModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleVostfr = () => {
    setIsVostfr(true)
    setIsVf(false)
    setIsKai(false)
  }

  const handleVf = () => {
    setIsVostfr(false)
    setIsVf(true)
    setIsKai(false)
  }

  const handleKai = () => {
    setIsVostfr(false)
    setIsVf(false)
    setIsKai(true)
  }

  const handleChangeDelete = (e) => {
    if (e === "a") {
      setDeleteMangaModal(false)
      if (deleteType === "manga") {
        window.location = "/mangas"
      } else if (deleteType === "ep") {
        window.location = "/manga/" + manga._id
      }
    } else if (e === "b"){
      setDeleteMangaModal(false)
    }
  }

  const handleChangeAddEp = () => {
    setEpModal(false)
    // window.location = "/manga/" + manga._id
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isEmpty(refEditModal.current) && event.target.className === "modal-wrapper") {
        setEditMangaModal(false)
      } else if (!isEmpty(refDeleteModal.current) && event.target.className === "modal-wrapper") {
        setDeleteMangaModal(false)
      } else if (!isEmpty(refEpModal.current) && event.target.className === "modal-wrapper") {
        setEpModal(false)
      } else if (!isEmpty(refEditEpModal.current) && event.target.className === "modal-wrapper") {
        setEditEpModal(false)
      } else if (!isEmpty(refSeasonModal.current) && event.target.className === "modal-wrapper") {
        setSeasonModal(false)
      }
    }

    if (!isEmpty(mangaId) && isEmpty(manga)) {
      dispatch(getManga(mangaId))
      setTimeout(function() {
        setIsLoading(false)
      }.bind(), 500)
    } else if (!isEmpty(mangaId) && !isEmpty(manga)) {
      if (manga._id !== mangaId) {
        setIsLoading(true)
        dispatch(getManga(mangaId))
        setTimeout(function() {
          setIsLoading(false)
        }.bind(), 500)
      }
      if (manga._id === mangaId) {
        setIsLoading(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [manga, mangaId, dispatch])

  return (
    <div className="page manga-page">
      <div className="manga-wrapper">
        <div className="manga-picture">
          {isLoading ? (
            <div className="loading-img"></div>
          ) : (
            <img src={`${process.env.REACT_APP_API_URL}${manga.picture}`} alt=""/>
          )}
        </div>
        <div className="manga-details">
          {isLoading ? (
            <div className="loading-details">
              <div className="loading-title"></div>
              <div className="loading-desc"></div>
              <div className="loading-desc"></div>
              <div className="loading-desc"></div>
            </div>
          ) : (
            <>
              <div className="title">{manga.title}</div>
              {manga.description === "aaa" ? (
                <div className="null"></div>
              ) : (
                <div className="desc">{manga.description}</div>
              )}
            </>
          )}
        </div>
      </div>
      {!isEmpty(isAdmin) && (
        <div className="admin-controls">
          <div className="btn" onClick={() => setEditMangaModal(true)}><FontAwesomeIcon icon={faPencil} /></div>
          <div className="btn" onClick={() => {
            setDeleteMangaModal(true)
            setDeleteType("manga")
            }}><FontAwesomeIcon icon={faTrashCan} /></div>
        </div>
      )}
      {isKai && (
        <div className="txt-kai">
          <p>One Piece Yabai est une refonte amateur de l'anime One Piece qui se veut plus concise, plus conforme au manga original, et offrant un plus grand plaisir de visionnage que ce que l'on peut trouver par ailleurs. Les épisodes, épurés des scènes ajoutées par le studio d'animation, sont compilés sous forme de longs métrages en 1080p 16:9, en soignant la fluidité de la bande son, de la vidéo, ainsi que la cohérence de l'action et la qualité des sous-titres.</p>
        </div>
      )}
      {isLoading && (
        <div className="loading-manga-container">
          <div className="loading-top">
            <div className="title"></div>
            <div className="btns">
              <div className="btn"></div>
              <div className="btn"></div>
            </div>
          </div>

          <div className="loader-container"><div className="loader"></div></div>
        </div>
      )}
      {!isEmpty(manga.seasonsData) && !isLoading && (
        Object.keys(manga.seasonsData).map((doc, i1) => {
          return !isEmpty(manga.seasons[doc]) && (
            <div className="manga-container" key={i1}>
              <div className="title">
                <p>S{i1 + 1} \ {manga.seasons[doc]}</p>
                {doc === "s1" && (
                  <div className="btns">
                    {manga.format.includes("vf") && (
                      <>
                        <span className={isVostfr ? "active" : ""} onClick={() => handleVostfr()}>VOSTFR</span>
                        <span className={isVf ? "active" : ""} onClick={() => handleVf()}>VF</span>
                      </>
                    )}
                    {manga.format.includes("kai") && (
                      manga.format.includes('vf') ? (
                        <span className={isKai ? "active" : ""} onClick={() => handleKai()}>Kai</span>
                      ) : (
                        <>
                          <span className={isVostfr ? "active" : ""} onClick={() => handleVostfr()}>VOSTFR</span>
                          <span className={isKai ? "active" : ""} onClick={() => handleKai()}>Kai</span>
                        </>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="ep-wrapper">
                {isKai && !isEmpty(manga.seasonsData.kai) && (
                  <>
                    {manga.seasonsData.kai.map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/kai/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/kai/ep-${item.epNum}/kai`}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: "kai" })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: "kai", title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason('kai')
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
                {isKai && doc === "s1" && !isEmpty(manga.seasonsData.kaiS1) && (
                  <>
                    {manga.seasonsData.kaiS1.map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/kaiS1/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/kaiS1/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: "kaiS1" })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: "kaiS1", title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason("kaiS1")
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
                {isKai && doc === "s2" && !isEmpty(manga.seasonsData.kaiS2) && (
                  <>
                    {manga.seasonsData.kaiS2.map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/kaiS2/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/kaiS2/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: "kaiS2" })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: "kaiS2", title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason("kaiS2")
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
                {isKai && doc === "s3" && !isEmpty(manga.seasonsData.kaiS3) && (
                  <>
                    {manga.seasonsData.kaiS3.map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/kaiS3/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/kaiS3/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: "kaiS3" })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: "kaiS3", title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason("kaiS3")
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
                {isKai && doc === "s4" && !isEmpty(manga.seasonsData.kaiS4) && (
                  <>
                    {manga.seasonsData.kaiS4.map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/kaiS4/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/kaiS4/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: "kaiS4" })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: "kaiS4", title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason("kaiS4")
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
                {isKai && doc === "s5" && !isEmpty(manga.seasonsData.kaiS5) && (
                  <>
                    {manga.seasonsData.kaiS5.map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/kaiS5/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/kaiS5/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: "kaiS5" })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: "kaiS5", title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason("kaiS5")
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
                {isKai && doc === "s6" && !isEmpty(manga.seasonsData.kaiS6) && (
                  <>
                    {manga.seasonsData.kaiS6.map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/kaiS6/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>Film {item.epNum} \ {item.title}</p>
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/kaiS6/ep-${item.epNum}/kai`} onClick={() => window.scrollTo(0, 0)}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: "kaiS6" })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: "kaiS6", title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason("kaiS6")
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
                {isVf && (
                  manga.seasonsData[doc].map((item, i) => {
                    return (!isEmpty(item.vf) || !isEmpty(item.vfs)) && (
                      <Link to={`/watch/${manga._id}/${doc}/ep-${item.epNum}/vf`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                        <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                        <div className="img-cover">
                          <div className="title-ep">
                            <p>EP{item.epNum} \ {item.title}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                )}
                {isVostfr && (
                  <>
                    {manga.seasonsData[doc].map((item, i) => (
                      isEmpty(isAdmin) ? (
                        <Link to={`/watch/${manga._id}/${doc}/ep-${item.epNum}/vostfr`} onClick={() => window.scrollTo(0, 0)} className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>EP{item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="episode-container" key={i}>
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          <div className="img-cover">
                            <div className="title-ep">
                              <p>EP{item.epNum} \ {item.title}</p>
                              {!isEmpty(item.videoUrls) && (
                                <p>{item.videoUrls.length}</p>
                              )}
                              {isEmpty(item.videoUrl) && isEmpty(item.videoUrls) && (
                                <p>0</p>
                              )}
                              {!isEmpty(item.videoUrl) && isEmpty(item.videoUrls) && (
                                <p>1</p>
                              )}
                              {!isEmpty(item.vfs) && (
                                <p>{item.vfs.length}</p>
                              )}
                              {isEmpty(item.vf) && isEmpty(item.vfs) && (
                                <p>0</p>
                              )}
                              {!isEmpty(item.vf) && isEmpty(item.vfs) && (
                                <p>1</p>
                              )}
                            </div>
                            <div className="btns">
                              <Link to={`/watch/${manga._id}/${doc}/ep-${item.epNum}/vostfr`} onClick={() => window.scrollTo(0, 0)}>Watch</Link>
                              <span onClick={() => {
                                setEditEpModal(true)
                                setEditEpData({ item, season: doc })
                              }}>Edit</span>
                              <span onClick={() => {
                                setDeleteType("ep")
                                setDeleteData({ epNum: item.epNum, season: doc, title: item.title })
                                setDeleteMangaModal(true)
                                }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                    {!isEmpty(isAdmin) && (
                      <div className="add-ep-btn" onClick={() => {
                        setEpModal(true)
                        setSeason(doc)
                        }}>
                        add episode
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })
      )}
      {!isEmpty(isAdmin) && (
        <div className="add-ep-btn" onClick={() => {
          setSeasonModal(true)
          }}>
          add season
        </div>
      )}
      {seasonModal && (
        <div className="modal-wrapper" ref={refSeasonModal}>
          <SModal element={manga} onChange={() => setSeasonModal(false)} />
        </div>
      )}
      {editEpModal && (
        <div className="modal-wrapper" ref={refEditEpModal}>
          <EditEpModal mangaId={manga._id} data={editEpData} onChange={() => setEditEpModal(false)} /> 
        </div>
      )}
      {editMangaModal && (
        <div className="modal-wrapper" ref={refEditModal}>
          <EditModal manga={manga} />
        </div>
      )}
      {deleteMangaModal && (
        <div className="modal-wrapper" ref={refDeleteModal}>
          {deleteType === "manga" && (
            <DeleteModal mId={manga._id} title={manga.title} type={"manga"} onChange={(e) => handleChangeDelete(e)} />
          )}
          {deleteType === "ep" && (
            <DeleteModal mId={manga._id} data={deleteData} type={"ep"} onChange={(e) => handleChangeDelete(e)} />
          )}
        </div>
      )}
      {epModal && (
        <div className="modal-wrapper" ref={refEpModal}>
          <AddEp element={manga} season={season} onChange={() => handleChangeAddEp()}/>
        </div>
      )}
    </div>
  )
}

export default Manga
