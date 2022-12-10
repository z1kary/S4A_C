import React, { useState } from 'react'
// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { isEmpty } from '../components/Utils'
// import { Link } from 'react-router-dom'
// import EpModal from '../components/AdminComponents/EpModal'
// import AdminModal from '../components/AdminComponents/AdminModal'
// import { createManga } from '../actions/allActions'
import axios from 'axios'
import { isEmpty } from '../components/Utils'

const Admin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // const [isModal, setIsModal] = useState(false)
  // const [season, setSeason] = useState("")
  // const refModal = useRef(null)
  // const alls = useSelector((state) => state.getAllsReducer)
  // const [epModal, setEpModal] = useState(false)
  // const [element, setElement] = useState()
  // const [newElement, setNewElement] = useState()
  // const refEpModal = useRef(null)
  // const dispatch = useDispatch(null)

  // const runCallback = (cb) => {
  //   return cb();
  // };

  // const handleChangeEpModal = (e) => {
  //   if (season === "s1") {
  //     const data = {
  //       date: element.date,
  //       format: element.format,
  //       title: element.title,
  //       description: element.description,
  //       seasons: element.seasons,
  //       seasonsData: {
  //         s1: [e],
  //         s2: element.seasonsData.s2
  //       }
  //     }
  //     setNewElement(data)
  //   } else if (season === "s2") {
  //     console.log(element);
  //     const data = {
  //       date: element.date,
  //       format: element.format,
  //       title: element.title,
  //       description: element.description,
  //       seasons: element.seasons,
  //       seasonsData: {
  //         s1: element.seasonsData.s1,
  //         s2: [e]
  //       }
  //     }
  //     console.log(data);
  //     setNewElement(data)
  //   }
  //   setEpModal(false)
  // }

  // const handleChangeAdminModal = (e, a) => {
  //   if (e === "create") {
  //     if (isEmpty(season)) {
  //       setElement(a.data);
  //       console.log(a.data);
  //       dispatch(createManga(a.data))
  //     } else {
  //       console.log(element);
  //       dispatch(createManga(element))
  //     }
  //     setIsModal(false)
  //     window.location.reload()
  //   } else if (e === "epModal") {
  //     setElement(a.data);
  //     setSeason(a.season);
  //     setEpModal(true)
  //   }
  // }

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (!isEmpty(refModal.current) && event.target.className === "modal-wrapper") {
  //       setIsModal(false)
  //     } else if (!isEmpty(refEpModal.current) && event.target.className === "ep-modal-wrapper") {
  //       setEpModal(false)
  //     }
  //   }
    
  //   // console.log("test");

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  // }, [isModal])

  const handleLogin = () => {
    if (!isEmpty(username) && !isEmpty(password)) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/login`,
        withCredentials: true,
        data: {
          username,
          password
        }
      })
      .then((res) => {
        console.log(res.data);
        if (!isEmpty(res.data.username)) {
          window.location = "/"
        }
        // if (res.data.success) {}
      })
      .catch((err) => console.log(err))
    }
  }

  return (
    <div className="page admin-page">
      <div className="admin-container">
        <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className="submit" onClick={() => handleLogin()}>Submit</div>
      </div>
      {/* <div>
        <button onClick={() => setIsModal(true)}>Create</button>
      </div>
      {!isEmpty(alls.mangas) && (
        <div className="mangas-wrapper">
          {alls.mangas.map((manga) => {
            return (
              <div key={manga._id} className="manga-container" style={{backgroundImage: `url("${process.env.REACT_APP_API_URL}${manga.picture}")`}}>
                <div className="title">
                  <h2>{manga.title}</h2>
                  <Link to={`/admin/modif/${manga._id}`} className="btn-modif">
                    <span>Modify</span>
                  </Link>
                </div>
                <div className="seasons-wrapper">
                  {!isEmpty(manga.seasons) && (
                    runCallback(() => {
                      const row = []
                      for (let i = 1; i <= manga.seasons.length; i++) {
                        row.push(<div className={"season-container " + i} key={i}><h3>S{i}</h3></div>)
                      }
                      return row
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      {isModal && (
        <div className="modal-wrapper" ref={refModal}>
          <AdminModal element={newElement} onChange={(e, a) => handleChangeAdminModal(e, a)} />
        </div>
      )}
      {epModal && (
        <div className="ep-modal-wrapper" ref={refEpModal}>
          <EpModal element={element} season={season} onChange={(e) => handleChangeEpModal(e)} type={"create"} />
        </div>
      )} */}
    </div>
  )
}

export default Admin
