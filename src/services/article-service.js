const updateStatus = async (idVersion,newState) =>{

    const req = {
        "idVersion":idVersion,
        "newState":newState
    }
    const requestOptions = {
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
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