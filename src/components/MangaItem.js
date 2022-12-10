import React, { useEffect, useRef, useState } from 'react'
import { isEmpty } from './Utils'

const MangaItem = ({ manga }) => {
  const refHiddenDesc = useRef(null)
  const [isDescCut, setIsDescCut] = useState()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isEmpty(manga.description) && isEmpty(isDescCut) && manga.description !== "aaa") {
      if (refHiddenDesc.current.clientHeight > 80) {
        setIsDescCut(true)
        setIsOpen(false)
      } else {
        setIsDescCut(false)
      }
    }
  }, [isDescCut, manga.description])

  return (
    <div>
      <img src={`${process.env.REACT_APP_API_URL}${manga.picture}`} alt=''/>
      <div className="cover-container">
        <div className="title">
          <h2>{manga.title}</h2>
        </div>
        {manga.description !== "aaa" && (
          <div className="desc-wrapper">

            {isEmpty(isDescCut) ? (
              <p className="description-text" ref={refHiddenDesc}>{manga.description}</p>
            ) : (
              <div className="manga-desc">
                {isDescCut ? (
                  <>
                    {isOpen ? (
                      <div className="desc-container">
                        <p className="description-text">{manga.description}</p>
                        <p className="btn-bot-desc" onClick={() => setIsOpen(false)}>Show less</p>
                      </div>
                    ) : (
                      <div className="desc-container">
                        <p className="description-text little-desc">{manga.description}</p>
                        <p className="btn-bot-desc" onClick={() => setIsOpen(true)}>Show more</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p>{manga.description}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MangaItem
