import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import './search.scss'
import { MovieCard, Wrapcontent, Spinner, LazyImg } from '../../Components'
import { fetchData } from '../../utils/Api'
import noResult from '../../assets/no-results.png'

function Search() {
    const { query } = useParams()
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const [page, setpage] = useState(1)
    const [totalPages, settotalPages] = useState(null)

    const fetchSearchData = useCallback(
        () => {
            setloading(true)
            fetchData(`/search/multi?query=${query}&page=${page}&include_adult=false`).then((resp) => {
                setloading(false)
                setdata(resp.results)
                setpage((p) => p + 1)
                settotalPages(resp.total_pages)

            }).catch((e) => {
                console.log(e)
            })
        },
        [query]
    )
    useEffect(() => {
        setpage(1)
        fetchSearchData()
    }, [query])

    const fetchOnPageChange = useCallback(
        () => {
            setloading(true)
            fetchData(`/search/multi?query=${query}&page=${page}&include_adult=false`).then((resp) => {
                setloading(false)
                setdata((p) => [...p, ...resp.results])
                setpage(p => p + 1)
            }).catch((e) => {
                console.log(e)
            })
        },
        [page]
    )
    console.log(data)
    return (
        <div className='searchResultsPage'>
            {
                loading &&
                <Spinner initial />
            }
            {
                !loading && (
                    <Wrapcontent>
                        {
                            data.length > 0 ? (
                                <>
                                    <div className='pageTitle'>
                                        {
                                            `Search results of query ${query}`
                                        }
                                    </div>
                                    <InfiniteScroll
                                        className='content'
                                        dataLength={data?.length}
                                        next={fetchOnPageChange}
                                        hasMore={page <= totalPages}
                                        loader={<Spinner />}
                                    >
                                        {
                                            data.map((item, index) => {
                                                if (item.media_type == 'Person') return
                                                return <MovieCard data={item} mediaType={item.media_type} />
                                            })
                                        }
                                    </InfiniteScroll>
                                </>
                            ) : (
                                <span className='resultNotFound'>
                                    No result Found
                                    <LazyImg src={noResult} alt='no result' />
                                </span>
                            )
                        }
                    </Wrapcontent>
                )
            }
        </div>
    )
}

export default Search