import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Home,
  Notfound,
  Search,
  Description
} from './pages'
import { Header, Footer } from './Components'
import { getState, getDispatch } from './Context/ContextProvider'
import { fetchData } from './utils/Api'

function App() {
  let dispatch = getDispatch()

  useEffect(() => {
    fetchData('/configuration')
      .then(resp => {
        dispatch({
          type: 'ADD_URL',
          payload: {
            backdrop: resp.images.secure_base_url + 'w1280',
            poster: resp.images.secure_base_url + 'w1280',
            profile: resp.images.secure_base_url + 'w1280'
          }
        })
      }).catch(err => {
        console.log(err)
      })

  }, [])

  useEffect(() => {

    async function getGenres() {
      const endPoints = ['tv', 'movie']
      const promises = []
      const allGenres = {}
      endPoints.forEach((url) => {
        promises.push(fetchData(`/genre/${url}/list`))
      })
      const response = await Promise.all(promises)
      response?.map(({ genres }) => {
        genres.map((genre) => {
          allGenres[genre.id] = genre.name
        })
      })
      dispatch({
        type: 'ADD_GENRES',
        payload: allGenres
      })
    }
    getGenres()
  }, [])


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search/:query' element={<Search />} />
          <Route path='/:mediatype/:id' element={<Description />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
