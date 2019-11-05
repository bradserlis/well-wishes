import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import { Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='main-layout'>
      <header>
        <h1>Well Wishes</h1>
        <AccountsUIWrapper />
        <nav>
          <Link to='/home'>Home </Link>
        </nav>
      </header>
    </div>
  )
}

export default MainLayout;
