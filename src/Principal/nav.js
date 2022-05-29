import { userLogout } from "../redux/actions/userActions";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth-service';


function Nave(){
    const user = useSelector((state) => state.usrData)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = ()=>{
        authService.logout()
        navigate("/")
        dispatch(userLogout());
    }

    return(
<header className="header container-fluid">
                    <div className="container-fluid">
                        <div className="row align-items-start">
                            <div className="margin-up col-4">
                                <a href="/" className="logo">
                                    <h1 className="no-margin">GESCON</h1>
                                </a>
                            </div>
                            <div className="margin-up col-8">
                            <nav className="text-end ">
                                
                                <Link to="congresos" className="nave padd" >Congresos</Link>
                                <Link to="contacto" className="nave padd">Contacto</Link>                      
                                {user.autenticado ? <Link to="perfil" className="nave padd">Perfil</Link> : <Link to="login" className="nave padd">Login</Link>}                      
                                {user.tipo_user==1 ? <Link to="myArticles" className='nave padd'>Mis articulos</Link> : <></>}
                                {user.tipo_user==2 ? <Link to="myRevArticles" className='nave padd'>Articulos a revisar</Link>: <></>}
                                {user.tipo_user==3 ? <Link to="events" className='nave padd'>Eventos</Link>: <></>}
                                {user.tipo_user==3 ? <Link to="gestion_arts" className="nave padd">Gestionar articulos</Link>: <></>}
                                {user.tipo_user==6 || !user.autenticado ? <Link to="registry" className='nave padd'>Registro</Link>: <></>}
                                {user.tipo_user==6 ? <Link to="users" className='nave padd'>Usuarios</Link>: <></>}
                                {user.autenticado ? <a className='nave padd' onClick={()=>{logout()}}>Log out</a>:<></>}
                            </nav>
                            </div>            
                        </div>
                    </div>
                    <div className="margin-up container text-center">
                        <h2 className="no-margin">Enterate sobre los siguientes eventos</h2>
                    </div>
                </header>

    )}
    export default Nave;