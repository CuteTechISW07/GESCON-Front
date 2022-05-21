export default function authHeader(type){
    const token = localStorage.getItem("token");

    if(type==="multipart"){
        if(token){
            return { "access-token" : token, "Content-Type" : "multipart/form-data"};
        }else{
            return {"Content-Type" : "application/json"};
        }
    }

    if(token){
        return { "access-token" : token, "Content-Type" : "application/json"};
    }else{
        return {"Content-Type" : "application/json"};
    }
}