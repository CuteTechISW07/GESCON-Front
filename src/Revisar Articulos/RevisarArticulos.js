import authHeader from '../services/auth-headers';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./style.css"

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

    const selectArtcile = (id_articulo,url)=>{
        setSelectedArticle(id_articulo)
        setUrl(`http://localhost:3500${url}`)
        console.log(id_articulo)
    }

    useEffect(()=>{
        validate();
    },[])

    return(
        <>
            <div className='row'>
                <div className='col-md-4 justify-content-center align-items-center'>
                    <TableRev selectArticle = {selectArtcile}/>
                </div>
                <div className='col-md-6'>
                    {selectedArticle != 0 ? <iframe src={url} />:<></>}
                </div>
            </div>
            <div className='row'>
                
            </div>
        </>
    );
}

function TableRev({selectArticle}){
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [list, setList] = useState([]);

    useEffect(()=>{responseAPI()},[])

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


    return(
        <table className='table table-striped table-bordered'>
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
            {error ? message : ((list.length != 0 ? <Rows_Arts rows = {list} selectArticle={selectArticle} /> : message))}
        </table>
    );
}

function Rows_Arts({rows, selectArticle}){
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
                            <button className='btn btn-primary' onClick={e=>selectArticle(row.id_articulo, row.archivo)}>Ver Artículo</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-10'>
                            <button className='btn btn-success'>Descargar Artículo</button>
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


export default RevisarArticulos;