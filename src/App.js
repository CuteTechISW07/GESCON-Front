import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import { useDispatch } from 'react-redux';
import authHeader from './services/auth-headers';
import { useEffect } from 'react';
import { userLogin } from './redux/actions/userActions';

// Imports de los componentes
import Nave from './Principal/nav'
import MyArticles from './Articulos-Autor/MyArticles';
import Prueba from './Prueba/Prueba';
import Registry from './Registro/Registry';
import Pag_Gestion from './gestion-articulos/Pag-gestion';
import Login from './Login/Login';
import Indx from './Principal/principal';
import Status_Art from './Estado_Articulos/Status';

function App() {
  const dispatch = useDispatch();
  const getUserData = async()=>{
    let tokenLocal = localStorage.getItem("token");
    const requestOptions = {
      method : "POST",
      headers : authHeader(),
      body : JSON.stringify({"token" : tokenLocal})
    }
    const data = await fetch("http://localhost:3500/User/decodeJWT",requestOptions);
    const dataJson = await data.json();
    
    if(dataJson.id_usuario){
      const usuario = {
        id : dataJson.id_usuario,
        mail : dataJson.correo,
        tipo_user : dataJson.tipo,
        nombre : dataJson.nombre,
        token : tokenLocal,
        autenticado : true
      }
      dispatch(userLogin(usuario))
    }
  }

  useEffect(()=> {getUserData()}, [])
  
  return (
    <BrowserRouter>
      <Nave/>
      <Routes>
        <Route path='/' element={<Indx />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contacto' element={<div></div>} />
        <Route path='/registry' element={<Registry />} />
        <Route path='/myArticles' element={<MyArticles />} />
        <Route path="/pruebas" element={<Prueba />} />
        <Route path="/gestion_arts" element={<Pag_Gestion />} />
        <Route path='/calificar' element={<Status_Art />} />
      </Routes>
    </BrowserRouter>
    
    
  );
}


export default App;
