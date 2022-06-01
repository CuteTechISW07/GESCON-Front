import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormArticulo from "../NuevoArticulo/FormArticulo";
import authHeader from '../services/auth-headers';

function MyArticles(){
    const user = useSelector((state) => state.usrData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = ()=>{
        if(user.tipo_user != 1)
            navigate("/");
    }

    useEffect(()=>{validate()},[])

    return(
        <div className="container ">
            <h1 className="pt-2 text-center">Mis Articulos</h1>
            <div className=" pt-5 align-items-center">
                <FormArticulo />
                <br/>
                <Table_Arts />
            </div>
        </div>
    );
}



function Table_Arts(){
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(()=>{
        responseAPI();
    },[])

    const responseAPI = async()=>{
        const requestOptions = {
            method: 'POST',
            headers : authHeader("")
        }
        const data = await fetch("http://localhost:3500/articulos/consrev",requestOptions);
        const dataJson = await data.json();
        setError(dataJson.error);
        setMessage(dataJson.message);
        setArticulos(dataJson.data);
    }   

    return(
        <div>                
            <table className='table table-striped table-bordered table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Articulo</th>
                        <th scope='col'>Versión</th>
                        <th scope='col'>Estado</th>
                    </tr>
                </thead>
            {error ? message : ((articulos != null ? <Rows_Arts rows = {articulos} /> : message))}
            </table>
            
        </div>
    );
}

function Rows_Arts(props){
    const arts = props.rows.map((row,i)=>{
        return(
            <tr key={i}>
                <td scope='row'>
                    {row.id_articulo}
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
            </tr>
        );
    });
    return(
        <tbody>
            {arts}
        </tbody>
    );
}

export default MyArticles;