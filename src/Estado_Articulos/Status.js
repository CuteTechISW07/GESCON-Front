import { useEffect, useState } from 'react';
function Status_Art() {
    return (
        <div class="container ">
            <h1 class="pt-2 text-center">Estado de Articulos</h1>
            <div class=" pt-5 align-items-center">
                <Table_Arts />
            </div>
        </div>

    );

}

function Table_Arts() {

    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        responseAPI();
    }, [])

    const responseAPI = async () => {
        const requestOptions = {
            method: 'POST',
        }
        const data = await fetch("http://localhost:3500/articulos", requestOptions);
        const dataJson = await data.json();
        setError(dataJson.error);
        setMessage(dataJson.message);
        setArticulos(dataJson.data);
    }

    return (
        <div>

            <table className='table table-striped table-bordered table-hover'>
                <thead className='table-dark'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Articulo</th>
                        <th scope='col'>Versión</th>
                        <th scope='col'>Autor</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                {error ? message : ((articulos != null ? <Rows_Arts rows={articulos} /> : message))}
            </table>

        </div>
    );

}

function Rows_Arts(props) {
    const arts = props.rows.map((row, i) => {
        return (
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
                <td>
                    {row.autor}
                </td>
                <td>
                    <button type="button" class="btn btn-outline-success ms-3" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"></path>
                        </svg>
                        Aceptar
                    </button>

                    <button type="button" class="btn btn-outline-danger ms-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path>
                        </svg>
                        Rechazar
                    </button>

                    <button type="button" class="btn btn-outline-warning ms-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
                        </svg>
                        Descartar
                    </button>

                </td>
            </tr>
        );
    });
    return (
        <tbody>
            {arts}
        </tbody>
    );
}

export default Status_Art;