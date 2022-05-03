import {useEffect, useState} from 'react';

function ConsRev(){
    return (
        <div class="container ">
            <h1 class="pt-2 text-center">Consultar Revisiones</h1>
            <div class=" pt-5 align-items-center">
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
        }
        const data = await fetch("http://localhost:3500/articulos",requestOptions);
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
                        <th scope='col'>Estatus</th>
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

export default ConsRev;