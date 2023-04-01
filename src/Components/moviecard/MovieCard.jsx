import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { LazyImg } from "../HelperComponent";
import { getState } from '../../Context/ContextProvider'
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, mediaType }) => {
    const { url } = getState()
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock">
                <LazyImg className="posterImg" src={posterUrl} />
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;