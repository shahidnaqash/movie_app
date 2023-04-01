import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import useFetchData from '../../customHooks/useFetchData'
import { getState } from '../../Context/ContextProvider'
import dayjs from "dayjs";

import "./detail.scss";

import { LazyImg, Wrapcontent } from '../HelperComponent'
import Genres from "../Genres/Genres";
import CircleRating from "../Rating/Rating";
import PosterFallback from "../../assets/no-poster.png";
import Playicon from "../Playicon/Playicon";
import Videopopup from "../videopopup/Videopopup";

const DetailsBanner = ({ video, crew, heros }) => {
    const [show, setshow] = useState(false)
    const [videoo, setvideoo] = useState(null)
    const { mediatype, id } = useParams()
    const Url = `/${mediatype}/${id}`
    const { url } = getState()
    const { data, loading, error } = useFetchData(Url)
    const genresId = data?.genres.map((g) => g.id)
    const heross = heros?.slice(0, 5)
    const directors = crew?.filter((d) => d.job == 'Director')
    const writerss = crew?.filter((d) => d.job == 'Screenplay' || d.job == 'Writer' || d.job == 'Story')
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {
                        data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <LazyImg src={url.backdrop + data?.backdrop_path} />
                                </div>
                                <div className="opacity-layer"></div>
                                <Wrapcontent>
                                    <div className="content">
                                        <div className="left">
                                            {
                                                data.poster_path ? (
                                                    <LazyImg
                                                        alt={'poster movie'}
                                                        src={url.backdrop + data?.poster_path} className='posterImg' />
                                                ) : (
                                                    <LazyImg alt={'poster movie'}
                                                        src={PosterFallback} className='posterImg' />
                                                )
                                            }
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {
                                                    `${data.name || data.title}(${dayjs(
                                                        data.release_data).format('YYYY')
                                                    })
                                                    `
                                                }
                                            </div>
                                            <div className="subtitle">{data.tagline}</div>
                                            <Genres genreId={genresId} />
                                            <div className="row">
                                                <CircleRating rating={data?.vote_average.toFixed(1)} />
                                                <div className="playbtn" onClick={() => {
                                                    setshow(true)
                                                    setvideoo(video.key)

                                                }}>
                                                    <Playicon />
                                                    <span className="text">Trailer</span>
                                                </div>
                                            </div>

                                            <div className="overview">
                                                <div className="heading">Overview</div>
                                                <div className="description">{data.overview}</div>
                                            </div>
                                            {
                                                directors?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Directors:{" "}</span>
                                                        <span className="text">
                                                            {
                                                                directors.map((d, ind) => (
                                                                    <span key={ind} className="">
                                                                        {d.name}
                                                                    </span>
                                                                ))
                                                            }
                                                        </span>

                                                    </div>

                                                )
                                            }
                                            {
                                                writerss?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Writers:{" "}</span>
                                                        <span className="text">
                                                            {
                                                                writerss.map((d, ind) => (
                                                                    <span key={ind} className="">
                                                                        {d.name}
                                                                    </span>
                                                                ))
                                                            }
                                                        </span>

                                                    </div>

                                                )
                                            }
                                            {
                                                heross?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Heros:{" "}</span>
                                                        <span className="text">
                                                            {
                                                                heross.map((d, ind) => (
                                                                    <span key={ind} className="">
                                                                        {d.name}{"     "}
                                                                    </span>
                                                                ))
                                                            }
                                                        </span>

                                                    </div>

                                                )
                                            }

                                        </div>
                                    </div>
                                    <Videopopup show={show} setVideoId={setvideoo} setShow={setshow} videoId={videoo} />
                                </Wrapcontent>
                            </React.Fragment>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <Wrapcontent>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </Wrapcontent>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;