import authHeader from "./auth-headers";


const registry = async (user) =>{
    const requestOptions = {
        method : "POST",
        headers : authHeader(),
        body : user
    }
    const data = await fetch("http://localhost:3500/User/createUser",requestOptions);
    const dataJson = await data.json();
    return dataJson;
}

const login = async (email, password) =>{
    const bodyReq = {
        correo : email,
        clave : password
    }

    const requestOptions = {
        method : "POST",
        headers : authHeader(),
        body : JSON.stringify(bodyReq)
    }
    const data = await fetch("http://localhost:3500/User/authUser",requestOptions);
    const dataJson = await data.json();
    
    if(dataJson.token){
        localStorage.setItem("user", JSON.stringify(dataJson))
    }

    return dataJson;
}

const logout = () =>{
    localStorage.removeItem("user");
}

const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"))
}

const authService = {
    login,
    logout,
    getCurrentUser,
    registry,
}

export default authService;