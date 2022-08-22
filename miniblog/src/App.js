import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
//css
import './App.css';

//Context
import { AuthContextProvider } from './Context/AuthContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';


//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
       <AuthContextProvider>
       <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/about' element={ <About /> } />
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
          </Routes>
        </div>
        <Footer />
       </BrowserRouter>
       </AuthContextProvider>
    </div>
  );
}

export default App;
