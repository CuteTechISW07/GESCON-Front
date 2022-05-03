import React from 'react';


const principal= () => {
    return(
<header class="header container-xxl">
                    <div class="container-fluid">
                        <div class="row align-items-start">
                            <div class="margin-up col-4">
                                <a href="/" class="logo">
                                    <h1 class="no-margin">GESCON</h1>
                                </a>
                            </div>
                            <div class="margin-up col-8">
                            <nav class="text-end ">
                                
                                <a href="congresos" class="nave padd" >Congresos</a>
                                <a href="contacto" class="nave padd">Contacto</a>                      
                                <a href="login" class="nave padd">Login</a>                      
                                
                                
                            </nav>
                            </div>            
                        </div>
                    </div>
                    <div class="margin-up container text-center">
                        <h2 class="no-margin">Enterate sobre los siguientes eventos</h2>
                    </div>
                </header>

    )}
    export default principal;