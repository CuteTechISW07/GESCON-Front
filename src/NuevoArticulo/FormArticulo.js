import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector} from "react-redux";
import authHeader from "../services/auth-headers";
import axios from 'axios'


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
    const user = useSelector((state)=>state.usrData);
    const [archivo,setArchivo] = useState("");
    const [tema, setTema] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        //const body={
        //    id_user : user.id,
        //    file : archivo,
        //    tema : tema
        //}

        const formData = new FormData();
        formData.append('id_user', user.id);
        formData.append('file', archivo);
        formData.append('tema', tema);

        const data = await axios.post("http://localhost:3500/articulos/newArticle",formData, authHeader("multipart"));
        setError(data.data.error);
        setMessage(data.data.message);
    }

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
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="articulo">Articulo</label>
                    <input type="file" name="articulo" id="articulo" accept="application/pdf" onChange={e=>handleChange("archivo",e.target.files[0])} />
                </div>
                <div className="form-group">
                    <label htmlFor="articulo">Tema</label>
                    <input type="text" name="tema" id="tema" onChange={e=>handleChange("tema",e.target.value)} placeholder="Tematica de su articulo" />
                </div>
                <button>
                    Enviar
                </button>
                <div className="form-group">
                    <p className={error ? "danger" : "primary"}>{message}</p>
                </div>
            </form>
        </div>
    );
}

export default FormArticulo;