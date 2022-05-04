import {useState} from 'react'
import authService from '../services/auth-service';


function Login(){

    return(
        <div className="m-0  row justify-content-center align-items-center">
            <Formulario />
        </div>
            
    );
}

function Formulario(){
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');

    const handleChange = (toChange, value) =>{
        if(toChange === "correo")
            setCorreo(value);
        setContra(value);
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        await authService.login(correo,contra);
    }

    const logOut = (e) =>{
        e.preventDefault();
        authService.logout();
    }

    return(
        <div className="col-auto p-5">
            <form action="#" className="border p-3 form">
                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input type="email" name="email" id="email" className="form-control" onChange={e=>handleChange("correo",e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password" className="form-control" onChange={e=>handleChange("contra",e.target.value)} />
                </div>
                <div className="justify-content-center align-items-center pt-2">
                    <button type="submit" className="btn btn-primary" onClick={e=>handleSubmit(e)}>Login</button>
                </div>
                <div className="justify-content-center align-items-center pt-2">
                    <button className="btn btn-danger" onClick={e=>logOut(e)}>Logout</button>
                </div>
            </form>
        </div>
    );
}

export default Login;