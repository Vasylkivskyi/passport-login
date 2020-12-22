import React from 'react';
import Terminal from '../components/displays/Terminal';
import CardList from '../components/cards/CardList';

const Home = () => {
  return (
    <div className="page" style={{ textAlign: 'center'}}>
      <p className="page-title">Simple OAuth with Node.js</p>
      <p style={{ fontSize: '20px' }}>
         Passport.js contains support for over
         <span style={{ color: 'var(--primary-red)' }}> 500+ strategies now. </span>
         Get started today with just a user name and password for apps like Facebook or Google.
      </p>
      <Terminal
        userData={"passport.authenticate('facebook')"}
        selected="All"
      />
      <p style={{ fontSize: 28}}>
        Popular strategies
      </p>
      <CardList />
      <div style={{ marginBottom: 20 }} />
    </div>
  )
}

export default Home;
