import React from 'react';
import { Link } from 'react-router-dom';


const principal= () => {
    return(
<header className="header container-xxl">
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
                                <Link to="login" className="nave padd">Login</Link>                      
                                
                                
                            </nav>
                            </div>            
                        </div>
                    </div>
                    <div className="margin-up container text-center">
                        <h2 className="no-margin">Enterate sobre los siguientes eventos</h2>
                    </div>
                </header>

    )}
    export default principal;