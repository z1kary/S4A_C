import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import VideoModal from '../VideoModal'
import { isEmpty } from '../Utils'
import { useDispatch } from 'react-redux'
import { addEpisode, setNewVideo } from '../../actions/allActions'

const AddEp = (props) => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [epNum, setEpNum] = useState("")
  const [isVideo, setIsVideo] = useState(false)
  const [filePath, setFilePath] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [part2, setPart2] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [fileName, setFileName] = useState("")
  const dispatch = useDispatch(null)
  const [isLoading, setIsLoading] = useState(false)
  const [season, setSeason] = useState("")

  const handleUploadChange = (e) => {
    if (maxSelectFile(e.target.files)) {

      // setTitle(e.target.files[0].name.replace('.mp4', ""))
      setIsVideo(true)

      let formData = new FormData();
      formData.append("file", e.target.files[0]);

      const config = {
        header: { 'content-type': 'multipart/form-data' }
      }

      axios.post(`${process.env.REACT_APP_API_URL}api/uploadFile`, formData, config)
        .then((res) => {
          if (res.data.success) {

            let variable = {
              url: res.data.url,
              fileName: res.data.fileName
            }

            setFilePath(res.data.url)
            // setFileName(res.data.fileName)

            axios.post(`${process.env.REACT_APP_API_URL}api/thumbnail`, variable)
              .then(res => {
                if (res.data.success) {
                  // setDuration(res.data.fileDuration)
                  setThumbnail(res.data.url)

                } else {
                  console.log('Failed to make the thumbnail');
                }
              })

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

  const handleAddEpisode = () => {
    if (isEmpty(videoUrl) && !isEmpty(epNum) && !isEmpty(title) && !isEmpty(desc) && !isEmpty(filePath) && !isEmpty(thumbnail)) {
      const data = {
        epNum: epNum.toString(),
        title: title,
        desc: desc,
        filePath: filePath,
        thumbnail: thumbnail
      }
      dispatch(addEpisode(props.element._id, data, season))

      props.onChange()

    } else if (!isEmpty(videoUrl) && !isEmpty(epNum) && !isEmpty(title) && !isEmpty(desc) && !isEmpty(fileName) && isEmpty(filePath)) {
      setIsLoading(true)
      let variable = {
        url: videoUrl,
        fileName: fileName
      }

      axios.post(`${process.env.REACT_APP_API_URL}api/thumbnail`, variable)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            // setDuration(res.data.fileDuration)
            setThumbnail(res.data.url)

            if (!isEmpty(part2)) {

              const data = {
                epNum: epNum.toString(),
                title: title,
                desc: desc,
                videoUrl: videoUrl,
                part2: part2,
                thumbnail: res.data.url
              }

              dispatch(addEpisode(props.element._id, data, season))
              setIsLoading(false)
              props.onChange()
            } else {
              const data = {
                epNum: epNum.toString(),
                title: title,
                desc: desc,
                videoUrl: videoUrl,
                thumbnail: res.data.url
              }

              dispatch(addEpisode(props.element._id, data, season))
              setIsLoading(false)
              props.onChange()
            }
          } else {
            // console.log();
            // console.log('Failed to make the thumbnail aaa');
            setIsLoading(false)
          }
        })
    } else if (!isEmpty(epNum) && !isEmpty(title) && !isEmpty(desc) && isEmpty(filePath) && !isEmpty(videoUrl) && isEmpty(fileName) && !isEmpty(thumbnail)) {
      const data = {
        epNum: epNum.toString(),
        title: title,
        desc: desc,
        videoUrl: videoUrl,
        thumbnail: thumbnail
      }
      dispatch(addEpisode(props.element._id, data, season))
      props.onChange()
    }
  }

  const handleAddArrayEp = () => {
    if (!isEmpty(epNum) && !isEmpty(title) && !isEmpty(desc) && !isEmpty(filePath) && !isEmpty(thumbnail) && isEmpty(videoUrl)) {
      const data = {
        epNum: epNum.toString(),
        title: title,
        desc: desc,
        filePath: filePath,
        thumbnail: thumbnail
      }
      dispatch(setNewVideo(data, season))
      props.onChange(data)
    } else if (!isEmpty(epNum) && !isEmpty(title) && !isEmpty(desc) && isEmpty(filePath) && !isEmpty(videoUrl) && !isEmpty(fileName) && isEmpty(thumbnail)){
      setIsLoading(true)
      let variable = {
        url: videoUrl,
        fileName: fileName
      }

      axios.post(`${process.env.REACT_APP_API_URL}api/thumbnail`, variable)
        .then(res => {
          if (res.data.success) {
            const data = {
              epNum: epNum.toString(),
              title: title,
              desc: desc,
              videoUrl: videoUrl,
              thumbnail: res.data.url
            }
            setIsLoading(false)
            dispatch(setNewVideo(data, season))
            props.onChange(data)
          } else {
            setIsLoading(false)
            console.log('Failed to make the thumbnail');
          }
        })
    }
  }

  useEffect(() => {
    if (!isEmpty(props.element.seasonsData[props.season])) {
      setEpNum(props.element.seasonsData[props.season].length + 1)
    } else {
      setEpNum("1")
    }
    if (isEmpty(season)) {
      setSeason(props.season)
    }
  }, [props.element, props.season, season])

  return (
    <div className="modal">
      <div className="ep-container-form">
        <div className="input-form">
          <input type="number" placeholder="Episode number" onChange={(e) => setEpNum(e.target.value)} value={epNum}/>
        </div>
        <div className="input-form">
          <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
        </div>
        <div className="input-form">
          <input type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} value={desc}/>
        </div>
        {!isVideo && (
          <div className="input-form-wrapper">
            <div className="input-form-container">
              <label htmlFor="formFile" className=""><i className="fas fa-upload"></i></label>
              <label htmlFor="formFile" className="">
                <p>Import video</p>
              </label>
              <input
                onChange={(e) => handleUploadChange(e)}
                className="form-control"
                type="file"
                id="formFile"
                accept="video/*"
                name="formFile"
              />
            </div>
            <span className="middle">OR</span>
            <div className="input-form-container">
              <div className="input-form">
                <input type="text" placeholder="Set url of video" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}/>
              </div>
              <div className="input-form">
                <input type="text" placeholder="Set url of part 2" value={part2} onChange={(e) => setPart2(e.target.value)}/>
              </div>
              <div className="input-form">
                <input type="text" placeholder="Set file name ex : 'op-01.mp4'" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
              </div>
              <div className="input-form">
                <input type="text" placeholder="Set thumbnail path" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)}/>
              </div>
            </div>
          </div>
        )}
        {/* { (
          <>
            {isEmpty(filePath) && !isEmpty(videoUrl) && !isEmpty(thumbnail) && (
              <VideoModal filePath={videoUrl} thumbnail={thumbnail} />
            )}
            {!isEmpty(filePath) && isEmpty(videoUrl) && !isEmpty(thumbnail) && (
              <VideoModal filePath={filePath} thumbnail={thumbnail} /> 
            )}
          </>
        )} */}
        {isLoading ? (
          <div className="loading">Loading ...</div>
        ) : (
          <>
            {props.type === "create" ? (
              <button className="btn-submit" onClick={() => handleAddArrayEp()}>Add Episode</button>
            ) : (
              <button className="btn-submit" onClick={() => handleAddEpisode()}>Add Episode</button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AddEp
