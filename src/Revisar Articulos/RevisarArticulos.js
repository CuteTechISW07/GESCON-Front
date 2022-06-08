import authHeader from '../services/auth-headers';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./style.css"
import { Modal } from 'react-bootstrap';
import { saveAs } from 'file-saver';

function RevisarArticulos() {
    const user = useSelector((state) => state.usrData);
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(0);
    const [url, setUrl] = useState('');

    const validate = ()=>{
        if(user.tipo_user != 2)
            navigate("/");
    }

    const selectArticle = (id_articulo,url)=>{
        setSelectedArticle(id_articulo)
        setUrl(`http://localhost:3500${url}`)
    }

    useEffect(()=>{
        validate();
    },[])

    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-4 p-3 ml-2'>
                    <TableRev selectArticle = {selectArticle} selectedArticle = {selectedArticle}/>
                </div>
                <div className='col-md-6'>
                    {selectedArticle != 0 ? <iframe src={url} />:<></>}
                </div>
            </div>
            <div className='row'>
                
            </div>
        </div>
    );
}

function TableRev({selectArticle, selectedArticle}){
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [list, setList] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(()=>{responseAPI()},[])

    const handleShow = ()=>{setShow(true)}
    const handleClose = ()=>{setShow(false)}


    const responseAPI = async()=>{
        const requestOptions={
            method : "GET",
            headers : authHeader("")
        }

        const data = await fetch("http://localhost:3500/revisores/myArticles", requestOptions);
        const dataJson = await data.json();

        setList(dataJson.data);
        setError(dataJson.error);
        setMessage(dataJson.message);
        
    }

    const showArticle = (id_articulo,url)=>{
        selectArticle(id_articulo,url)
        handleShow()
    }


    return(
        <table className='ml-2 table table-striped table-bordered'>
            <thead className='table-dark'>
                <tr>
                    <th scope='col'>Autor</th>
                    <th scope='col'>Articulo</th>
                    <th scope='col'>Versión</th>
                    <th scope='col'>Estatus</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            {/* Aquí mandamos a llamar (si no hay error) el componente donde se le da formato de tabla al arreglo */}
            {error ? message : ((list.length != 0 ? <Rows_Arts rows = {list} selectArticle={selectArticle} showArticle ={showArticle} /> : message))}
            <ModalComentar show={show} handleClose={handleClose} id_version = {selectedArticle}  refresh={responseAPI} selectArticle={selectArticle}/>
        </table>
    );
}

function Rows_Arts({rows, selectArticle, showArticle}){

    const download= (archivo)=>{
        const url = `http://localhost:3500${archivo}`
        saveAs(url);
    }

    // Recorremos el arreglo con la función map (similar a un for pero nos deja almacenar con un return los componentes en la constante que declaramos)
    // Aquí se le da el formato a cada columna con respecto a lo que hayamos recibido
    const arts = rows.map((row,i)=>{

        return(
            <tr key={i}>
                <td scope='row'>
                    {row.autor}
                </td>
                <td>
                    {row.titulo_articulo}
                </td>
                <td>
                    {row.num_version}
                </td>
                <th>
                    {row.estatus}
                </th>
                <td>
                    <div className='row'>
                        <div className='col-md-10'>
                            <button className='btn btn-primary' onClick={e=>selectArticle(row.id_version, row.archivo)}>Ver Artículo</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-10'>
                            <button className='btn btn-success' onClick={e=>download(row.archivo)}>Descargar Artículo</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-10'>
                            <button className='btn btn-warning' onClick={e=>showArticle(row.id_version, row.archivo)}>Comentar</button>
                        </div>
                    </div>
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


function ModalComentar({show, handleClose, id_version, refresh, selectArticle}){
    const [newStat, setNewStat] = useState(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const body = {
            id_version: id_version,
            comment: comment,
            estatus : newStat
        }

        const requestOptions ={
            headers:authHeader(""),
            body : JSON.stringify(body),
            method : "POST"
        }

        const data = await fetch("http://localhost:3500/revisores/evaluar",requestOptions);
        const dataJson = await data.json();

        await setError(dataJson.error);
        await setMessage(dataJson.message);

        if(!error){
            alert(message);
            refresh();
            handleClose();
            selectArticle(0,"");
        }
    }

    const handleChange = (toChange,value)=>{
        switch (toChange) {
            case "comment":
                setComment(value)
                break;
            case "newStat":
                setNewStat(value)
            default:
                break;
        }
    }

    const vaciar = ()=>{
        setNewStat(0);
        setComment("");
        setError(false);
        setMessage("");
        handleClose();
    }
    
    return(
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Agregar un comentario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='form' onSubmit={e=>handleSubmit(e)}>
                    <textarea placeholder='Escriba aquí su comentario' required rows={6} cols={60} onChange={e=>handleChange("comment",e.target.value)}></textarea>
                    <div className='form-group'>
                        <label htmlFor='selector'>Veredicto</label>
                        <select id='selector' onChange={e=>handleChange("newStat",e.target.value)}>
                            <option value={0}>Seleccione una opción</option>
                            <option value={6}>Aprobar</option>
                            <option value={7}>Devolver</option>
                    </select>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-success'>Envíar revisión</button>
                    </div>
                    {
                        error ? 
                        <div className='danger-error'>
                            {message}
                        </div>:<></>
                    }
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-danger' onClick={vaciar}>Cerrar</button>
            </Modal.Footer>
        </Modal>
    );

}

export default RevisarArticulos;