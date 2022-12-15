import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Routes from './components/Routes'
import { isEmpty } from './components/Utils'
import axios from 'axios'
import { getUserById } from './actions/allActions'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const userData = useSelector((state) => state.userReducer)
  const [useAtOnce, setUseAtOnce] = useState(true)
  const dispatch = useDispatch()
  const refLoader = useRef(null)

  useEffect(() => {
    if (isEmpty(userData) && useAtOnce) {
      const fetchJwt = async () => {
        await axios ({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}jwtid`,
        })
        .then((res) => {
          if (!isEmpty(res.data)) {
            dispatch(getUserById(res.data._id))
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
      const sm = () => {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}miner`
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))
      }
      fetchJwt()
      sm()
      
      setUseAtOnce(false)
    }

    window.addEventListener('load', () => {
      refLoader.current.classList.add('fade-out')
      setTimeout(function() {
        setIsLoading(false)
      }.bind(), 200)
    })

    console.log(navigator.language);
  }, [dispatch, userData, useAtOnce])

  return (
    <>
      {isLoading ? (
        <div className="loader-container" ref={refLoader}>
          <div className="loader-app"><div className="loader-content">Loading <div className="loader-dot"><span className='dot-1'>.</span><span className='dot-2'>.</span><span className='dot-3'>.</span></div></div></div>
        </div>
      ) : (
        <Routes />
      )}
    </>
  );
}

export default App;
