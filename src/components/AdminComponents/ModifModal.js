import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateManga } from '../../actions/allActions'
import { isEmpty } from '../Utils'
import VideoModal from '../VideoModal'
import axios from 'axios'

const ModifModal = (props) => {
  const [isVideo, setIsVideo] = useState(false)
  const [playOnce, setPlayOnce] = useState(true)
  const [epNum, setEpNum] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [element, setElement] = useState()
  const dispatch = useDispatch(null)
  const [filePath, setFilePath] = useState("")

  const handleSetEp = () => {
    if (!isEmpty(filePath)) {
      const data = {
        epNum: epNum,
        title: title,
        desc: desc,
        videoUrl: element.videoUrl,
        thumbnail: filePath
      }
      dispatch(updateManga(props.element._id, data, props.season, epNum))
      
      props.onChange()
    } else {
      const data = {
        epNum: epNum,
        title: title,
        desc: desc,
        videoUrl: element.videoUrl,
        thumbnail: element.thumbnail
      }
      dispatch(updateManga(props.element._id, data, props.season, epNum))
      
      props.onChange()
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
    if (playOnce && !isEmpty(props.element) && !isEmpty(props.season) && !isEmpty(props.epNum)) {
      props.element.seasonsData[props.season].map((item) => {
        return item.epNum === props.epNum && (
          setEpNum(item.epNum),
          setTitle(item.title),
          setDesc(item.desc),
          setElement(item),
          setIsVideo(true),
          setPlayOnce(false)
        )
      })
    }
  }, [playOnce, props.element, props.season, props.epNum])

  return (
    <div className="modal-container">
      <div className="mc-title">
        <h2>{props.element.seasons[props.season]}</h2>
      </div>
      <div className="ep-container-form">
        {isVideo && (
          <>
            {props.element.seasonsData[props.season].map((item) => {
              return item.epNum === props.epNum && (
                <div key={item.epNum}>
                  {isEmpty(item.filePath) && !isEmpty(item.videoUrl) && !isEmpty(item.thumbnail) && (
                    <VideoModal filePath={item.videoUrl} thumbnail={item.thumbnail} />
                  )}
                  {!isEmpty(item.filePath) && isEmpty(item.videoUrl) && !isEmpty(item.thumbnail) && (
                    <VideoModal filePath={item.filePath} thumbnail={item.thumbnail} />
                  )}
                  <div className="input-form">
                    <input type="number" placeholder="Episode number" onChange={(e) => setEpNum(e.target.value)} value={epNum}/>
                  </div>

                  <div className="input-form">
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

                  <div className="input-form">
                    <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                  </div>
                  <div className="input-form">
                    <input type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} value={desc}/>
                  </div>
                  {(item.title !== title || item.desc !== desc || item.epNum !== epNum || item.thumbnail !== filePath) && (
                    <div className="btn-submit" onClick={() => handleSetEp()}>
                      Submit
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default ModifModal
