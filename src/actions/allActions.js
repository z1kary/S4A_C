import axios from 'axios'

export const GET_MANGAS = "GET_MANGAS"
export const GET_FILMS = "GET_FILMS"
export const GET_MANGA = "GET_MANGA"
export const GET_FILM = "GET_FILM"
export const CREATE_MANGA = "CREATE_MANGA"
export const CREATE_FILM = "CREATE_FILM"
export const DELETE_MANGA = "DELETE_MANGA"
export const GET_ALL = "GET_ALL"
export const SET_MANGA_TITLE = "SET_MANGA_TITLE"
export const NEW_SEASON = "NEW_SEASON"
export const ADD_EPISODE = "ADD_EPISODE"
export const UPDATE_MANGA = "UPDATE_MANGA"
export const UPDATE_MANGA_EP = "UPDATE_MANGA_EP"
export const DELETE_EPISODE = "DELETE_EPISODE"
export const SET_NEW_VIDEO = "SET_NEW_VIDEO"
export const GET_USER_BY_ID = "GET_USER_BY_ID"
export const REPORT = "REPORT"

export const getMangas = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/getMangas`)
      .then((res) => {
        dispatch({ type: GET_MANGAS, payload: res.data.mangas })
      })
  }
}

export const getFilms = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/getFilms`)
      .then((res) => {
        dispatch({ type: GET_FILMS, payload: res.data.films })
      })
  }
}

export const createManga = (element) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/createManga`,
      data: element
    })
      .then((res) => {
        dispatch({ type: CREATE_MANGA, payload: res.data })
      })
  }
}

export const createFilm = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/createFilm`,
      data: data
    })
      .then((res) => {
        dispatch({ type: CREATE_FILM, payload: res.data })
      })
  }
}

export const deleteManga = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/deleteManga/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_MANGA, payload: res.data })
      })
  }
}

export const addEpisode = (id, data, season) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/addEpisode/${id}`,
      data: { 
        data,
        season
      }
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: ADD_EPISODE, payload: res.data })
      })
  }
}

export const getAll = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/getAll`)
      .then((res) => {
        dispatch({ type: GET_ALL, payload: res.data })
      })
  }
}

export const getManga = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/getManga/${id}`)
      .then((res) => {
        dispatch({ type: GET_MANGA, payload: res.data })
      })
  }
}

export const getFilm = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/getFilm/${id}`)
      .then((res) => {
        dispatch({ type: GET_FILM, payload: res.data })
      })
  }
}

export const setMangaTitle = (title, mangaId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/setMangaTitle/${mangaId}`,
      data: { title }
    })
      .then((res) => {
        dispatch({ type: SET_MANGA_TITLE, payload: res.data.message })
      })
      .catch((err) => console.log(err))
  }
}

export const newSeason = (mangaId, data, data2, seas) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/newSeason/${mangaId}`,
      data: {
        data: data,
        seasonsData: data2,
        seas: seas
      }
    })
      .then((res) => {
        console.log(res)
        dispatch({ type: NEW_SEASON, payload: res.data.message.seasons })
      })
      .catch((err) => console.log(err))
  }
}

export const updateManga = (mangaId, title, description, picture, format) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/updateManga/${mangaId}`,
      data: {
        title: title,
        description: description,
        picture: picture,
        format: format
      }
    })
      .then((res) => {
        dispatch({ type: UPDATE_MANGA, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const updateMangaEp = (mangaId, data, season, ep) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/updateMangaEp/${mangaId}`,
      data: {
        data,
        season,
        ep
      }
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: UPDATE_MANGA_EP, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const deleteEpisode = (mangaId, season, epNum) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/deleteEpisode/${mangaId}`,
      data: {
        season,
        epNum
      }
    })
      .then((res) => {
        dispatch({ type: DELETE_EPISODE, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const setNewVideo = (data, season) => {
  return (dispatch) => {
    const newD = {
      data,
      season
    }
    dispatch({ type: SET_NEW_VIDEO, payload: newD })
  }
}

export const getUserById = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
      .then((res) => {
        dispatch({ type: GET_USER_BY_ID, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}  

export const report = (data) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/report`,
      data: data
    })
      .then((res) => {
        dispatch({ type: REPORT, payload: res.data })
      })
  }
}