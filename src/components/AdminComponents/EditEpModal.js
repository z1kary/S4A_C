import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateMangaEp } from '../../actions/allActions'
import { isEmpty } from '../Utils'

const EditEpModal = (props) => {
  const [title, setTitle] = useState(props.data.item.title)
  const [desc, setDesc] = useState(props.data.item.desc)
  const [epNum, setEpNum] = useState(props.data.item.epNum)
  const [thumbnail, setThumbnail] = useState(props.data.item.thumbnail)
  const [videoUrl, setVideoUrl] = useState()
  const [videoUrls, setVideoUrls] = useState()
  const [vfs, setVfs] = useState()
  const [isPart2, setIsPart2] = useState(false)
  const [part2, setPart2] = useState(props.data.item.part2)
  const [pageUrl, setPageUrl] = useState(!isEmpty(props.data.item.pageUrl) ? (props.data.item.pageUrl) : "")
  const [vf, setVF] = useState()
  const dispatch = useDispatch(null)
  const [isAddUrl, setIsAddUrl] = useState(false)
  const [isAddVf, setIsAddVf] = useState(false)
  const [addUrl, setAddUrl] = useState("")
  const [addVf, setAddVf] = useState("")

  const handleSubmit = () => {
    if (isAddUrl && !isEmpty(addUrl)) {
      if (!isEmpty(videoUrls)) {
        videoUrls.push(addUrl)
        const data = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrls,
          vf,
          vfs,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, data, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      } else if (!isEmpty(videoUrl)) {
        const data = [videoUrl, addUrl]
        setVideoUrl("")
        const ndata = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrls: data,
          vf,
          vfs,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, ndata, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      }
    } else if (isAddVf && !isEmpty(addVf)) {
      if (!isEmpty(vfs)) {
        vfs.push(addVf)
        const data = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrl,
          videoUrls,
          vfs,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, data, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      } else if (!isEmpty(vf)) {
        const data = [vf, addVf]
        setVF("")
        const ndata = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrl,
          videoUrls,
          vfs: data,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, ndata, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      }
    } else if (isAddUrl && isAddVf && !isEmpty(addUrl) && !isEmpty(addUrl)) {
      if (!isEmpty(vfs) && !isEmpty(videoUrls)) {
        vfs.push(addVf)
        videoUrls.push(addUrl)
        const data = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrls,
          vfs,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, data, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      } else if (!isEmpty(vf) && !isEmpty(videoUrl)) {
        const dataa = [vf, addVf]
        const datab = [videoUrl, addUrl]
        setVF("")
        setVideoUrl("")
        const ndata = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrl,
          videoUrls: datab,
          vfs: dataa,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, ndata, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      } else if (!isEmpty(vfs) && isEmpty(videoUrls)) {
        vfs.push(addVf)
        const data = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrl,
          videoUrls,
          vfs,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, data, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      } else if (!isEmpty(videoUrls) && isEmpty(vfs)) {
        videoUrls.push(addUrl)
        const data = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrls,
          vf,
          vfs,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, data, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      } else if (!isEmpty(vf) && isEmpty(videoUrl)) {
        const data = [vf, addVf]
        setVF("")
        const ndata = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrl,
          videoUrls,
          vfs: data,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, ndata, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      } else if (!isEmpty(videoUrl) && isEmpty(vf)) {
        const data = [videoUrl, addUrl]
        setVideoUrl("")
        const ndata = {
          title,
          desc,
          epNum,
          thumbnail,
          videoUrls: data,
          vf,
          vfs,
          part2
        }
        dispatch(updateMangaEp(props.mangaId, ndata, props.data.season, props.data.item.epNum))
          .then(() => props.onChange())
      }
    } else {
      const data = {
        title,
        desc,
        epNum,
        thumbnail,
        videoUrl,
        videoUrls,
        vf,
        vfs,
        part2
      }

      dispatch(updateMangaEp(props.mangaId, data, props.data.season, props.data.item.epNum))
        .then(() => props.onChange())
    } 
    
  }

  const handleChangeUrls = (e, a) => {
    const data = videoUrls.map((item, i) => {
      if (i === a) {
        return e
      } else {
        return item
      }
    })
    setVideoUrls(data)
  }

  const handleChangeVfs = (e, a) => {
    const data = vfs.map((item, i) => {
      if (i === a) {
        return e
      } else {
        return item
      }
    })
    setVfs(data)
  }

  const handleDeleteUrl = (e) => {
    const removed = videoUrls.splice(e, 1)
    console.log(videoUrls);
    console.log(removed);
  }

  useEffect(() => {
    if (!isEmpty(props.data.item.videoUrl)) {
      setVideoUrl(props.data.item.videoUrl)
    } else if (!isEmpty(props.data.item.videoUrls)) {
      setVideoUrls(props.data.item.videoUrls)
    }
    if (!isEmpty(props.data.item.vf)) {
      setVF(props.data.item.vf)
    } else if (!isEmpty(props.data.item.vfs)) {
      setVfs(props.data.item.vfs)
    }
  }, [props.data.item.videoUrl, props.data.item.videoUrls, props.data.item.vf, props.data.item.vfs])

  return (
    <div className="modal modal-edit-ep">
      <input type="text" value={epNum} placeholder="Ep num" onChange={(e) => setEpNum(e.target.value)}/>
      <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" value={desc} placeholder="Desc" onChange={(e) => setDesc(e.target.value)}/>
      {(!isEmpty(videoUrl) || (isEmpty(videoUrl) && isEmpty(videoUrls))) && (
        <>
          <p>Urls</p>
          <input type="text" value={videoUrl} placeholder="Video Url" onChange={(e) => setVideoUrl(e.target.value)}/>
          {isAddUrl && (
            <input type="text" value={addUrl} placeholder="Video Url" onChange={(e) => setAddUrl(e.target.value)}/>
          )}
          <p className="btn-add" onClick={() => setIsAddUrl(true)}>add url</p>
        </>
      )}
      {!isEmpty(videoUrls) && (
        <div className="urls-container">
          <p>Urls</p>
          {videoUrls.map((item, i) => (
            <input key={i} type="text" value={item} placeholder="Video Url" onChange={(e) => handleChangeUrls(e.target.value, i)}/>
          ))}
          {/* <div key={i}>
              <p onClick={() => handleDeleteUrl(i)}>X</p>
            </div> */}
          {isAddUrl && (
            <input type="text" value={addUrl} placeholder="Video Url" onChange={(e) => setAddUrl(e.target.value)}/>
          )}
          {videoUrls.length <= 2 && !isAddUrl && (
            <p className="btn-add" onClick={() => setIsAddUrl(true)}>add url</p>
          )}
        </div>
      )}
      {isEmpty(part2) && !isPart2 && (
        <p className="btn-add" onClick={() => setIsPart2(true)}>Add part 2</p>
      )}
      {(isPart2 || !isEmpty(part2)) && (
        <input type="text" value={part2} placeholder="Part 2" onChange={(e) => setPart2(e.target.value)}/>
      )}

      {(!isEmpty(vf) || (isEmpty(vf) && isEmpty(vfs))) && (
        <div className="urls-container">
          <p>Vf</p>
          <input type="text" value={vf} onChange={(e) => setVF(e.target.value)} placeholder="vf"/>
          {isAddVf && (
            <input type="text" value={addVf} onChange={(e) => setAddVf(e.target.value)} placeholder="vf"/>
          )}
          <p className="btn-add" onClick={() => setIsAddVf(true)}>add url</p>
        </div>
      )} 
      {!isEmpty(vfs) && (
        <div className="urls-container">
          <p>Vf Urls</p>
          {vfs.map((item, i) => (
            <input key={i} type="text" value={item} placeholder="Video Url" onChange={(e) => handleChangeVfs(e.target.value, i)}/>
          ))}
          {isAddVf && (
            <input type="text" value={addVf} placeholder="Video Url" onChange={(e) => setAddVf(e.target.value)}/>
          )}
          {vfs.length <= 2 && !isAddVf && (
            <p className="btn-add" onClick={() => setIsAddVf(true)}>add url</p>
          )}
        </div>
      )}
      <input type="text" value={pageUrl} style={{display: "none"}} placeholder="Set page URL" onChange={(e) => setPageUrl(e.target.value)}/>

      <div className="thumbnail-container">
        <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)}/>

        <div className="img">
          <img src={process.env.REACT_APP_API_URL + thumbnail} alt="thumbnail"/>
        </div>
      </div>

      {(title !== props.data.item.title || desc !== props.data.item.desc || epNum !== props.data.item.epNum || thumbnail !== props.data.item.thumbnail || videoUrl !== props.data.item.videoUrl || vf !== props.data.item.vf || part2 !== props.data.item.part2 || pageUrl !== props.data.item.pageUrl) && (
        <div className="submit-btn-edit" onClick={() => handleSubmit()}>
          Submit
        </div>
      )}
    </div>
  )
}

export default EditEpModal
