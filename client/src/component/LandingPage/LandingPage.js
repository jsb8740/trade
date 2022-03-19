import React, { Fragment } from 'react';

import Board from './Board/Board';

function LandingPage({userId}) {

    return <Fragment>
        <Board userId={userId}/>
    </Fragment>;
}

export default LandingPage;