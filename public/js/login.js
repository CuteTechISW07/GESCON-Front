$(document).ready(() => {

    var email = $("#email");
    var password = $("#password");
    var button = $("#button");

    button.click(() => {
        var e = email.val();
        var pass = password.val();

        if (e != null && e!= "" && e.indexOf('@')>=0) {
            if (pass != null && pass!="") {
                login(e, pass).then((response) => {
                    if (response != null) {
                        if (response.success) {
                            localStorage.setItem('tokenSession', response.client.token)
                            window.location.href = ("./index.html")
                        } else {
                                alert(response.error.message)
                                switch(response.error.code){
                                    case 5003:
                                        window.location.href = ('./confirmEmail.html');
                                        break;
                                    
                                    default:
                                        email.val("")
                                        password.val("")
                                        email.focus()
                                        break;

                                }
                        }
                    } else {
                        alert("Ocurrió un error con el servidor")
                    }
                });
            }else{
                alert("Ingresa la contraseña")
                password.focus()
            }
        }else{
            alert("Ingresa un correo válido")
                email.focus()
        }
    });

});


const login = (email, password) => {

    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/login',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        data:JSON.stringify({ "password": password, "email": email }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}