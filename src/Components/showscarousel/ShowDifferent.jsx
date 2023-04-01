import React, { useState } from 'react'
import { Wrapcontent } from '../HelperComponent'
import Switchtab from '../Tabswitch/Switchtab'
import './show.scss'
import UseFetchData from '../../customHooks/useFetchData'
import Carousel from '../carousel/Carousel'

function ShowDifferent({ initial, dataList, title }) {
    const [timeSlot, settimeSlot] = useState(initial)
    const { data, loading, error } = UseFetchData(`/${timeSlot}/popular`)

    const handleChangetab = (tab, index) => {
        let lowerCaseTab = tab.toLowerCase();
        settimeSlot(lowerCaseTab)
    }
    return (
        <div className='carouselSection'>
            <Wrapcontent>
                <span className='carouselTitle'>{title}</span>
                <Switchtab data={dataList} changeTab={handleChangetab} />
            </Wrapcontent>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default ShowDifferent
