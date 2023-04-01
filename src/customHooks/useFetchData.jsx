import React, { useEffect, useState } from 'react'
import { fetchData } from '../utils/Api'
function UseFetchData(url) {
    const [data, setdata] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    useEffect(() => {
        setloading(true)
        fetchData(url).then(resp => {
            setdata(resp)
            setloading(false)
        }).catch(e => {
            seterror(e)
            setloading(false)
        })
    }, [url])

    return {
        data,
        error,
        loading
    }
}

export default UseFetchData