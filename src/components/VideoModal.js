import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { isEmpty } from './Utils'
import { faPause, faPlay, faVolumeDown, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { updateMangaEp } from '../actions/allActions'
import { Link } from 'react-router-dom'

// { filePath, season, part, mangaId, thumbnail, video, format }
const VideoModal = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMulti, setIsMulti] = useState(false)
  const [multiUrl, setMultiUrl] = useState()
  const [isLoadingVideo, setIsLoadingVideo] = useState(true)
  const [isPlay, setIsPlay] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isThumb, setIsThumb] = useState(true)
  const videoPlayer = useRef()
  const [currentTimeElement, setCurrentTimeElement] = useState(null)
  const [durationTimeElement, setDurationTimeElement] = useState(null)
  const refVideoContainer = useRef()
  const progressBar = useRef()
  const watchedBar = useRef()
  const volumeBar = useRef()
  const [currentVolume, setCurrentVolume] = useState()
  const [lastVolume, setLastVolume] = useState()
  const refHoverTimeline = useRef(null)
  const refTimeHover = useRef(null)
  const [isBtnSkip, setIsBtnSkip] = useState(false)
  const [isBtnOutro, setIsBtnOutro] = useState(false)
  const isAdmin = useSelector((state) => state.userReducer)
  let timeout
  // let t

  const dispatch = useDispatch(null)

  // Admin 

  const [skipIntro1, setSkipIntro1] = useState("0:00")
  const [skipIntro2, setSkipIntro2] = useState("2:40")
  const [skipOutro, setSkipOutro] = useState("23:22")

  const play = () => {
    videoPlayer.current.play();
    setIsPlay(true)
    setIsThumb(false)
    refVideoContainer.current.classList.remove('pause')
  }

  const pause = () => {
    videoPlayer.current.pause();
    setIsPlay(false)
    refVideoContainer.current.classList.add('pause')
  }

  const currentTime = () => {
    setIsLoadingVideo(false)
    const percentage = ((videoPlayer.current.currentTime / videoPlayer.current.duration) * 100)
    watchedBar.current.style.width = percentage + "%"
    // if (!isEmpty(userData)) {
    //   dispatch(updateVideoCurrentTime(watchingVideo._id, videoPlayer.current.currentTime, userData._id))
    // }
    if (percentage === 100) {
      pause()
    }
    let currentMinutes = Math.floor(videoPlayer.current.currentTime / 60)
    let currentSeconds = Math.floor(videoPlayer.current.currentTime - currentMinutes * 60)
    let durationMinutes = Math.floor(videoPlayer.current.duration / 60)
    let durationSeconds = Math.floor(videoPlayer.current.duration - durationMinutes * 60)

    // console.log(videoPlayer.current.currentTime);
    if (!isEmpty(props.video.skipIntro1) && !isEmpty(props.video.skipIntro2)) {
      // console.log(parseInt(video.skipIntro1.split(':')[1]) + parseInt(video.skipIntro1.split(':')[0]) * 60)
      // console.log(parseInt(video.skipIntro2.split(':')[1]) + parseInt(video.skipIntro2.split(':')[0]) * 60)
      
      // console.log(currentMinutes);
      if (videoPlayer.current.currentTime > (parseInt(props.video.skipIntro1.split(':')[1]) + parseInt(props.video.skipIntro1.split(':')[0]) * 60) && videoPlayer.current.currentTime < (parseInt(props.video.skipIntro2.split(':')[1]) + parseInt(props.video.skipIntro2.split(':')[0]) * 60)) {
        // console.log("test");
        setIsBtnSkip(true)
      } else {
        setIsBtnSkip(false)
      }
    }
    if (!isEmpty(props.video.skipOutro)) {
      // console.log(parseInt(video.skipOutro.split(':')[1]) + parseInt(video.skipOutro.split(':')[0]) * 60)
      if (videoPlayer.current.currentTime > (parseInt(props.video.skipOutro.split(':')[1]) + parseInt(props.video.skipOutro.split(':')[0]) * 60)) {
        setIsBtnOutro(true)
      } else {
        setIsBtnOutro(false)
      }
    }
    setCurrentTimeElement(`${currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`)
    setDurationTimeElement(`${durationMinutes}:${durationSeconds < 10 ? '0'+durationSeconds : durationSeconds}`)
  }

  const changeTimeline = (e, offsetX) => {
    setIsLoadingVideo(true)
    const progressTime = (offsetX / progressBar.current.offsetWidth) * videoPlayer.current.duration
    // console.log(offsetX / progressBar.current.offsetWidth);
    // console.log(progressTime);
    videoPlayer.current.currentTime = progressTime
  }

  const handleSetVolume = useCallback((e) => {
    if (isEmpty(e)) {
      if (currentVolume < .01) {
        if (!isEmpty(lastVolume)) {
          videoPlayer.current.volume = lastVolume
          setCurrentVolume(lastVolume)
          volumeBar.current.style.width = (lastVolume * 100).toString() + "%"
        } else {
          videoPlayer.current.volume = 0.5
          setCurrentVolume(0.5)
          volumeBar.current.style.width = "50%"
        }
      } else if (currentVolume > 0) {
        setLastVolume(currentVolume)
        setCurrentVolume(0)
        videoPlayer.current.volume = 0
        volumeBar.current.style.width = "0%"
      }
    } else {
      setLastVolume(currentVolume)
      setCurrentVolume(Number(e))
      volumeBar.current.style.width = (e * 100).toString() + "%"
      videoPlayer.current.volume = Number(e)
      // dispatch(setUlcVolume(ulc.tokenId, Number(e)))
    }
  }, [currentVolume, lastVolume])

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else {
      refVideoContainer.current.requestFullscreen()
      setIsFullscreen(true)
    }
  }

  const handleHoverTimeline = (e) => {
    refVideoContainer.current.classList.add('hover')
    const pt = (e / progressBar.current.offsetWidth) * 100
    refHoverTimeline.current.style.width = pt.toString() + "%"
    
    const hoverTime = (e / progressBar.current.offsetWidth) * videoPlayer.current.duration
    let currentMinutes = Math.floor(hoverTime / 60)
    let currentSeconds = Math.floor(hoverTime - currentMinutes * 60)
    const res = `${currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`
    if (res.includes('-')) {
      refTimeHover.current.innerHTML = "0:00"
      refTimeHover.current.style.left = pt.toString() + "%"
    } else {
      refTimeHover.current.innerHTML = res
      refTimeHover.current.style.left = pt.toString() + "%"
    }
  }

  const handleSkipTime = () => {
    videoPlayer.current.currentTime = videoPlayer.current.currentTime + 5
  }

  const handleBackTime = () => {
    videoPlayer.current.currentTime = videoPlayer.current.currentTime - 5
  }

  const handleSkipIntro = () => {
    const data = props.video.skipIntro2.split(':')
    videoPlayer.current.currentTime = parseInt(data[1]) + parseInt(data[0]) * 60
  }

  const handleSkipOutro = () => {
    videoPlayer.current.currentTime = videoPlayer.current.duration
  }

  const handleSubmitIntro = () => {
    if (!isEmpty(skipIntro1)) {
      props.video.skipIntro1 = skipIntro1
    }
    if (!isEmpty(skipIntro2)) {
      props.video.skipIntro2 = skipIntro2
    }
    if (!isEmpty(skipOutro)) {
      props.video.skipOutro = skipOutro
    }

    dispatch(updateMangaEp(props.mangaId, props.video, props.season, props.video.epNum))
  }

  // const handleUpdateLoadingVideo = useCallback((e) => {
    // if (isEmpty(e) && !isLoadingVideo) {
    //   setIsLoadingVideo(true)
    // } else if (!isEmpty(e) && isLoadingVideo) {
    //   setIsLoadingVideo(false)
    // }
    // console.log("test");
  // }, [])

  useEffect(() => {
    if (!isEmpty(props.filePath) && !isEmpty(props.thumbnail) && isLoading) {
      setIsMulti(false)
      setIsLoading(false)
    }
    if (!isEmpty(props.urls) && !isEmpty(props.thumbnail) && isLoading) {
      setIsMulti(true)
      setMultiUrl(props.urls[0])
      setIsLoading(false)
    }

    // t = setTimeout(function() {
      // console.log("test");
      // setVideoLoading(true)
    // }, 100)

    // handleUpdateLoadingVideo()

    if (isEmpty(currentVolume) && !isEmpty(videoPlayer.current) && !isLoading) {
      setCurrentVolume(0)
      videoPlayer.current.volume = 0
    }
    if (!isEmpty(volumeBar) && !isEmpty(currentVolume) && !isLoading) {
      volumeBar.current.style.width = (currentVolume * 100) + "%"
    }

    if (!isEmpty(props.video.skipIntro1)) {
      setSkipIntro1(props.video.skipIntro1)
    }
    if (!isEmpty(props.video.skipIntro2)) {
      setSkipIntro2(props.video.skipIntro2)
    }
    if (!isEmpty(props.video.skipOutro)) {
      setSkipOutro(props.video.skipOutro)
    }

    const listener = event => {
      if (event.code === "Space") {
        if (isPlay) {
          pause()
        } else {
          play()
        }
      }
      if (event.key === "m") {
        if (currentVolume !== 0) {
          handleSetVolume(0)
        } else {
          handleSetVolume(lastVolume)
        }
      }
      if (event.key === "f") {
        handleFullscreen()
      }
      if (event.keyCode === 39) {
        handleSkipTime()
      }
      if (event.keyCode === 37) {
        handleBackTime()
      }
    }

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [props.urls, props.filePath, isLoading, props.thumbnail, currentVolume, handleSetVolume, isPlay, lastVolume, props.video.skipIntro1, props.video.skipIntro2, props.video.skipOutro])

  return (
    <>
      {isLoading ? (
        <div className="loader">

        </div>
      ) : (
        <div className={isFullscreen ? "video-modal-wrapper fs" : "video-modal-wrapper"} onDoubleClick={() => handleFullscreen()} onMouseMove={() => {
          clearTimeout(timeout)
          refVideoContainer.current.classList.remove('cursor')
          refVideoContainer.current.classList.add('hover')

          timeout = setTimeout(function() {
            if (isPlay) {
              refVideoContainer.current.classList.add('cursor')
              refVideoContainer.current.classList.remove('hover')
            }
          }, 5000)
        }} onMouseEnter={() => refVideoContainer.current.classList.add('hover')} onMouseLeave={() => refVideoContainer.current.classList.remove('hover')} ref={refVideoContainer}>

          {/* {format === "vostfr" && ( */}
            {/* <> */}
{/* ref={videoPlayer} onTimeUpdate={() => currentTime()} */}
                  {isMulti ? (
                    <video src={multiUrl} ref={videoPlayer} onTimeUpdate={() => {
                      currentTime()
                      // handleUpdateLoadingVideo("e")
                      }}></video>
                  ) : (
                    <video src={props.filePath} ref={videoPlayer} onTimeUpdate={() => {
                      currentTime()
                      // handleUpdateLoadingVideo("e")
                      }}></video>
                  )}

                  {isLoadingVideo && (
                    <div className="loading-video">
                      Loading ...
                    </div>
                  )}

                  {isMulti && (
                    <div className={isPlay ? "multi-container play" : "multi-container"}>
                      {props.urls.map((item, i) => {
                        return props.urls.length > 1 && (
                          <div className={multiUrl === item ? "m-item active" : "m-item"} onClick={() => {
                            if (item !== multiUrl) {
                              setMultiUrl(item)
                              setIsLoadingVideo(true)
                              pause()
                            }
                            }} key={i}>
                            <p>Lecteur {i + 1}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  
                  <div className={isThumb ? "thumb-container" : "thumb-container disable"} onClick={() => play()}>
                    <img src={`${process.env.REACT_APP_API_URL}${props.thumbnail}`} alt=""/>
                    <div className="btn">
                      <FontAwesomeIcon icon={faPlay} />
                    </div>
                  </div>
                  {!isEmpty(props.part) ? (
                    props.part === 1 && isBtnSkip && (
                      <div className="skip-btn" onClick={() => handleSkipIntro()}>
                        <p>Skip Intro</p>
                      </div>
                    )
                  ) : (
                    isBtnSkip && (
                      <div className="skip-btn" onClick={() => handleSkipIntro()}>
                        <p>Skip Intro</p>
                      </div>
                    )
                  )}

                  {!isEmpty(props.part) ? (
                    props.part === 2 && isBtnOutro && (
                      <Link to={`/watch/${props.mangaId}/${props.season}/ep-${parseInt(props.video.epNum) + 1}/${props.format}`} className="skip-btn" onClick={() => handleSkipOutro()}>
                        <p>Next Episode</p>
                      </Link>
                    )
                  ) : (
                    isBtnOutro && (
                      <Link to={`/watch/${props.mangaId}/${props.season}/ep-${parseInt(props.video.epNum) + 1}/${props.format}`} className="skip-btn" onClick={() => handleSkipOutro()}>
                        <p>Next Episode</p>
                      </Link>
                    )
                  )}

                  {!isEmpty(isAdmin) && (
                    <div className="admin-modal">
                      <div className="am-container">

                        <input type="text" value={skipIntro1} onChange={(e) => setSkipIntro1(e.target.value)}/>
                        <input type="text" value={skipIntro2} onChange={(e) => setSkipIntro2(e.target.value)}/>
                        <input type="text" value={skipOutro} onChange={(e) => setSkipOutro(e.target.value)}/>

                        <div className="btn" onClick={() => handleSubmitIntro()}>Submit</div>
                      </div>
                    </div>
                  )}

                  <div className="video-overlay" onClick={() => {
                    if (isPlay) {
                      pause()
                    } else if (!isPlay) {
                      play()
                    }
                  }}></div>

                  <div className="video-controls-wrapper">

                    <div className="play-btn">
                      {isPlay ? (
                        <button className="pause" onClick={() => pause()}><FontAwesomeIcon icon={faPause} /></button>
                      ) : (
                        <button onClick={() => play()}><FontAwesomeIcon icon={faPlay} /></button>
                      )}
                    </div>

                    <div className="video-controls-right">

                      <div className="video-timeline-container" ref={progressBar} onMouseMove={(e) => handleHoverTimeline(e.nativeEvent.offsetX)} onMouseLeave={() => refHoverTimeline.current.style.width = "0px"} onClick={(e) => changeTimeline(e, e.nativeEvent.offsetX)}>
                        <div className="time-hover" ref={refTimeHover}></div>
                        <div className="video-timeline">
                          <div className="video-progress" ref={watchedBar}></div>
                          <div className="timeline-hover" ref={refHoverTimeline}></div>
                        </div>
                      </div>

                      <div className="inline-video-wrapper">

                        <span className="time">{currentTimeElement} / {durationTimeElement}</span>

                        {!isEmpty(currentVolume) && (
                          <div className="btn-volume">
                            <div className="icon" onClick={() => handleSetVolume()}>
                              {currentVolume >= .50 && (
                                <FontAwesomeIcon icon={faVolumeUp} />
                              )}
                              {currentVolume < .50 && currentVolume > 0 && (
                                <FontAwesomeIcon icon={faVolumeDown} />
                              )}
                              {currentVolume < 0.01 && (
                                <FontAwesomeIcon icon={faVolumeMute} />
                              )}
                            </div>
                            <div className="volume-select">
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={currentVolume}
                                onChange={(e) => handleSetVolume(e.target.value)}
                              />
                              <div className="volume-progress" ref={volumeBar}></div>
                            </div>
                          </div>
                        )}

                        <div className="btn-right-options">

                          {/* <div className="btn-settings btn-video-options">
                            <svg height="39px" width="35px"><path d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,-0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,-2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,-0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,-0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,.33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,.78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,-2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,-0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,-2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z"></path></svg>
                          </div>
                          <div className="btn-mini-player btn-video-options">
                            <svg height="39px" width="35px"><path d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z"></path></svg>
                          </div> */}
                          {/* <div className="btn-size btn-video-options">
                            <svg height="39px" width="35px"><path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z"></path></svg>
                          </div> */}
                          <div className="btn-fullscreen btn-video-options" onClick={() => handleFullscreen()}>
                            <svg height="39px" width="35px"><g><path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path></g><g><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path></g><g><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path></g><g><path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path></g></svg>
                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                {/* </> */}
              {/* )} */}

          {/* {format === 'vf' && (
            <iframe src="https://streamtape.com/e/ZbdWJrwVWvfPvY/" width="800" height="420" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0" title={"test"}></iframe>
          )} */}
        </div>
      )}
    </>
  )
}

export default VideoModal
