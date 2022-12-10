import React, { useState } from 'react'
import axios from 'axios'
import { isEmpty } from '../Utils'
import { createFilm } from '../../actions/allActions'
import { useDispatch } from 'react-redux'

const AddFilmModal = (props) => {
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [picture, setPicture] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch(null)

  const handleUploadChange = (e) => {
    if (maxSelectFile(e.target.files)) {

      let formData = new FormData();
      formData.append("file", e.target.files[0]);

      const config = {
        header: { 'content-type': 'multipart/form-data' }
      }

      axios.post(`${process.env.REACT_APP_API_URL}api/uploadFile`, formData, config)
        .then((res) => {
          if (res.data.success) {
            setPicture(res.data.url)
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

  const handleCreateFilm = () => {
    setIsLoading(true)
    let variable = {
      url: videoUrl,
      fileName: title
    }

    axios.post(`${process.env.REACT_APP_API_URL}api/thumbnail`, variable)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          // setThumbnail(res.data.url)
          const data = {
            title: title,
            description: description,
            date: date,
            videoUrl: videoUrl,
            picture: picture,
            thumbnail: res.data.url
          }

          dispatch(createFilm(data))
          setIsLoading(false)
          props.onChange()
        } else {
          console.log('Failed to make the thumbnail aaa');
          setIsLoading(false)
        }
      })
  }

  return (
    <div className="modal-container">
      <div className="form-input">
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Film date"/>
      </div>
      <div className="form-input">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
      </div>
      <div className="form-input">
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>
      </div>
      <div className="form-input">
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="Video URL"/>
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
      {!isEmpty(date) && !isEmpty(title) && !isEmpty(description) && !isEmpty(videoUrl) && !isEmpty(picture) && (
        isLoading ? (
          <div className="btn-submit">Loading ...</div>
        ) : (
          <div className="btn-submit" onClick={() => handleCreateFilm()}>Save and close</div>
        )
      )}
    </div>
  )
}

export default AddFilmModal
