import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormArticulo from "../NuevoArticulo/FormArticulo";

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
        <div className="m-0  row justify-content-center align-items-center">
            <FormArticulo />
            <TableArticles />
        </div>
    );
}



function TableArticles(){
    const gestArticles = ()=>{

    }
    return(
        <table>
            <thead>

            </thead>
        </table>
    );
}

export default MyArticles;