import React from 'react'
import { Hero, Trending } from '../../Components'
import Show from '../../Components/showscarousel/Show'
import ShowDifferent from '../../Components/showscarousel/ShowDifferent'

const initialSlot = 'day'
const arrayData = ['day', 'week']
const latestData = ['movie', 'tv']
const initialLatest = 'movie'
const airingData = ['movie', 'tv']
const initalAir = 'tv'

function Home() {
    return (
        <div>
            <Hero />
            <Show initial={initialSlot} dataList={arrayData} title={' Trending'} baseUrl={'/trending/all/'} />
            <Show initial={initialLatest} dataList={latestData} title={'Get Popular'} />
            <Show initial={initalAir} dataList={airingData} title={'Tv Shows On The Air'} airing={true} />

        </div>
    )
}

export default Home

///tv/on_the_air