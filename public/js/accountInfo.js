$(document).ready(() => {
    var user = $("#user");
    var email = $("#email");
    var logout = $("#logout");
    var signup = $("#signup");
    var token = localStorage.getItem('tokenSession');
    var flag = false;
    if (token == null || token.length == 4) {
        flag = false;

    } else {
        signup.css({"display":"none"})
        logout.text("Cerrar Sesión");
        flag = true;
    }
    getDataClient(token).then((data) => {
        client = data.client
        user.append(client.name)
        email.append(client.email)
    });


    signup.click(()=>{
        console.log("Sign up location")
        window.location.href = './Crearcuenta.html';
    });
    logout.click(() => {
        if (flag) {
            closeSession(token).then((data) => {
                if (data) {
                    localStorage.removeItem('tokenSession');
                    localStorage.removeItem('productId')
                    user.val("")
                    email.val("")
                    alert("Haz cerrado sesión")
                    window.location.href = "./index.html"
                }
            });
        } else {
            window.location.href = "./login.html"
        }
    });


});

const getDataClient = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/login',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {

            console.log(data)
            return data;
        }
    });
}

const closeSession = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/logout',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            if (data) {
                return data;
            }
        }
    })
}