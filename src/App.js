import React from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';


import './styles/main.scss';
import './styles/utility.scss';
import 'rsuite/dist/rsuite.min.css';

import PrivateRoute from './misc/PrivateRoute';
import Landing from './Components/Pages/Landing';
import Main from './Components/Pages/Main';
import { UserProvider } from './Contexts/user.context';
import PublicRoute from './misc/PublicRoute';
import SignInLink from './Components/Pages/SignInLink';

function App() {  
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Main/>}/>
          </Route>
          <Route exact path='/signin' element={<PublicRoute/>}>
            <Route exact path='/signin' element={<Landing/>}/>
          </Route>
          <Route exact path='/finishSignUp' element={<PublicRoute/>}>
            <Route exact path='/finishSignUp' element={<SignInLink/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </UserProvider>
  );
}

export default App;
