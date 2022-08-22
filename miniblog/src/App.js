import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//Hooks 
import { useState, useEffect } from 'react';
import { useAuthentication } from './Hooks/useAuthentication';
//css
import './App.css';

//Context
import { AuthContextProvider } from './Context/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';


//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [user, setUSer] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUSer(user)
    }, [auth])
  })

  if(loadingUser){
    return <p> Carregando...</p>;
  }



  return (
    <div className="App">
       <AuthContextProvider value={{user}}>
       <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/about' element={ <About /> } />
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/post/create' element={<CreatePost />} />
              <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
       </BrowserRouter>
       </AuthContextProvider>
    </div>
  );
}

export default App;
