import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newSeason } from '../../actions/allActions'
import { isEmpty } from '../Utils'

const SModal = (props) => {
  const [newTitle, setNewTitle] = useState("")
  const dispatch = useDispatch(null)

  const handleAddOne = () => {
    if (!isEmpty(newTitle)) {
      if (!isEmpty(props.element.seasons)) {
        const seas = "s" + (Object.keys(props.element.seasons).length + 1)
        if (seas === "s2") {
          if (newTitle === 'kai') {
            const data = {
              s1: props.element.seasons.s1
            }
            const seasonsData = {
              s1: props.element.seasonsData.s1,
              kai: [{
                title: "dzad",
                desc: "zedaz",
                epNum: 55,
                videoUrl: "fdfq",
                thumbnail: "uploads/thumbnails/"
              }]
            }
            dispatch(newSeason(props.element._id, data, seasonsData, seas))
          } else {
            const data = {
              s1: props.element.seasons.s1,
              s2: newTitle
            }
            const seasonsData = {
              s1: props.element.seasonsData.s1,
              s2: []
            }
            dispatch(newSeason(props.element._id, data, seasonsData, seas))
          }
        } else if (seas === "s3") {
          const data = {
            s1: props.element.seasons.s1,
            s2: props.element.seasons.s2,
            s3: newTitle
          }
          const seasonsData = {
            s1: props.element.seasonsData.s1,
            s2: props.element.seasonsData.s2,
            s3: []
          }
          dispatch(newSeason(props.element._id, data, seasonsData, seas))
        } else if (seas === "s4") {
          const data = {
            s1: props.element.seasons.s1,
            s2: props.element.seasons.s2,
            s3: props.element.seasons.s3,
            s4: newTitle
          }
          const seasonsData = {
            s1: props.element.seasonsData.s1,
            s2: props.element.seasonsData.s2,
            s3: props.element.seasonsData.s3,
            s4: []
          }
          dispatch(newSeason(props.element._id, data, seasonsData, seas))
        } else if (seas === "s5") {
          const data = {
            s1: props.element.seasons.s1,
            s2: props.element.seasons.s2,
            s3: props.element.seasons.s3,
            s4: props.element.seasons.s4,
            s5: newTitle
          }
          const seasonsData = {
            s1: props.element.seasonsData.s1,
            s2: props.element.seasonsData.s2,
            s3: props.element.seasonsData.s3,
            s4: props.element.seasonsData.s4,
            s5: []
          }
          dispatch(newSeason(props.element._id, data, seasonsData, seas))
        } else if (seas === "s6") {
          const data = {
            s1: props.element.seasons.s1,
            s2: props.element.seasons.s2,
            s3: props.element.seasons.s3,
            s4: props.element.seasons.s4,
            s5: props.element.seasons.s5,
            s6: newTitle
          }
          const seasonsData = {
            s1: props.element.seasonsData.s1,
            s2: props.element.seasonsData.s2,
            s3: props.element.seasonsData.s3,
            s4: props.element.seasonsData.s4,
            s5: props.element.seasonsData.s5,
            s6: []
          }
          dispatch(newSeason(props.element._id, data, seasonsData, seas))
        }
      } else {
        const seas = "s1"
        const data = {
          s1: newTitle
        }
        const seasonsData = {
          s1: []
        }
        dispatch(newSeason(props.element._id, data, seasonsData, seas))
      }
      props.onChange()
    }
  }

  return (
    <div className="modal">
      <div className="ep-container-form">
        {!isEmpty(props.element.seasons) ? (
          <>
            {Object.keys(props.element.seasons).map((item, i) => {
              return (
                <div className="input-form" key={i}>
                  {/* {i === 0 && (
                    <> */}
                      <span>{props.element.seasons[item]}</span>
                    {/* </>
                  )} */}
                </div>
              )
            })}
            <div className="input-form">
              <input type="text" placeholder="Type a title for the season" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            </div>
            <button className="btn-submit" onClick={() => handleAddOne()}>Save and add</button>
          </>
        ) : (
          <div className="input-form">
            <input type="text" placeholder="Type a title for the season" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default SModal
