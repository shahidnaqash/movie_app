import React from 'react'
import { getState } from '../../Context/ContextProvider'
import './genre.scss'
function Genres({ genreId }) {
    const { genres } = getState()

    return (
        <div className='genres'>
            {
                genreId?.map((genre) => (
                    <div key={genre} className='genre'>{genres[genre]}</div>
                ))
            }
        </div>
    )
}

export default Genres