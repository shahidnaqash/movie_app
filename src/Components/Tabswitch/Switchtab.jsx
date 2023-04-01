import React, { useState } from 'react'
import './switch.scss'
function Switchtab({ data, changeTab }) {
    const [selectedTab, setselectedTab] = useState(0)
    const [leftPosition, setleftPosition] = useState(0)

    const handleChangeTab = (tab, index) => {
        setleftPosition(index * 100)
        setselectedTab(index)
        changeTab(tab, index)
    }
    return (
        <div className='switchingTabs'>
            <div className='tabItems'>
                {
                    data.map((tab, index) => (
                        <span className={`tabItem ${selectedTab == index ? 'active' : ''}`} key={index}
                            onClick={() => handleChangeTab(tab, index)}
                        >{tab}</span>
                    ))
                }
                <div className='movingBg' style={{ left: leftPosition }} />

            </div></div>
    )
}

export default Switchtab 