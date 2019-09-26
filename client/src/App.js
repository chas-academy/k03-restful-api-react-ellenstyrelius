import React from 'react';

import NavBar from './components/NavBar';

import color from './utils/styling/color';
import { ReactComponent as Splash } from './utils/img/splash.svg';

function App() {
  return (
    <>
      <NavBar />
      <Splash height={160} fill={color.oldPeach} />
    </>
  );
}

export default App;
