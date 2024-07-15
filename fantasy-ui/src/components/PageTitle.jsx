import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = props => {
    return (
        <>
            <h1 className="m-3 text-center">{props.title}</h1>
            <p className="m-3 text-center">{props.subtitle}</p>
        </>
    );
};

PageTitle.propTypes = {
    title : PropTypes.string.isRequired,
    subtitle : PropTypes.string.isRequired
};

export default PageTitle;