import React from 'react';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import { Link } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { FaRegComments, FaUserCircle } from "react-icons/fa";

const MainLayout = (props) => {
  return (
    <div>
      <Container>
        <AccountsUIWrapper />
        <div className='main-layout'>
          <Header>
            <nav>
              <div className='main-layout-links'>
                <Link to='/home'> <FaUserCircle />  </Link>
                <h3>Well Wishes</h3>
                <Link to='/search'><FaRegComments /> </Link>
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
