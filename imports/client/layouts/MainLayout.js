import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react'


const MainLayout = (props) => {
  return (
    <Container>
      <div className='main-layout'>
        <Header>
          <div className='main-layout-title'>
            <h1>Well Wishes</h1>
          </div>
          <nav>
            <div className='main-layout-links'>
              <Link to='/home'>Home </Link>
              <Link to='/search'>Search</Link>
            </div>
          </nav>
        </Header>
        {props.children}
      </div>
    </Container>
  )
}

export default MainLayout;
