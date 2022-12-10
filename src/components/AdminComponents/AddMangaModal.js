import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from '../Utils'
import axios from 'axios'

const AdminModal = (props) => {
  const [title, setTitle] = useState("")
  // const [season, setSeason] = useState("")
  const [s1, setS1] = useState("")
  const [s2, setS2] = useState("")
  const [s3, setS3] = useState("")
  const [s4, setS4] = useState("")
  const [s5, setS5] = useState("")
  const [s6, setS6] = useState("")
  const [s7, setS7] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [format, setFormat] = useState("")
  const [sNum, setSNum] = useState("")
  const [element, setElement] = useState("")
  const [filePath, setFilePath] = useState("")

  const handleCreateManga = () => {
    if (!isEmpty(element.date) && !isEmpty(filePath) && !isEmpty(element.title) && !isEmpty(element.description) && !isEmpty(element.format) && !isEmpty(element.seasons)) {
      const data = {
        date: element.date,
        format: element.format,
        picture: filePath,
        title: element.title,
        description: element.description,
        seasons: element.seasons,
        seasonsData: element.seasonsData
      }
      props.onChange(data)
    }
  }

  // const handleSetEpModal = (e) => {
  //   // setSeason(e)
  //   if (!isEmpty(title) && !isEmpty(description) && !isEmpty(format) && !isEmpty(date)) {
  //     if (sNum === 1) {
  //       const data = {
  //         date: date,
  //         format: format,
  //         title: title,
  //         description: description,
  //         seasons: {
  //           s1: s1
  //         },
  //         seasonsData: {
  //           s1: []
  //         }
  //       }

  //       setElement(data)
  //       const type = "epModal"
  //       const nd = {
  //         data,
  //         e
  //       }
  //       props.onChange(type, nd)
  //     } else if (sNum === 2) {
  //       const data = {
  //         date: date,
  //         format: format,
  //         title: title,
  //         description: description,
  //         seasons: {
  //           s1: s1,
  //           s2: s2
  //         },
  //         seasonsData: {
  //           s1: element.seasonsData.s1,
  //           s2: element.seasonsData.s2
  //         }
  //       }
  //       setElement(data)
  //       const type = "epModal"
  //       const nd = {
  //         data,
  //         season: e
  //       }
  //       props.onChange(type, nd)
  //     }
  //   }
  // }

  const handleCreateElement = () => {
    if (!isEmpty(s1) && isEmpty(s2) && isEmpty(s3) && isEmpty(s4) && isEmpty(s5)) {
      const data = {
        date: date,
        format: format,
        title: title,
        description: description,
        seasons: {
          s1: s1
        },
        seasonsData: {
          s1: []
        }
      }
      setElement(data)
    } else if (!isEmpty(s1) && !isEmpty(s2) && isEmpty(s3) && isEmpty(s4) && isEmpty(s5)) {
      const data = {
        date: date,
        format: format,
        title: title,
        description: description,
        seasons: {
          s1: s1,
          s2: s2
        },
        seasonsData: {
          s1: [],
          s2: []
        }
      }
      setElement(data)
    } else if (!isEmpty(s1) && !isEmpty(s2) && !isEmpty(s3) && isEmpty(s4) && isEmpty(s5)) {
      const data = {
        date: date,
        format: format,
        title: title,
        description: description,
        seasons: {
          s1: s1,
          s2: s2,
          s3: s3
        },
        seasonsData: {
          s1: [],
          s2: [],
          s3: []
        }
      }
      setElement(data)
    } else if (!isEmpty(s1) && !isEmpty(s2) && !isEmpty(s3) && !isEmpty(s4) && isEmpty(s5)) {
      const data = {
        date: date,
        format: format,
        title: title,
        description: description,
        seasons: {
          s1: s1,
          s2: s2,
          s3: s3,
          s4: s4
        },
        seasonsData: {
          s1: [],
          s2: [],
          s3: [],
          s4: []
        }
      }
      setElement(data)
    } else if (!isEmpty(s1) && !isEmpty(s2) && !isEmpty(s3) && !isEmpty(s4) && !isEmpty(s5)) {
      const data = {
        date: date,
        format: format,
        title: title,
        description: description,
        seasons: {
          s1: s1,
          s2: s2,
          s3: s3,
          s4: s4,
          s5: s5
        },
        seasonsData: {
          s1: [],
          s2: [],
          s3: [],
          s4: [],
          s5: []
        }
      }
      setElement(data)
    }
  }

  const handleUploadChange = (e) => {
    if (maxSelectFile(e.target.files)) {

      // setTitle(e.target.files[0].name.replace('.mp4', ""))

      let formData = new FormData();
      formData.append("file", e.target.files[0]);

      const config = {
        header: { 'content-type': 'multipart/form-data' }
      }

      axios.post(`${process.env.REACT_APP_API_URL}api/uploadFile`, formData, config)
        .then((res) => {
          if (res.data.success) {
            setFilePath(res.data.url)
          } else {
            console.log("error fail to save video in server");
          }
        })
    }
  }

  const maxSelectFile = (file) => {
    if (file.length > 1) {
      // toast.error('Maximum 1 file is allowed');
      return false;
    } else {
      if (file.size > 100000000) { // 100 MB
        // toast.error(file.name + " is/are too large. Please select file size < 100Mb");
        return false
      }
    }
    return true
  }


  useEffect(() => {
    if (!isEmpty(props.element)) {
      setElement(props.element)
    }
    if (isEmpty(element.title)) {
      const fakeData = {
        date: "",
        format: "",
        title: "",
        description: "",
        seasons: {
          s1: ""
        },
        seasonsData: {
          s1: ""
        },
        picture: ""
      }
      setElement(fakeData)
    }
  }, [props.element, element.title])

  return (
    <div className="modal-container">
      {/* <div className="btn-wrapper">
        <div className={category === "manga" ? "btn active" : "btn"} onClick={() => setCategory("manga")}>
          <span>Manga</span>
        </div>
        <div className={category === "film" ? "btn active" : "btn"} onClick={() => setCategory("film")}>
          <span>Film</span>
        </div>
        <div className={category === "serie" ? "btn active" : "btn"} onClick={() => setCategory("serie")}>
          <span>Serie</span>
        </div>
      </div> */}
      {/* {!isEmpty(category) && category === "manga" && ( */}
          <div className="form-input-div">
            <div className="form-input">
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Manga date"/>
            </div>
            <div className="form-input">
              <input type="text" value={format} onChange={(e) => setFormat(e.target.value)} placeholder="Format of the video ex : vosftr vo"/>
            </div>
          </div>
          <div className="form-input">
            <input type="number" onChange={(e) => setSNum(parseInt(e.target.value))} placeholder="How much season ?" value={sNum}/>
          </div>
          {!isEmpty(sNum) && (
            <>
              {sNum >= 1 && (
                <div className="form-input">
                  <input type="text" onChange={(e) => setS1(e.target.value)} placeholder="Season 1 title" value={s1}/>
                  {!isEmpty(s1) && (
                    <div className="small-thumb-container">
                      {isEmpty(element.seasonsData.s1) ? (
                        <div className="small-thumb">
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      ) : (
                        element.seasonsData.s1.map((item, i) => {
                          return (
                            <div className="small-thumb-img" key={i}>
                              {isEmpty(item.thumbnail) ? (
                                <video src={item.videoUrl}></video>
                              ) : (
                                <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                  )}
                </div>
              )}
              {sNum >= 2 && (
                <div className="form-input">
                  <input type="text" onChange={(e) => setS2(e.target.value)} placeholder="Season 2 title" value={s2}/>
                  {!isEmpty(s2) && (
                    <div className="small-thumb-container">
                      {isEmpty(element.seasonsData.s2) ? (
                        <div className="small-thumb">
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      ) : (
                        element.seasonsData.s2.map((item, i) => {
                          return (
                            <div className="small-thumb-img" key={i}>
                              {isEmpty(item.thumbnail) ? (
                                <video src={item.videoUrl}></video>
                              ) : (
                                <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                              )}
                            </div>
                          )
                        })
                      )} 
                    </div>
                  )}
                </div>
              )}
              {sNum >= 3 && (
                <div className="form-input">
                  <input type="text" onChange={(e) => setS3(e.target.value)} placeholder="Season 3 title" value={s3}/>
                </div>
              )}
              {sNum >= 4 && (
                <div className="form-input">
                  <input type="text" onChange={(e) => setS4(e.target.value)} placeholder="Season 4 title" value={s4}/>
                </div>
              )}
              {sNum >= 5 && (
                <div className="form-input">
                  <input type="text" onChange={(e) => setS5(e.target.value)} placeholder="Season 5 title" value={s5}/>
                </div>
              )}
              {sNum >= 6 && (
                <div className="form-input">
                  <input type="text" onChange={(e) => setS6(e.target.value)} placeholder="Season 6 title" value={s6}/>
                </div>
              )}
              {sNum >= 7 && (
                <div className="form-input">
                  <input type="text" onChange={(e) => setS7(e.target.value)} placeholder="Season 7 title" value={s7}/>
                </div>
              )}
            </>
          )}
          <div className="form-input">
            <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Manga title" value={title}/>
          </div>
          <div className="form-input">
            <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" value={description}/>
          </div>
          <div className="form-input">
            <label htmlFor="formFile">
              <p>Import picture</p>
            </label>
            <input
              onChange={(e) => handleUploadChange(e)}
              className="form-control"
              type="file"
              id="formFile"
              accept="img/*"
              name="formFile"
            />
          </div>
          {isEmpty(element.title) ? ( 
            <div className="btn-submit" onClick={() => handleCreateElement()}>Create element</div>
          ) : (
            <div className="btn-submit" onClick={() => handleCreateManga()}>Save and close</div>
          )}
      {/* )} */}
    </div>
  )
}

export default AdminModal
