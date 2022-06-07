
import React from 'react';
import pictures from '../assets/img/perfil.png';
import "./style.css"

function Perfil() {
    return(
        
            <div>
                      
                <div className="container-fluid padd">
                 <iframe id = "caja">
                    <div id ="texto "className="row justify-content-around">
                        <div className="col-7">
                           <main className="text-center">
                            <h3>Bienvenitdo a tu pefil</h3>
                            
                            <div>
                                <img id="imgp" className="img-fluid padd" loading="lazy" src={pictures.img4} alt="imagen"/> 
                                <h4 className="no-margin">Proximos eventos</h4>
                                <br></br>
                                <p>Actualmente no contamos con eventos este mes, si en algun momento se genera uno lo recibirá en su correo.</p>
                            </div>
                            <ul>
                                <li>Correo
                                    <ul>
                                        <li>jesgarv@gmail.com</li>
                                        
                                    </ul>
                                </li>
                                <li>Tipo de usuario
                                    <ul>
                                        <li>1</li>
                                        
                                    </ul>
                                </li>
                                <li>Articulos dados de alta
                                    <ul>
                                        <li>2</li>
                                        
                                    </ul>
                                </li>
                                </ul>
                                                                 
                        </main>
                        </div>
                    </div>
                              
                                </iframe>  
                    
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row align-items-start">
                            <div className="margin-up col-4">
                                    <a className="logo" href="index.html">
                                        <h1 className="no-margin">GESCON</h1>
                                    </a>
                                </div>
                                <div className="margin-up col-8">
                                    <nav className="text-end ">
                                        <a href="/nosotros" className="nave padd">Nosotros</a>
                                        <a href="/congresos" className="nave padd" >Congresos</a>
                                        <a href="/contacto" className="nave padd">Contacto</a>
                                    </nav>
                                </div>
                        </div>          
                    </div>
            
                    <div className="margin-up container text-center">
                        <p className="no-margin">Derechos reservados</p>
                    </div>
                </footer>
            </div>
            
        
    
    );

}

export default Perfil;