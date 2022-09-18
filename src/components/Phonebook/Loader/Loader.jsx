import { Audio } from  'react-loader-spinner'
import React from 'react';
import PropTypes from 'prop-types';

export default function Loader() {
    return (<div>
        <Audio
            height = "150"
            width = "500"
            radius = "9"
            color = '#006c4d'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle
            wrapperClass
        />
    </div>
    );
}

Loader.propTypes = {
    query: PropTypes.string,
};