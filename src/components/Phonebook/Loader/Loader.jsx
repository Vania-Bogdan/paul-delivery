import { Audio } from  'react-loader-spinner'
import React from 'react';
import PropTypes from 'prop-types';

export default function Loader() {
    return (<div>
        <Audio
            height = "100"
            width = "100"
            radius = "9"
            color = '#d9ff00'
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