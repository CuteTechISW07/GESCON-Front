$(document).ready(() => {
    var user = $("#user");
    var email = $("#email");
    var logout = $("#logout");
    var flag = false;
    token = localStorage.getItem('tokenSession');
    productId = parseInt(localStorage.getItem('productId'));

    if (token == null || token.length == 4) {
        flag = false
    } else {
        flag = true
        getDataClient(token).then((data) => {
            console.log(data)
        });
        logout.text("Cerrar Sesión");
    }

    logout.click(() => {
        if (flag) {
            closeSession(token).then((data) => {
                if (data) {
                    localStorage.removeItem('tokenSession');
                    user.val("")
                    email.val("")
                    alert("Haz cerrado sesión")
                    window.location.href = ("./index.html");
                }
            });
        } else {
            window.location.href = ("./login.html")
        }
    });
});

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

const getDataClient = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/login',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            console.log("response")
            client = data.client
            user.append(data.client.name)
            email.append(data.client.email)
            return data;
        }
    });
}


