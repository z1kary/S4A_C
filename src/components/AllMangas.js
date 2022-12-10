import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MangaItem from './MangaItem'
import { isEmpty } from './Utils'

const AllMangas = (props) => {
  const [sNum, setSNum] = useState()

  const getMangaItem = () => {
    let content = []
    for (let i = 0; i < 4; i++) {
      let m = props.mangas[i + sNum]
      if (!isEmpty(m)) {
        // console.log(m.title);
        content.push(<Link to={"/manga/" + m._id} className="slider-item" key={m._id}><MangaItem manga={m} /></Link>);
      }
    }
    return content;
  }

  const getFilmItem = () => {
    let content = []
      for (let i = 0; i < 4; i++) {
        let f = props.films[i + sNum]
        if (!isEmpty(f)) {
          // console.log(f.title);
          content.push(<Link to={"/film/" + f._id} className="slider-item" key={f._id}><MangaItem manga={f} /></Link>);
        }
      }
      return content;
  }

  useEffect(() => {
    if (props.i === 1) {
      setSNum(0)
    } else if (props.i === 2) {
      setSNum(4)
    } else if (props.i === 3) {
      setSNum(8)
    } else if (props.i === 4) {
      setSNum(12)
    } else if (props.i === 5) {
      setSNum(16)
    }
  }, [props.i])
  return (
    <>
      {props.type === "mangas" && getMangaItem()}
      {props.type === "films" && getFilmItem()}
    </>
  )
}

export default AllMangas
