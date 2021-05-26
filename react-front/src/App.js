import Home from './Pages/home';
import Shops from './Pages/shops';
import Shop from './Pages/shop';
import Nav from './components/nav';
import './style.css';
import styled from 'styled-components';
import {Route} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 2rem auto 0 auto;
`

function App() {
  
  return (
    <Main>
      <Nav />
      <Route exact path="/" component={Home} />
      <Route exact path="/shops" component={Shops} />
      <Route exact path="/shop" component={Shop} />
    </Main>
  );
}

export default App;
