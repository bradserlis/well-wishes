import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react'


const MainLayout = (props) => {
  return (
    <div>
      <Container>
        <AccountsUIWrapper />
        <div className='main-layout'>
          <Header>
            <nav>
              <div className='main-layout-links'>
                <Link to='/home'>Home </Link>
                <h3>Well Wishes</h3>
                <Link to='/search'>Search</Link>
              </div>
            </nav>
          </Header>
          {props.children}
        </div>
      </Container>
    </div>
  )
}

export default MainLayout;
