import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (isEmpty(userData) && useAtOnce) {
      const fetchJwt = async () => {
        await axios ({
          method: 'get',
          url: `${process.env.REACT_APP_API_URL}jwtid`,
          withCredentials: true
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
      const handleMine = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}api/m`)
      }
      handleMine()
      fetchJwt()
      setIsLoading(false)
      setUseAtOnce(false)
    }

    console.log(navigator.language);
  }, [dispatch, userData, useAtOnce])

  return (
    <>
      {isLoading ? (
        <div className="loader">

        </div>
      ) : (
        <Routes />
      )}
    </>
  );
}

export default App;
