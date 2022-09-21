import { useState } from 'react'
import { Route } from 'react-router-dom';
import { useAuth } from './hook/useAuth'
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';



function App() {

  const { user } = useAuth(); 

  return (
    <div id="app"> 
    {
      user ? (
        <HomePage />
      ) : (
        <Route> 
          <Route path='*' element={<LoginPage />} />
        </Route>
      )
    }
    </div>
  )
}

export default App
