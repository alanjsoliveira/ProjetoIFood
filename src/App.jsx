import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Restaurantes from './pages/Restaurantes';
import TelaLogin from './pages/telaLogin';
import LoginCelular from './pages/loginCelular';
import LoginEmail from './pages/loginEmail';
import RegistroUsuario from './pages/registroUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Restaurantes' element = {<Restaurantes/>}/>
        <Route path='/telaLogin' element = {<TelaLogin/>}/>
        <Route path='/loginCelular' element = {<LoginCelular/>}/>
        <Route path='/loginEmail' element = {<LoginEmail/>}/>
        <Route path='/registroUsuario' element = {<RegistroUsuario/>}/>
        <Route path='*' element = {<h1>Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
