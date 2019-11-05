import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import { Link } from 'react-router-dom';

const MainLayout = (props) => {
  return (
    <div className='main-layout'>
      <AccountsUIWrapper />
      <header>
        <div className='main-layout-title'> 
          <h1>Well Wishes</h1>
        </div>
        <nav>
          <div className='main-layout-links'>
            <Link to='/home'>Home </Link>
            <Link to='/'>Posts</Link>
          </div>
        </nav>
      </header>
      {props.children}
    </div>
  )
}

export default MainLayout;
