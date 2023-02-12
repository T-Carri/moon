import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Login } from './pages/Login';
import ProtectedRoute from './context/ProtectedRoute';
import {Perfil} from './pages/perfil/Perfil';
import { AuthContextProvider } from './context/AuthContext';
function App() {
 
  return (
      
<AuthContextProvider>
<>
<Router>
  <Routes>
  <Route exact path="/" element={<Login/>} />

  <Route exact path="account/" element={
  <ProtectedRoute>

<Perfil/>

  </ProtectedRoute>
  
  
  } />


  </Routes>
</Router>
</>
</AuthContextProvider> 
      
    
  );
}

export default App;
