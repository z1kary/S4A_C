import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { faPause, faPlay, faVolumeDown, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from './Utils'

const FilmModal = ({ filePath, thumbnail }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlay, setIsPlay] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isThumb, setIsThumb] = useState(true)
  const [currentVolume, setCurrentVolume] = useState()
  const [lastVolume, setLastVolume] = useState()
  const [currentTimeElement, setCurrentTimeElement] = useState(null)
  const [durationTimeElement, setDurationTimeElement] = useState(null)
  const videoPlayer = useRef(null)
  const watchedBar = useRef(null)
  const progressBar = useRef(null)
  const refHoverTimeline = useRef(null)
  const refTimeHover = useRef(null)
  const volumeBar = useRef(null)
  const refVideoContainer = useRef(null)
  let timeout

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
    const percentage = ((videoPlayer.current.currentTime / videoPlayer.current.duration) * 100)
    watchedBar.current.style.width = percentage + "%"
    if (percentage === 100) {
      pause()
    }
    if (videoPlayer.current.currentTime >= 60 * 60) {

      let currentHours = Math.floor(videoPlayer.current.currentTime / 60 / 60)
      let currentMinutes = Math.floor((videoPlayer.current.currentTime / 60) - currentHours * 60)
      let currentSeconds = Math.floor(videoPlayer.current.currentTime - currentMinutes * 60 - currentHours * 60 * 60)
      let durationHours = Math.floor(videoPlayer.current.duration / 60 / 60)
      let durationMinutes = Math.floor(videoPlayer.current.duration / 60 - durationHours * 60)
      let durationSeconds = Math.floor(videoPlayer.current.duration - (durationMinutes * 60) - (durationHours * 60 * 60))
      
      setCurrentTimeElement(`${currentHours}:${currentMinutes < 10 ? '0'+currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`)
      setDurationTimeElement(`${durationHours}:${durationMinutes < 10 ? '0'+durationMinutes : durationMinutes}:${durationSeconds < 10 ? '0'+durationSeconds : durationSeconds}`)
    } else {
      let currentMinutes = Math.floor(videoPlayer.current.currentTime / 60)
      let currentSeconds = Math.floor(videoPlayer.current.currentTime - currentMinutes * 60)
      let durationHours = Math.floor(videoPlayer.current.duration / 60 / 60)
      let durationMinutes = Math.floor(videoPlayer.current.duration / 60 - durationHours * 60)
      let durationSeconds = Math.floor(videoPlayer.current.duration - (durationMinutes * 60) - (durationHours * 60 * 60))
      
      setCurrentTimeElement(`${currentMinutes < 10 ? '0'+currentMinutes : currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`)
      setDurationTimeElement(`${durationHours}:${durationMinutes < 10 ? '0'+durationMinutes : durationMinutes}:${durationSeconds < 10 ? '0'+durationSeconds : durationSeconds}`)
    }
  }

  const changeTimeline = (e, offsetX) => {
    const progressTime = (offsetX / progressBar.current.offsetWidth) * videoPlayer.current.duration
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
    let curHours = Math.floor(hoverTime / 60 / 60)
    let curMinutes = Math.floor(hoverTime / 60 - curHours * 60)
    let curSeconds = Math.floor(hoverTime - curMinutes * 60 - curHours * 60 * 60)
    const res = `${curHours}:${curMinutes < 10 ? '0'+curMinutes : curMinutes}:${curSeconds < 10 ? '0'+curSeconds : curSeconds}`
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

  useEffect(() => {
    if (!isEmpty(filePath) && !isEmpty(thumbnail)) {
      setIsLoading(false)
    }

    if (isEmpty(currentVolume) && !isEmpty(videoPlayer.current) && !isLoading) {
      setCurrentVolume(0)
      videoPlayer.current.volume = 0
    }
    if (!isEmpty(volumeBar) && !isEmpty(currentVolume) && !isLoading) {
      volumeBar.current.style.width = (currentVolume * 100) + "%"
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
  }, [currentVolume, filePath, handleSetVolume, isLoading, isPlay, lastVolume, thumbnail])

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

          <video src={filePath} ref={videoPlayer} onTimeUpdate={() => {
            currentTime()
            }}></video>

          <div className={isThumb ? "thumb-container" : "thumb-container disable"} onClick={() => play()}>
            <img src={`${process.env.REACT_APP_API_URL}${thumbnail}`} alt=""/>
            <div className="btn">
              <FontAwesomeIcon icon={faPlay} />
            </div>
          </div>

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

        </div>
      )}
    </>
  )
}

export default FilmModal
