import React from 'react'

function Wrapcontent({ children }) {
    return (
        <div
            className='contentWrapper'
            style={{
                width: '100%', maxWidth: '1150px', margin: '0 auto', padding: '0px 20px'
            }}>
            {children}
        </div>
    )
}

export default Wrapcontent