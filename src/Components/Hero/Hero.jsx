import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useFetchData from '../../customHooks/useFetchData'
import { getState } from '../../Context/ContextProvider'
import { LazyImg, Wrapcontent } from '../HelperComponent'
import './hero.scss'

function Hero() {
    const [query, setQuery] = useState('')
    const [backgorundImg, setbackgorundImg] = useState(null)
    const { url } = getState()
    const navigate = useNavigate()
    const { data, loading, error } = useFetchData('/movie/upcoming')

    const handleSearch = (e) => {
        if (e.key == 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }


    useEffect(() => {
        if (data) {
            const bgImg = url.backdrop + data?.results?.[Math.floor(Math.random() * 16)].backdrop_path
            setbackgorundImg(bgImg)
        }
    }, [data])

    return (
        <div className='herobanner'>
            <div className='hero-img'>
                {!loading && <LazyImg src={backgorundImg} alt='hero image' />}
            </div>
            <div className='hero-overlay'>

            </div>
            <Wrapcontent>
                <div className='heroContent'>
                    <span className='title'>Welcome</span>
                    <span className='subtitle'>Million of tv shows Movies and Comedy shows to Discover.</span>
                    <div className='heroSearchInput'>
                        <input type={'text'}
                            placeholder='search movies,tv show...'
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyUp={handleSearch}
                        />
                        <button className='searchButton'>Search</button>
                    </div>
                </div>
            </Wrapcontent>
        </div>
    )
}

export default Hero