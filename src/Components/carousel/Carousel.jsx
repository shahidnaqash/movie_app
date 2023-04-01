import React, { useRef, useMemo } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

import ContextProvider, { getState } from '../../Context/ContextProvider'
import { Wrapcontent } from "../HelperComponent";
import { LazyImg } from '../HelperComponent';
import PosterFallback from "../../assets/no-poster.png";
import "./carousel.scss";
import Rating from "../Rating/Rating";
import Genres from "../Genres/Genres";


const SkeletonItem = () => {

    return (
        <div className="skeletonItem" >
            <div className="posterBlock skeleton">
            </div>
            <div className="textBlock">
                <span className="title skeleton"></span>
                <span className="date skeleton"></span>
            </div>
        </div>
    )
}


function Carousel({ data, loading, mediaType }) {
    const { url } = getState();
    const navigate = useNavigate()
    const ref = useRef(null)
    const location = useLocation(null)

    const changeNavigation = (dir) => {
        const containerRef = ref.current;
        const position = dir == 'left' ? containerRef.scrollLeft - (containerRef.offsetWidth + 20) : containerRef.scrollLeft + (containerRef.offsetWidth + 20)
        containerRef.scrollTo({
            left: position,
            behavior: 'smooth'
        })
    }
    return (
        <div className="carousel">
            <Wrapcontent>
                <BsFillArrowLeftCircleFill
                    onClick={() => changeNavigation('left')}
                    className="carouselLeftNav arrow" />
                <BsFillArrowRightCircleFill
                    onClick={() => changeNavigation('right')}
                    className="carouselRighttNav arrow" />
            </Wrapcontent>
            {
                loading ? (
                    <div className="loadingSkeleton">
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                    </div>
                ) : (
                    <div className="carouselItems" ref={ref} >
                        {
                            data?.map((item, index) => {
                                const imgSrc = item.poster_path !== null ? url.poster + item.poster_path : PosterFallback
                                return (
                                    <div className="carouselItem" key={index}
                                        onClick={() => {
                                            // location.pathname = `${mediaType == '' ? item.media_type : mediaType}/${item.id}`
                                            navigate(`/${mediaType == '' ? item.media_type : mediaType}/${item.id}`, { replace: true })
                                            window.scrollTo(0, 0)
                                        }}
                                    >
                                        <div className="posterBlock">
                                            <LazyImg src={imgSrc} alt={'poster'} />
                                            <Rating rating={item?.vote_average.toFixed(1)} />
                                            <Genres genreId={item?.genre_ids} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">{item.title || item.name}</span>
                                            <span className="date">{dayjs(item.release_date).format('DD/MM/YYYY')}</span>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Carousel