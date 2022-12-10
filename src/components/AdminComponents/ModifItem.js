import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { isEmpty } from '../Utils'
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ModifItem = (props) => {
  const s = "s" + (props.i + 1)
  const data = props.element.seasonsData[s]

  const handleChangeEpModal = () => {
    const res = {
      type: "epModal",
      data: s
    }
    props.onChange(res)
  }

  const handleChangeModifModal = (e) => {
    const data = {
      epNum: e,
      season: s
    }
    const res = {
      type: "modifModal",
      data: data
    }
    props.onChange(res)
  }

  const handleChangeDeleteModal = (e) => {
    const data = {
      epNum: e,
      season: s
    }
    const res = {
      type: "deleteModal",
      data: data
    }
    props.onChange(res)
  }

  return (
    <>
      <div className="s-title">
        <h3>{props.element.seasons[s]}</h3>
      </div>
      <div className="season-side">
        {isEmpty(data) ? (
          <div className="btn-create" onClick={() => handleChangeEpModal()}>create episodes</div>
        ) : (
          <div className="episode-wrapper">
            {data.map((item, i) => {
              return (
                <div className="episode-container" key={i}>
                  <img src={`${process.env.REACT_APP_API_URL}${item.thumbnail}`} alt=""/>
                  <div className="img-cover">
                    <h3>EP{item.epNum} \ {item.title}</h3>
                    {item.desc !== "aaa" && (
                      <p>{item.desc}</p>
                    )}
                    <div className="btn-utils">
                      <Link to={`/watch/${props.element._id}/${s}/ep-${item.epNum}`} className="btn">
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                      <div className="btn" onClick={() => handleChangeModifModal(item.epNum)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </div>
                      <div className="btn" onClick={() => handleChangeDeleteModal(item.epNum)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </div>
                  </div>
                </div>
              ) 
            })}
            <span className="btn-create" onClick={() => handleChangeEpModal()}>create episodes</span>
          </div>
        )}
      </div>
    </>
  )
}

export default ModifItem
