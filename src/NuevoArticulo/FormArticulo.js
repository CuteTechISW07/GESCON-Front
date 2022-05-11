import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector} from "react-redux";
import authHeader from "../services/auth-headers";


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
                            <button className="btn-danger">
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
    const [archivo,setArchivo] = useState(null);
    const [tema, setTema] = useState("");
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(archivo);
        const body = {
            id_user : user.id,
            file : archivo,
            tema : tema
        }
        
        const requestOptions ={
            method: "POST",
            headers : authHeader(),
            body : JSON.stringify(body),
        }
        /*
        const data = await fetch("http://localhost:3500/Article/insert",requestOptions);
        const dataJson = await data.json();
        */
        console.log(body);
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
                    <input type="file" name="articulo" id="articulo" accept="application/pdf" onChange={e=>handleChange("archivo",e.target.files)} />
                </div>
                <div className="form-group">
                    <label htmlFor="articulo">Tema</label>
                    <input type="text" name="tema" id="tema" onChange={e=>handleChange("archivo",e.target.value)} placeholder="Tematica de su articulo" />
                </div>
                <button>
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default FormArticulo;