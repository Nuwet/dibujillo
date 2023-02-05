import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './screens/NotFound';
import UnirseSalas from './screens/UnirseSalas/UnirseSalas';
import Container from './screens/Container/container';
import PaginaInicial from './screens/pagina_inicial/PaginaInicial';
import SalaEspera from './screens/sala_espera/SalaEspera';
import SalaJuego from './screens/sala_juego/SalaJuego';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Container/>}>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/inicio' element={<PaginaInicial/>}></Route>
        <Route path='/unirse' element={<UnirseSalas/>}></Route>
        <Route path='/salaEspera/:codigo' element={<SalaEspera />} />
        <Route path='/juego/:codigo' element={<SalaJuego />} />
      </Route>
    </Routes>
  );
}

export default App;
