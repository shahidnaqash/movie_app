import React, { useState } from 'react'
import { Wrapcontent } from '../HelperComponent'
import Switchtab from '../Tabswitch/Switchtab'
import './show.scss'
import UseFetchData from '../../customHooks/useFetchData'
import Carousel from '../carousel/Carousel'

function Show({ initial = null, dataList, title, baseUrl = null, airing = false, recommandationUrl = null }) {
    const [timeSlot, settimeSlot] = useState(initial)
    const url = baseUrl !== null ? baseUrl + timeSlot : recommandationUrl !== null ? recommandationUrl : airing ? `/tv/on_the_air` : `/${timeSlot}/popular`
    const { data, loading, error } = UseFetchData(url)
    const handleChangetab = (tab, index) => {
        let lowerCaseTab = tab.toLowerCase();
        settimeSlot(lowerCaseTab)
    }

    return (
        <div className='carouselSection'>
            <Wrapcontent>
                <span className='carouselTitle'>{title}</span>
                {
                    !airing && !recommandationUrl &&
                    <Switchtab data={dataList} changeTab={handleChangetab} />
                }
            </Wrapcontent>
            <Carousel data={data?.results} loading={loading} mediaType={timeSlot == 'day' ? '' : timeSlot == 'week' ? '' : timeSlot} />
        </div>
    )
}

export default Show
//initialSlot
//totalList
