
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Pages
import Home from './pages/Home/Home';
import Clients from './pages/Clients/Clients';
import ClientDetails from './pages/Clients/ClientDetails';

// type TitleProps = {
//   text: string;
// };

// const Title = ({ text }: TitleProps) => {
//   return <h1>{text}</h1>
// };

function App() {

  return (
    <div className='App'>
      {/* <Title text="Vite + React" /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/clientes-selecionados" element={<ClientDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
