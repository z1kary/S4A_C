import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getManga, getMangas } from '../actions/allActions'
import { isEmpty } from '../components/Utils'
import VideoModal from '../components/VideoModal'
import { faChevronRight, faBug } from '@fortawesome/free-solid-svg-icons'
import ReportModal from '../components/ReportModal'
// import axios from 'axios'

const Watch = () => {
  const pathname = useLocation().pathname.replace('/watch/', '').split('/')
  const mangaId = pathname[0]
  const season = pathname[1]
  const epNum = pathname[2].replace('ep-', '')
  const format = pathname[3]
  const manga = useSelector((state) => state.getOneReducer)
  const mangas = useSelector((state) => state.mangasReducer)
  const [video, setVideo] = useState()
  const dispatch = useDispatch(null)
  const [isLoading, setIsLoading] = useState(true)
  const [part, setPart] = useState(1)
  const [playOnce, setPlayOnce] = useState(true)
  const [reportModal, setReportModal] = useState(false)
  const refReportModal = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (!isEmpty(refReportModal.current) && event.target.className === "modal-wrapper") {
        setReportModal(false)
      }
    }
    if (isEmpty(mangas)) {
      dispatch(getMangas())
    }
    if (playOnce) {
      if (!isEmpty(video)) {
        if (!isEmpty(video.pageUrl)) {
          // axios({
          //   method: "post",
          //   url: `${process.env.REACT_APP_API_URL}api/puppeteer`,
          //   data: {
          //     pageUrl: video.pageUrl
          //   }
          // })
          //   .then((res) => console.log(res))
          setPlayOnce(false)
        } else {
          // console.log("stop");
          setPlayOnce(false)
        }
      }
    }
    if (isLoading) {
      if (!isEmpty(mangaId)) {
        if (isEmpty(manga)) {
          dispatch(getManga(mangaId))
        } else if (!isEmpty(manga)) {
          if (manga._id !== mangaId) {
            dispatch(getManga(mangaId))
          }
        }
      }
      
      if (isEmpty(video) && !isEmpty(manga) && !isEmpty(season)) {
        manga.seasonsData[season].map((item) => {
          return item.epNum === epNum && (
            // console.log(item),
            setVideo(item)
          )
        })
      } else if (!isEmpty(video) && !isEmpty(manga) && !isEmpty(season)) {
        if (video.epNum !== epNum) {
          manga.seasonsData[season].map((item) => {
            return item.epNum === epNum && (
              // console.log(item),
              setVideo(item)
            )
          })
        }
      }

    }

    if (!isLoading) {
      if (video.epNum !== epNum) {
        setIsLoading(true)
      }
      if (pathname[0] !== mangaId) {
        setIsLoading(true)
      }
    }
          
    if (!isEmpty(manga) && !isEmpty(mangas) && !isEmpty(mangaId) && !isEmpty(video) && isLoading) {
      if (manga._id === mangaId && video.epNum === epNum) {
        setPart(1)
        setIsLoading(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    // console.log(pathname);
  }, [video, playOnce, mangaId, dispatch, epNum, pathname, season, isLoading, manga, mangas])
  
  return (
    <div className="page watch-page">
      {isLoading ? (
        <div className="loader">

        </div>
      ) : (
        <>
          <div className="watch-top-page">
            <div className="video-wrapper">
              <div className="video-container">
                {format === "vostfr" && (
                  <>
                    {!isEmpty(video.videoUrl) && !isEmpty(video.thumbnail) && (
                      video.videoUrl.includes("/embed/") ? (
                        <div className="video-modal-wrapper">
                          <iframe src={video.videoUrl} title={video.title}></iframe>
                        </div>
                      ) : (
                        <VideoModal filePath={video.videoUrl} season={season} mangaId={mangaId} video={video} format={"vostfr"} thumbnail={video.thumbnail} />
                      )
                    )}
                    {!isEmpty(video.videoUrls) && !isEmpty(video.thumbnail) && (
                      <VideoModal urls={video.videoUrls} season={season} mangaId={mangaId} video={video} format={"vostfr"} thumbnail={video.thumbnail} />
                    )}
                  </>
                  
                )}
                {format === "vf" && (
                  <>
                    {!isEmpty(video.vf) && !isEmpty(video.thumbnail) && (
                      video.vf.includes("/embed/") ? (
                        <div className="video-modal-wrapper">
                          <iframe src={video.vf} title={video.title}></iframe>
                        </div>
                      ) : (
                        <VideoModal filePath={video.vf} season={season} mangaId={mangaId} video={video} format={"vf"} thumbnail={video.thumbnail} />
                      )
                    )}
                    {!isEmpty(video.vfs) && !isEmpty(video.thumbnail) && (
                      <VideoModal urls={video.vfs} season={season} mangaId={mangaId} video={video} format={"vf"} thumbnail={video.thumbnail} />
                    )}
                  </>
                )}
                {format === "kai" && (
                  !isEmpty(video.videoUrl) && !isEmpty(video.thumbnail) && (
                    <>
                      {part === 1 && (
                        <VideoModal filePath={video.videoUrl} part={1} season={season} mangaId={mangaId} video={video} format={"kai"} thumbnail={video.thumbnail} />
                      )}
                      {!isEmpty(video.part2) && (
                        part === 2 && (
                          <VideoModal filePath={video.part2} part={2} season={season} mangaId={mangaId} video={video} format={"kai"} thumbnail={video.thumbnail} />
                        )
                      )}
                    </>
                  )
                )}
              </div>
            </div>
            <div className="next-wrapper">
              <div className="next-title">
                <p>{season !== "kai" ? "S" : ""}{season.replace('s', "")} \ {season === "kai" ? manga.seasons.s1 : manga.seasons[season]}</p>
                <Link to={`/manga/${manga._id}`} className="btn">View all<FontAwesomeIcon icon={faChevronRight} /></Link>
              </div>
              <div className="next-container">
              {/* console.log(item.epNum)
                  console.log(epNum) */}
                {/* {manga.seasonsData[season].map((item, i) => {
                  return parseInt(item.epNum) > parseInt(epNum) && (
                    <Link to={`/watch/${manga._id}/${season}/ep-${item.epNum}/vostfr`} key={i}>
                      <div className="episode-container">
                        <div className="ep-thumb">
                          <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                        </div>
                        <div className="cover">
                          <div className="title-cover">
                            <p>EP{item.epNum} \ {item.title}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })} */}
                {manga.seasonsData[season].map((item, i) => (
                  <div key={i}>
                    {parseInt(item.epNum) > parseInt(epNum) && (
                      <Link to={`/watch/${manga._id}/${season}/ep-${item.epNum}/vostfr`}>
                        <div className="episode-container">
                          <div className="ep-thumb">
                            <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                          </div>
                          <div className="cover">
                            <div className="title-cover">
                              <p>EP{item.epNum} \ {item.title}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                    {parseInt(item.epNum) === manga.seasonsData[season].length && (
                      <>
                        {season === "s1" && !isEmpty(manga.seasons.s2) && (
                          <div onClick={() => window.location = `/watch/${manga._id}/s2/ep-1/${format}`} className="next-season">
                            go next season as
                          </div>
                        )}
                        {season === "s2" && !isEmpty(manga.seasons.s3) && (
                          <div onClick={() => window.location = `/watch/${manga._id}/s3/ep-1/${format}`} className="next-season">
                            go next season a
                          </div>
                        )}
                        {season === "s3" && !isEmpty(manga.seasons.s4) && (
                          <div onClick={() => window.location = `/watch/${manga._id}/s4/ep-1/${format}`} className="next-season">
                            go next season
                          </div>
                        )}
                        {season === "s4" && !isEmpty(manga.seasons.s5) && (
                          <div onClick={() => window.location = `/watch/${manga._id}/s5/ep-1/${format}`} className="next-season">
                            go next season
                          </div>
                        )}
                        {season === "s5" && !isEmpty(manga.seasons.s6) && (
                          <div onClick={() => window.location = `/watch/${manga._id}/s6/ep-1/${format}`} className="next-season">
                            go next season
                          </div>
                        )}
                        {season === "s6" && !isEmpty(manga.seasons.s7) && (
                          <div onClick={() => window.location = `/watch/${manga._id}/s7/ep-1/${format}`} className="next-season">
                            go next season
                          </div>
                        )}
                        {season === "s6" && isEmpty(manga.seasons.s7) && (
                          manga.title.includes("One Piece") ? (
                            mangas.map((item, i) => (
                              item.title.includes('08') && (
                                <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                  go next season
                                </Link>
                              )
                            ))
                          ) : (
                            <Link to="/mangas">
                              Back to mangas
                            </Link>
                          )
                        )}
                        {season === "s1" && isEmpty(manga.seasons.s2) && (
                          <div className="next-btn-container">
                            {manga.title.includes('01') && (
                              mangas.map((item, i) => (
                                item.title.includes('02') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 2
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('02') && (
                              mangas.map((item, i) => (
                                item.title.includes('03') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 3
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('03') && (
                              mangas.map((item, i) => (
                                item.title.includes('04') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 4
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('04') && (
                              mangas.map((item, i) => (
                                item.title.includes('05') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 5
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('05') && (
                              mangas.map((item, i) => (
                                item.title.includes('06') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 6
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('06') && (
                              mangas.map((item, i) => (
                                item.title.includes('07') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 7
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('07') && (
                              mangas.map((item, i) => (
                                item.title.includes('08') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 8
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('08') && (
                              mangas.map((item, i) => (
                                item.title.includes('09') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 9
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('09') && (
                              mangas.map((item, i) => (
                                item.title.includes('10') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 10
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('10') && (
                              mangas.map((item, i) => (
                                item.title.includes('11') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 11
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('11') && (
                              mangas.map((item, i) => (
                                item.title.includes('12') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 12
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('12') && (
                              mangas.map((item, i) => (
                                item.title.includes('13') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 13
                                  </Link>
                                )
                              ))
                            )}
                            {manga.title.includes('13') && (
                              mangas.map((item, i) => (
                                item.title.includes('14') && (
                                  <Link to={`/manga/${item._id}`} className="next-season" key={i}>
                                    Watch Saga 14
                                  </Link>
                                )
                              ))
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="watch-bot">
            <div className="title">
              <p>EP{epNum} \ {video.title}</p>
              {!isEmpty(video.part2) && (
                <div className="btns-part">
                  <p className={part === 1 ? "btn active" : "btn"} onClick={() => setPart(1)}>Part 1</p>
                  <p className={part === 2 ? "btn active" : "btn"} onClick={() => setPart(2)}>Part 2</p>
                </div>
              )}
              <div className="report-btn" onClick={() => setReportModal(true)}>
                <span>Report <FontAwesomeIcon icon={faBug} /></span>
              </div>
            </div>
            <div className="desc">
              {video.desc !== "aaa" && (
                <p>{video.desc}</p>
              )}
            </div>
          </div>
        </>
      )}
      {reportModal && (
        <div className="modal-wrapper" ref={refReportModal}>
          {!isEmpty(video.videoUrls) && (
            <ReportModal mId={manga._id} videoUrl={video.videoUrls} format={format} season={season} epNum={epNum} title={manga.title} onChange={() => setReportModal(false)} />
          )}
          {!isEmpty(video.videoUrl) && (
            <ReportModal mId={manga._id} videoUrl={video.videoUrl} format={format} season={season} epNum={epNum} title={manga.title} onChange={() => setReportModal(false)} />
          )}          
        </div>
      )}
    </div>
  )
}

export default Watch
