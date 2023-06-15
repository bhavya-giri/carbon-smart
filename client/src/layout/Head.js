import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
    return (
        <Helmet>
            <title>Recyclops2.0 - {title}</title>
        </Helmet>
    )
}

export default Head;