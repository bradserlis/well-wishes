import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';


const MainLayout = () => {
  return (
    <div className='main-layout'>
      <header>
        <h1>Well Wishes</h1>
        <AccountsUIWrapper />
      </header>
    </div>
  )
}

export default MainLayout;
