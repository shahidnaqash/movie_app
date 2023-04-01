import React, { useState } from 'react'
import { Wrapcontent } from '../HelperComponent'

import Switchtab from '../Tabswitch/Switchtab'
import './trending.scss'
import UseFetchData from '../../customHooks/useFetchData'
import Carousel from '../carousel/Carousel'
import Swiper from '../carousel/Swiper'
function Trending() {
    const [timeSlot, settimeSlot] = useState('day')
    const { data, loading, error } = UseFetchData(`/trending/all/${timeSlot}`)
    const handleChangetab = (tab, index) => {
        let lowerCaseTab = tab.toLowerCase();
        settimeSlot(lowerCaseTab)
    }

    return (
        <div className='carouselSection'>
            <Wrapcontent>
                <span className='carouselTitle'>Trending</span>
                <Switchtab data={['day', 'Week']} changeTab={handleChangetab} />
            </Wrapcontent>
            <Carousel data={data?.results} loading={loading} />
            {/* <Swiper /> */}
        </div>
    )
}

export default Trending