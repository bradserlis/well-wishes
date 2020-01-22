import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react'


const MainLayout = (props) => {
  return (
      <Container>
    <div className='main-layout'>
      <AccountsUIWrapper />
      <header>
        <div className='main-layout-title'> 
          <h1>Well Wishes</h1>
        </div>
        <nav>
          <div className='main-layout-links'>
            <Link to='/home'>Home </Link>
            <Link to='/search'>Search</Link>
          </div>
        </nav>
      </header>
      {props.children}
    </div>
      </Container>
  )
}

export default MainLayout;
