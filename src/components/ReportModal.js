import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { report } from '../actions/allActions'
import { isEmpty } from './Utils'

const ReportModal = (props) => {
  const [checked, setChecked] = useState()
  const [text, setText] = useState()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (checked === 2 && !isEmpty(text)) {
      const data = {
        data: {
          mangaId: props.mId,
          mangaTitle: props.title,
          format: props.format,
          season: props.season,
          epNum: props.epNum,
          report: text
        }
      }
      dispatch(report(data))
      props.onChange()
    } else if (checked === 1) {
      const data = {
        data: {
          mangaId: props.mId,
          mangaTitle: props.title,
          format: props.format,
          season: props.season,
          epNum: props.epNum,
          videoUrl: props.videoUrl,
          report: "dead link"
        }
      }
      dispatch(report(data))
      props.onChange()
    }
  }

  return (
    <div className="modal-container">
      <h3>Report {props.title} \ Episode {props.epNum} </h3>
      <label htmlFor="deadLink" className="input-container">
        <input type="radio" name="report" id="deadLink" onChange={() => setChecked(1)}/>
        <span><div></div></span>
        <p>Dead link</p>
      </label>
      <label htmlFor="others" className="input-container">
        <input type="radio" name="report" id="others" onChange={() => setChecked(2)}/>
        <span><div></div></span>
        <p>Others</p>
      </label>

      {checked === 2 && (
        <textarea className="input-report" placeholder="Explain your problem" onChange={(e) => setText(e.target.value)}/>
      )}
      <div className="submit-btn-container">
        <div className="submit-btn" onClick={() => handleSubmit()}>Submit</div>
      </div>
    </div>
  )
}

export default ReportModal
