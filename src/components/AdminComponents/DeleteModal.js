import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteEpisode, deleteManga } from '../../actions/allActions'

const DeleteModal = (props) => {
  const dispatch = useDispatch(null)

  const handleDeleteManga = () => {
    dispatch(deleteManga(props.mId))
    props.onChange("a")
  }

  const handleDeleteEp = () => {
    dispatch(deleteEpisode(props.mId, props.data.season, props.data.epNum))
    props.onChange("a")
  }

  return (
    <div className="modal small">
      {props.type === "manga" && (
        <div className="modal-delete">
          <h3>Delete : {props.title} ?</h3>

          <div className="btns-delete">
            <span onClick={() => handleDeleteManga()}>Delete</span>
            <span onClick={() => props.onChange("b")}>Cancel</span>
          </div>
        </div>
      )}
      {props.type === "ep" && (
        <div className="modal-delete">
          <h3>Delete : EP{props.data.epNum} \ {props.data.title} ?</h3>

          <div className="btns-delete">
            <span onClick={() => handleDeleteEp()}>Delete</span>
            <span onClick={() => props.onChange("b")}>Cancel</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteModal
