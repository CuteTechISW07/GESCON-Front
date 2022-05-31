import authHeader from "./auth-headers";

const updateStatus = async (idVersion,newState) =>{

    const req = {
        "idVersion":idVersion,
        "newState":newState
    }
    const requestOptions = {
        method : "POST",
        headers: authHeader(""),
        body : JSON.stringify(req)
    }
    const data = await fetch("http://localhost:3500/articulos/setState",requestOptions);
    const dataJson = await data.json();
    return dataJson;
}

const articleService = {
    updateStatus
}

export default articleService;