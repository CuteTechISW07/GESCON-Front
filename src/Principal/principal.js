import React from 'react';
import pictures from '../assets/pictures';
import "./style.css"

const principal= () => {
    return(
        
            <div>
                     
                <div className="container-fluid padd">
                    <div className="row justify-content-around">
                        <div className="col-7">
                        <main className="text-center">
                            <h3>Nuestro sitio</h3>
                            
                            <div>
                                <img id="imgp" className="img-fluid padd" loading="lazy" src={pictures.img1} alt="imagen"/> 
                                <h4 className="no-margin">Proximos eventos</h4>
                                <p>Gracias a nuestro sistema hamos logrado que cada usuario pueda conocer nuevos congresos. Nos efinimos como una plataforma segura en la que cada usuario podrá sentirse cómodo, ya que nuestro fácil acceso no se encuentra en algún otro sistema.</p>
                            </div>
                                        
                            <div>
                                <img id="imgp" className="img-fluid padd" loading="lazy" src={pictures.img2} alt="imagen"/>
                                <h4 className="no-margin">¿Quieres participar?</h4>
                                <p>Hagámoslo realidad. Te animamos a que nos brindes la oportunidad de poder servirte, por favor proporcionanos tus datos un el formulario encontrado en la parte superior</p>
                            </div>
                            
                            <div className="">
                                <img id="imgp" className="img-fluid padd" loading="lazy" src={pictures.img3} alt="imagen"/> 
                                <h4 className="no-margin">Contactanos</h4>
                                <p>Nuestro correo es gescon_cutech@gmail.com y nuestro telefono es 55555555555</p>
                                
                            </div>
                            
                        </main>
                        </div>
                        <div className="col-3">
                        
                            <h3>Contacto</h3>
                            <a href="mailto:gescon_cutech@gmail.com"></a>
                            <form>
                                <div className="mb-3">
                                <label id="email1" for="email1" className="form-label">Direccion email</label>
                                <input type="email" className="form-control" id="email1" aria-describedby="emailHelp"/>
                                <div id="emailHelp" className="form-text">Nunca compartimos tu informacion con alguien mas.</div>
                                </div>
                                <div className="mb-3">
                                <label id = "comment1" for="comment1" className="form-label">Comentarios</label>
                                <textarea className="form-control" id="comment1" rows="3"></textarea>
                                </div>
                                <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="Check1"/>
                                <label className="form-check-label" for="Check1">Acepto términos y condiciones</label>
                                </div>
                                <button type="submit" id="boton" className="boton"><a id= "texto">Enviar</a></button>
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