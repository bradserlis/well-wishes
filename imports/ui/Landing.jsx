import React from 'react';

import AccountsUIWrapper from './AccountsUIWrapper';

const Landing = () => {
    return (
        <div className='landing'>
            <h1>Well Wishes </h1>
            <div className='landing-sign-in'>
                <h4> Sign in to begin... </h4>
                <AccountsUIWrapper />
            </div>
        </div >
    )
}

export default Landing;