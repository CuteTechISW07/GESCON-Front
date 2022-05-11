export default function authHeader(){
    const token = localStorage.getItem("token");

    if(token){
        return { "access-token" : token, "Content-Type" : "application/json"};
    }else{
        return {"Content-Type" : "application/json"};
    }
}