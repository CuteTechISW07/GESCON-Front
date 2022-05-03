import React from 'react';
import pictures from '../assets/pictures';
import Navegacion from './nav';

const principal= () => {
    return(
        
            <div>
                                  
            <Navegacion/>
                <div class="container-fluid padd">
                    <div class="row justify-content-around">
                        <div class="col-7">
                        <main class="text-center">
                            <h3>Nuestro sitio</h3>
                            
                            <div>
                                <img class="img-fluid padd" loading="lazy" src={pictures.img1} alt="imagen"/> 
                                <h4 class="no-margin">Proximos eventos</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, rerum, reprehenderit consequatur perferendis officia, vitae fuga animi temporibus itaque atque reiciendis ea excepturi! Molestias aperiam fugiat deleniti laudantium atque numquam?</p>
                                <a href="#" class="boton">Mas información</a>
                            </div>
                                        
                            <div>
                                <img class="img-fluid padd" loading="lazy" src={pictures.img2} alt="imagen"/>
                                <h4 class="no-margin">¿Quieres participar?</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, rerum, reprehenderit consequatur perferendis officia, vitae fuga animi temporibus itaque atque reiciendis ea excepturi! Molestias aperiam fugiat deleniti laudantium atque numquam?</p>
                                <a href="#" class="boton ">Mas información</a>
                            </div>
                            
                            <div class="">
                                <img class="img-fluid padd" loading="lazy" src={pictures.img3} alt="imagen"/> 
                                <h4 class="no-margin">Contactanos</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, rerum, reprehenderit consequatur perferendis officia, vitae fuga animi temporibus itaque atque reiciendis ea excepturi! Molestias aperiam fugiat deleniti laudantium atque numquam?</p>
                                <a href="#" class="boton">Mas información</a>
                                
                            </div>
                            
                        </main>
                        </div>
                        <div class="col-3">
                        
                            <h3>Contacto</h3>
            
                            <form>
                                <div class="mb-3">
                                <label for="email1" class="form-label">Direccion email</label>
                                <input type="email" class="form-control" id="email1" aria-describedby="emailHelp"/>
                                <div id="emailHelp" class="form-text">Nunca compartimos tu informacion con alguien mas.</div>
                                </div>
                                <div class="mb-3">
                                <label for="comment1" class="form-label">Comentarios</label>
                                <textarea class="form-control" id="comment1" rows="3"></textarea>
                                </div>
                                <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="Check1"/>
                                <label class="form-check-label" for="Check1">Check</label>
                                </div>
                                <button type="submit" class="boton">Enviar</button>
                            </form>
                
                            
                        
                        </div>
                    </div>
                    
                    
                </div>
            
                <footer class="footer">
                    <div class="container-fluid">
                        <div class="row align-items-start">
                            <div class="margin-up col-4">
                                    <a class="logo" href="index.html">
                                        <h1 class="no-margin">GESCON</h1>
                                    </a>
                                </div>
                                <div class="margin-up col-8">
                                    <nav class="text-end ">
                                        <a href="/nosotros" class="nave padd">Nosotros</a>
                                        <a href="/congresos" class="nave padd" >Congresos</a>
                                        <a href="/contacto" class="nave padd">Contacto</a>
                                    </nav>
                                </div>
                        </div>          
                    </div>
            
                    <div class="margin-up container text-center">
                        <p class="no-margin">Derechos reservados</p>
                    </div>
                </footer>
            </div>
            
        
    
    );

}

export default principal;