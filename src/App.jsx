import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Restaurantes from './pages/Restaurantes';
import TelaLogin from './pages/telaLogin';
import LoginCelular from './pages/loginCelular';
import LoginEmail from './pages/loginEmail';
import RegistroUsuario from './pages/registroUsuario';
import VerificarCodigo from './pages/VerificarCodigo';
import MinhaConta from './pages/MinhaConta';
import MeusEnderecos from './pages/MeusEnderecos';
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSimulationPage from './pages/PaymentSimulationPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Restaurantes' element={<Restaurantes />} />
          <Route path="/restaurante/:id" element={<RestaurantPage />} />
          <Route path='/telaLogin' element={<TelaLogin />} />
          <Route path='/loginCelular' element={<LoginCelular />} />
          <Route path='/loginEmail' element={<LoginEmail />} />
          <Route path='/registroUsuario' element={<RegistroUsuario />} />
          <Route path='/verificar-codigo' element={<VerificarCodigo />} />
          <Route path="/minha-conta" element={<MinhaConta />} />
          <Route path="/meusenderecos" element={<MeusEnderecos />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-simulation/:orderId" element={<PaymentSimulationPage />} /> {/* Rota com `orderId` */}
          
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
