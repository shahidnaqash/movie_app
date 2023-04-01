import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchData from '../../customHooks/useFetchData'
import { getState } from '../../Context/ContextProvider'
import { DetailsBanner } from '../../Components'
import Show from '../../Components/showscarousel/Show'
function Description() {
    const { mediatype, id } = useParams()
    const { data, loading } = useFetchData(`/${mediatype}/${id}/credits`)
    const { data: videoData, loading: videoLoading } = useFetchData(`/${mediatype}/${id}/videos`)
    const rUrl = `/${mediatype}/${id}/recommendations`

    return (
        <div>
            <DetailsBanner video={videoData?.results?.[1]} crew={data?.crew} heros={data?.cast} />
            <Show title={'Recommendations'} recommandationUrl={rUrl} initial={mediatype} />
        </div>
    )
}

export default Description