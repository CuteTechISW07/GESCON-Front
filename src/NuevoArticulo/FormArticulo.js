import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector} from "react-redux";
import authHeader from "../services/auth-headers";
import axios from 'axios'
import "./style.css"

/**
 * Componente principal que se va a mostrar
 */
function FormArticulo(){
    const [show, setShow] = useState(false);

    const handleShow = () => {setShow(true)};
    const handleClose = ()=> setShow(false);
    return (
        <div className="container">
            <div className="row">
                <div className="col-auto">
                    <button className="btn-primary" onClick={handleShow}>
                        Nuevo Articulo
                    </button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Registro de articulo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formulario />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn-danger" onClick={handleClose}>
                                Cerrar
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

function Formulario(){
    // Datos del usuario
    const user = useSelector((state)=>state.usrData);

    // Estado del componente
    const [archivo,setArchivo] = useState("");
    const [tema, setTema] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    // Función para hacer la petición al servidor
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(archivo)
        const formData = new FormData();
        formData.append('id_user', user.id);
        formData.append('file', archivo);
        formData.append('tema', tema);

        const data = await axios.post("http://localhost:3500/articulos/newArticle",formData, authHeader("multipart"));
        setError(data.data.error);
        setMessage(data.data.message);
    }

    // Función para almacenar los valores en el estado
    const handleChange = (toChange, value)=>{
        switch(toChange){
            case "archivo":
                setArchivo(value);
            break;
            case "tema":
                setTema(value)
            break;
        }
    }

    return(
        <div className="form">
           <form className="formulario" onSubmit={handleSubmit}>
                <br />
                <div className="titulo">Subir artículo</div>
                <br />
                <input type="file" id="inputUsuario" placeholder="Nombre del artículo" onChange={e=>handleChange("archivo",e.target.files[0])}/>
                <br />
                <input type="text" id="inputClave" placeholder="Tema" onChange={e=>handleChange("tema",e.target.value)}/>
                <br />
                <br/><br/>
                <button type="submit" id="ingreso">Subir</button>
                <br/>
                {error?<p className="alert-error"> {message} </p> :<p className="alert-fine">{message}</p>}
            </form>
        </div>
    );
}

export default FormArticulo;