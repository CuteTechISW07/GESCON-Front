import Pag_Gestion from './gestion-articulos/Pag-gestion';
import Login from './Login/Login';
import Indx from './Principal/principal';
import ConsRev from './Consultar_revisiones/ConsRev';
import Nave from './Principal/nav'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Registry from './Registro/Registry';

function App() {
  return (
    <BrowserRouter>
      <Nave/>
      <Routes>
        <Route path='/' element={<Indx />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contacto' element={<div></div>} />
        <Route path='/registry' element={<Registry />} />
      </Routes>
    </BrowserRouter>
    
    
  );
}


export default App;
