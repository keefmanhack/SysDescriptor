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
import RevisionNotes from './Components/Pages/RevisionNotes';

function App() {  
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<Main/>}/>
          </Route>
          <Route path='/revisionNotes' element={<RevisionNotes/>}/> 
          <Route path='/signin' element={<PublicRoute/>}>
              <Route path='/signin' element={<Landing/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </UserProvider>
  );
}

export default App;
