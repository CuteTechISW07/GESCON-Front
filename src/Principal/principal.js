import React from 'react';
import pictures from '../assets/pictures';


const principal= () => {
    return(
        
            <div>
                     
                <div className="container-fluid padd">
                    <div className="row justify-content-around">
                        <div className="col-7">
                        <main className="text-center">
                            <h3>Nuestro sitio</h3>
                            
                            <div>
                                <img className="img-fluid padd" loading="lazy" src={pictures.img1} alt="imagen"/> 
                                <h4 className="no-margin">Proximos eventos</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, rerum, reprehenderit consequatur perferendis officia, vitae fuga animi temporibus itaque atque reiciendis ea excepturi! Molestias aperiam fugiat deleniti laudantium atque numquam?</p>
                                <a href="#" className="boton">Mas información</a>
                            </div>
                                        
                            <div>
                                <img className="img-fluid padd" loading="lazy" src={pictures.img2} alt="imagen"/>
                                <h4 className="no-margin">¿Quieres participar?</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, rerum, reprehenderit consequatur perferendis officia, vitae fuga animi temporibus itaque atque reiciendis ea excepturi! Molestias aperiam fugiat deleniti laudantium atque numquam?</p>
                                <a href="#" className="boton ">Mas información</a>
                            </div>
                            
                            <div className="">
                                <img className="img-fluid padd" loading="lazy" src={pictures.img3} alt="imagen"/> 
                                <h4 className="no-margin">Contactanos</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, rerum, reprehenderit consequatur perferendis officia, vitae fuga animi temporibus itaque atque reiciendis ea excepturi! Molestias aperiam fugiat deleniti laudantium atque numquam?</p>
                                <a href="#" className="boton">Mas información</a>
                                
                            </div>
                            
                        </main>
                        </div>
                        <div className="col-3">
                        
                            <h3>Contacto</h3>
            
                            <form>
                                <div className="mb-3">
                                <label for="email1" className="form-label">Direccion email</label>
                                <input type="email" className="form-control" id="email1" aria-describedby="emailHelp"/>
                                <div id="emailHelp" className="form-text">Nunca compartimos tu informacion con alguien mas.</div>
                                </div>
                                <div className="mb-3">
                                <label for="comment1" className="form-label">Comentarios</label>
                                <textarea className="form-control" id="comment1" rows="3"></textarea>
                                </div>
                                <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="Check1"/>
                                <label className="form-check-label" for="Check1">Check</label>
                                </div>
                                <button type="submit" className="boton">Enviar</button>
                            </form>
                
                            
                        
                        </div>
                    </div>
                    
                    
                </div>
            
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

export default principal;