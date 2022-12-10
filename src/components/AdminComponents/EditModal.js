import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateManga } from '../../actions/allActions'

const EditModal = (props) => {
  const [title, setTitle] = useState(props.manga.title)
  const [desc, setDesc] = useState(props.manga.description)
  const [picture, setPicture] = useState(props.manga.picture)
  const [format, setFormat] = useState(props.manga.format)
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

  const handleSubmit = () => {

    dispatch(updateManga(props.manga._id, title, desc, picture, format))
      .then(() => window.location = "/manga/" + props.manga._id)
  }

  return (
    <div className="modal">
      <div className="picture">
        <img src={process.env.REACT_APP_API_URL + picture} alt="img"/>
        <div className="cover-img">
          <label htmlFor="formFile">
            <p>Import picture</p>
          </label>
          <input
            onChange={(e) => handleUploadChange(e)}
            type="file"
            id="formFile"
            accept="img/*"
            name="formFile"
          />
        </div>
      </div>
      <div className="details">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)}/>
        <input type="text" value={format} onChange={(e) => setFormat(e.target.value)}/>
        {(props.manga.title !== title || props.manga.description !== desc || props.manga.picture !== picture || props.manga.format !== format) && (
          <div className="btn-submit" onClick={() => handleSubmit()}>Submit</div>
        )}
      </div>
    </div>
  )
}

export default EditModal
