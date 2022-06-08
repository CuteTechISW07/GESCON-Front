import {useEffect, useState} from 'react'
import authService from '../services/auth-service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./style.css"

function Registry(){
    const user = useSelector((state) => state.usrData);
    const navigate = useNavigate();
    
    const validation = ()=>{
        if(user.tipo_user != 6)
            navigate("/");
            
    }

    useEffect(()=>{validation()},[])

    return(
        <>
            {!user.autenticado ? <RegistryAutor /> : <></>}
            {user.autenticado && user.tipo_user === 6 ? <RegistryAdmin />:<></>}
        </>
    );
}

function RegistryAutor(){
    const [nombre, setNombre] = useState("");
    const tipoUser = 1;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passCheck, setPassCheck] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password !== passCheck)
            console.log("Las contraseñas deben coincidir")
        else{
            const body = {
                "nombre": nombre,
                "correo" : email,
                "clave" : password,
                "tipoUsuario" : tipoUser
            }

            const resp = await authService.registry(body);
            
            if(!resp.error){
                console.log(resp);
                alert(resp.message);
            }else{
                alert("Ha ocurrido un error, vuelva a intentarlo");
            }
        }
    }

    const handleChange = (toChange, value)=>{
        switch (toChange) {
            case "nombre":
                setNombre(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "passCheck":
                setPassCheck(value);
                break;
            default:
                break;
        }
    }

    return(
        <div  className="m-0 row justify-content-center align-items-center">

            <div className="wrap-login1002 p-l-55 p-r-55 p-t-80 p-b-30 col-auto">
                <br />
                <span id="titulo" className="login100-form-title p-b-37">
                    Crear cuenta
                </span>
                <br /><br />
                <form id="form" onSubmit={e=>handleSubmit(e)}>    
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Ingresa un nombre válido ">
                        <input id="name" className="input100" type="text"
                            autoComplete="off" name="username" placeholder="Nombre" onChange={e=>handleChange("nombre",e.target.value)}/>
                        <span className="focus-input100"></span>
                    </div>
                    <br />
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Ingresa un correo válido: ex@alumno.ipn.mx">
                        <input id="email" className="input100" type="email" autoComplete="off" name="email" placeholder="Correo" onChange={e=>handleChange("email",e.target.value)} />
                        <span className="focus-input100"></span>
                    </div>
                    <br />
                    <div className="wrap-input100 m-b-25" data-validate="Ingresa una contraseña válida">
                        <input id="password" className="input100" autoComplete="off" type="password" name="pass" minLength="8"
                            placeholder="Contraseña (8 caracteres mínimo)" onChange={e=>handleChange("password", e.target.value)} />
                        <span className="focus-input100"></span>
                    </div>
                    <br />
                    <div className="wrap-input100  m-b-25" data-validate="Ingresa una contraseña válida">
                        <input id="confirmPass" className="input100" autoComplete="off" type="password" name="pass" minLength="8"
                            placeholder="Inserte de nuevo la contraseña" onChange={e=>handleChange("passCheck", e.target.value)} />
                        <span className="focus-input100"></span>
                    </div>
                    <br />

                    <div className="container-login100-form-btn">
                        <button id="button" className="login100-form-btn">
                            Crear cuenta
                        </button>
                    </div>
                    <br />
                </form>
            </div>
        </div>
    );
}

function RegistryAdmin(){
    const [nombre, setNombre] = useState("");
    const [tipoUser, setTipoUser] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passCheck, setPassCheck] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password !== passCheck)
            console.log("Las contraseñas deben coincidir")
        else{
            const body = {
                "nombre": nombre,
                "correo" : email,
                "clave" : password,
                "tipoUsuario" : tipoUser
            }

            const resp = authService.registry(body);
            
            if(!resp.error){
                alert("Usuario registrado")
                e.clear();
            }else{
                alert("Ha ocurrido un error, vuelva a intentarlo");
            }
        }
    }

    const handleChange = (toChange, value)=>{
        switch (toChange) {
            case "nombre":
                setNombre(value);
                break;
            case "tipoUser":
                setTipoUser(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "passCheck":
                setPassCheck(value);
                break;
            default:
                break;
        }
    }
    
    return(
        <div className="m-0 row justify-content-center align-items-center">

            <div className="wrap-login1002 p-l-55 p-r-55 p-t-80 p-b-30 col-auto">
                <br />
                <span className="login100-form-title p-b-37">
                    Crear cuenta
                </span>
                <br /><br />
                <form onSubmit={e=>handleSubmit(e)}>    
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Ingresa un nombre válido ">
                        <input id="name" className="input100" type="text"
                            autoComplete="off" name="username" placeholder="Nombre" onChange={e=>handleChange("nombre",e.target.value)}/>
                        <span className="focus-input100"></span>
                    </div>
                    <br />
                    <div  className="wrap-input100 m-b-20" onChange={e=>handleChange("tipoUser",e.target.value)}>
                        <input type="radio" value="1" name="tipoUser" />
                        <span className="focus-input100">Autor</span><br/>
                        <input type="radio" value="2" name="tipoUser" />
                        <span className="focus-input100">Revisor</span><br/>
                        <input type="radio" value="3" name="tipoUser" />
                        <span className="focus-input100">Jefe de comite</span><br/>
                        <input type="radio" value="4" name="tipoUser" />
                        <span className="focus-input100">Miembro del comite</span><br/>
                        <input type="radio" value="5" name="tipoUser" />
                        <span className="focus-input100">Asistente</span><br/>
                    </div>
                    <br />
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Ingresa un correo válido: ex@alumno.ipn.mx">
                        <input id="email" className="input100" type="email" autoComplete="off" name="email" placeholder="Correo" onChange={e=>handleChange("email",e.target.value)} />
                        <span className="focus-input100"></span>
                    </div>
                    <br />
                    <div className="wrap-input100 m-b-25" data-validate="Ingresa una contraseña válida">
                        <input id="password" className="input100" autoComplete="off" type="password" name="pass" minLength="8"
                            placeholder="Contraseña (8 caracteres mínimo)" onChange={e=>handleChange("password", e.target.value)} />
                        <span className="focus-input100"></span>
                    </div>
                    <br />
                    <div className="wrap-input100  m-b-25" data-validate="Ingresa una contraseña válida">
                        <input id="confirmPass" className="input100" autoComplete="off" type="password" name="pass" minLength="8"
                            placeholder="Inserte de nuevo la contraseña" onChange={e=>handleChange("passCheck", e.target.value)} />
                        <span className="focus-input100"></span>
                    </div>
                    <br />

                    <div className="container-login100-form-btn">
                        <button id="button" className="login100-form-btn">
                            Crear cuenta
                        </button>
                    </div>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default Registry;