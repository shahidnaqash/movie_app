import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function LazyImg({ src, alt, ...props }) {
    return (
        <LazyLoadImage
            alt={alt}
            effect="blur"
            src={src}
            {...props} />
    )
}

export default LazyImg