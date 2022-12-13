import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMangas } from '../actions/allActions'
import { isEmpty } from '../components/Utils'

const OnePiece = () => {
  const [isLoading, setIsLoading] = useState(true)
  const mangas = useSelector((state) => state.mangasReducer)
  const dispatch = useDispatch(null)

  useEffect(() => {
    if (isEmpty(mangas)) {
      dispatch(getMangas)
      setTimeout(function() {
        setIsLoading(false)
      }.bind(), 300)
    }

  }, [dispatch, mangas])

  return (
    <div className="page manga-page">
      <div className="manga-wrapper">
        <div className="manga-picture">
          {isLoading ? (
            <div className="loading-img"></div>
          ) : (
            <img src={`${process.env.REACT_APP_API_URL}uploads/one-piece-bg.jpeg`} alt="opbg"/>
          )}
        </div>
        <div className="manga-details">
          {isLoading ? (
            <div className="loading-details">
              <div className="loading-title"></div>
              <div className="loading-desc"></div>
              <div className="loading-desc"></div>
              <div className="loading-desc"></div>
            </div>
          ) : (
            <>
              <div className="title">One Piece - All Saga</div>
              <div className="desc">Monkey. D. Luffy refuse de laisser quiconque ou quoi que ce soit faire obstacle à sa quête pour devenir le roi de tous les pirates. Avec un parcours affrété pour les eaux traîtresses de Grand Line et au-delà, c'est un capitaine qui n'abandonnera jamais tant qu'il n'aura pas réclamé le plus grand trésor de la Terre : le légendaire One Piece !</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OnePiece