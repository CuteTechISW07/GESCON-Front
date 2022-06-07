import {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';
import authHeader from '../services/auth-headers';

/**
 * Componente principal
 * @returns Vista completa de la página de Gestión de Articulos
 */
function Pag_Gestion(){
    return (
        <div>
            <Head_Gestion />
            <Table_Arts />
        </div>
    );
    
}

/**
 * Componente con la cabecera para la vista de la página, no cuenta con funcionalidad
 * @returns Cabecera o Header
 */
function Head_Gestion(){
    return(
        <article>
            <div className="container-fluid">
                <div className="row">
                    <h1 className="text-center pt-3">Gestión de artículos</h1>
                </div>
            </div>
        </article>   
    );
}

/**
 * Componente con la tabla que muestra los artículos
 * Este componente pide los datos de la API por medio de la función fetch antes de cargar para poder mostrar la tabla
 * @returns  Tabla con artículos
 */
function Table_Arts(){
    
    /**
     * Estado del componente, estas variables se pueden usar dentro de cada parte del componente (es decir la función Table_Arts)
     * en el return o en las funciones que se declaren en ella, en este caso cada variable hace referencia a algo
     * articulos = El arreglo de articulos que recibimos de la base de datos
     * error = bandera de error, si ocurrió un error al procesar la petición
     * message = Mensaje que regresa la API
     * 
     * Las funciones set sirven para modificar el estado
     * para poner el valor por defecto hacemos = useState(valor_por_defecto)
     * 
     */
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [articleSelected, setArticleSelected] = useState(0);

    /**
     * Variables y funciones para controlar el estado del modal
     */
    const [show,setShow] = useState(false);

    const handleShow = (id_articulo) => {
        console.log(id_articulo);
        setArticleSelected(id_articulo);
        setShow(true);
    };
    const handleClose = ()=> setShow(false);

    // Función que se va a cargar antes de que se abra el componente
    useEffect(()=>{
        responseAPI();
    },[])

    // Función que se manda a llamar en el useEffect, pide los datos a la API
    const responseAPI = async()=>{
        // Se determina el metodo de la petición
        const requestOptions = {
            method: 'POST',
            headers : authHeader("")
            // Aquí puede ir un body : {...} si necesitas enviarle algo a la API
        }
        // Se envía la petición a la API en la ruta que se ve abajo
        const data = await fetch("http://localhost:3500/articulos/gestion",requestOptions);

        // Se obtienen los datos de la API y se guardan en el estado del componente
        const dataJson = await data.json();
        
        setError(dataJson.error);
        setMessage(dataJson.message);
        setArticulos(dataJson.data);
    }  
    
    
    // Codigo en HTML donde se va a visualizar la tabla
    return(
        <div className='container-fluid'>
            <div className='m-0 row justify-content-center align-items-center'>
                <div className='col-auto'>
                    <table className='table table-striped table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th scope='col'>Autor</th>
                                <th scope='col'>Articulo</th>
                                <th scope='col'>Versión</th>
                                <th scope='col'>Estatus</th>
                                <th scope='col'>Acción</th>
                            </tr>
                        </thead>
                    {/* Aquí mandamos a llamar (si no hay error) el componente donde se le da formato de tabla al arreglo */}
                    {error ? message : ((articulos != null ? <Rows_Arts rows = {articulos} handleShow={handleShow}/> : message))}
                </table>
                <ModalAsignar handleShow={handleShow} handleClose={handleClose} show={show} idarticulo={articleSelected} refresh={responseAPI} />
                </div>
            </div>
        </div>
    );

}

/**
 * Componente de filas para la tabla, aquí se da formato de tbody al arreglo que recibimos de la base de datos
 * @param {*} props rows: El arreglo completo de articulos
 * @returns TBody completo de los articulos
 */
function Rows_Arts({rows,handleShow}){
    // Recorremos el arreglo con la función map (similar a un for pero nos deja almacenar con un return los componentes en la constante que declaramos)
    // Aquí se le da el formato a cada columna con respecto a lo que hayamos recibido
    const arts = rows.map((row,i)=>{

        return(
            <tr key={i}>
                <td scope='row'>
                    {row.autor}
                </td>
                <td>
                    <a href={row.archivo}>{row.titulo_articulo}</a>
                </td>
                <td>
                    {row.num_version}
                </td>
                <th>
                    {row.estatus}
                </th>
                <td>
                    {row.estatus === "Sin asignar" ? <button className='btn btn-primary' onClick={e=>handleShow(row.id_articulo)}>Asignar revisor</button> : <></>}
                </td>
            </tr>
        );
    });

    // Dentro del tbody cargamos la variable arts que almacenó las columnas y esto hará que se visualice la tabla
    return(
        <tbody>
            {arts}
        </tbody>
    );
}

function ModalAsignar({show, handleClose, handleShow, refresh, idarticulo}){

    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(""); 
    const [id_revisor, setIdRevisor] = useState(0); 

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(id_revisor == 0){
            alert("Debe seleccionar un revisor valido");
        }

        const body = {
            id_revisor : id_revisor,
            id_articulo : idarticulo
        }

        const requestOptions = {
            body: JSON.stringify(body),
            headers : authHeader(""),
            method : "POST"
        }

        const data = await fetch("http://localhost:3500/revisores/asignar", requestOptions);
        const dataJson = await data.json();

        setError(dataJson.error);
        setMessage(dataJson.message);
        alert(message);
        handleClose();
        refresh();
    }

    const getRevisores = async()=>{
        const url = "http://localhost:3500/revisores/list"
        const requestOptions = {
            method: "GET",
            headers : authHeader("")
        }
        const data = await fetch(url, requestOptions);
        const dataJson = await data.json();
        setList(dataJson.data);
        setError(dataJson.error);
        setMessage(dataJson.message)
    }

    const options = list.map((rev, i)=>{
        return(
            <option value={rev.idUsuario} key={i}>{rev.nombre}</option>
        );
    }) 
    
    useEffect(()=>{
        getRevisores()
    },[])

    return(
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Asignar revisor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <select onChange={e=>setIdRevisor(e.target.value)}>
                            <option value={0}>Seleccione una opción</option>
                            {options}
                        </select>
                        <div className='pt-3'>
                            <button className='btn btn-primary col-md-2'>Asignar</button>
                        </div>
                    </form>
                </div>
                {error?<p className="alert-error"> {message} </p> :<></>}
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-danger' onClick={handleClose}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    );
}

// Aquí le hacemos export al componente principal que es el que engloba todos los demás componentes
export default Pag_Gestion;