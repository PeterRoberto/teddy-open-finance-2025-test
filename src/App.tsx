import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import ClientDetails from './pages/Clients/ClientDetails';

import { AuthProvider } from "./context/userContext";
// import { useAuth } from "./context/userContext";

function App() {
  // const { name } = useAuth();
  // console.log(name)
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/clientes-selecionados" element={<ClientDetails />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider> 
    </div>
  )
}

export default App
