$(document).ready(() => {
    var button = $("#button");
    var email = $("#email");
    var password = $("#password");
    var confirmPass = $("#confirmPass");
    var name = $("#name")
    var lastName = $("#lastName")
    var secondLastName = $("#secondLastName")
    var div = $("#email_container");
    $('#loader').modal('hide');

    button.click(() => {
        e = email.val();
        p = password.val();
        conf = confirmPass.val()
        n = name.val()
        ln = lastName.val()
        sln = secondLastName.val()

        if (e != "" && p != "" && conf != "" && n != "" && ln != "") {
            if ($("#terminos").is(":checked")) {
                if (p.length > 8) {
                    if (e.includes("@")) {
                        $('#loader').modal('show');
                        createAccount(e, p, conf, n.trim(), ln, sln).then(((data) => {
                            if (data) {
                                $('#loader').modal('hide');

                                if (data.success) {
                                    localStorage.setItem('tokenSession', data.token)
                                    localStorage.setItem('message', "Acabamos de enviar un código de verificación a el correo registrado, por favor revisa tus mensajes e ingrésalo debajo")
                                    window.location.href = ('./confirmEmail.html')
                                } else {
                                    alert(data.error.message)
                                    switch (data.error.code) {
                                        case 4000:
                                            password.val("")
                                            confirmPass.val("")
                                            break;
                                        case 4002:
                                            email.val("")
                                            break;
                                        case 4003:
                                            window.location.reload()
                                            email.val("")
                                            password.val("")
                                            confirmPass.val("")
                                            break;
                                        default:
                                            console.log("Other error")
                                    }
                                }
                            }
                        }));
                    }else {
                        alert("Formato de correo inválido");
                        email.val("");
                        email.focus();
                    }
                }else {
                    alert("Longitud minima de la contraseña: 8 caracteres")
                    password.val("")
                    confirmPass.val("")
                    password.focus()
                }
            } else {
                alert("Primero debes aceptar los términos y condiciones")
            }
        }
        else {
            alert("Ingresa todos los campos");
        }

    });
})

const createAccount = (email, password, confirmPass, name, lastName, secondLastName) => {
    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/sign-up',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        data:JSON.stringify({ "name": name, "lastName": lastName, "secondLastName": secondLastName, "confirmPass": confirmPass, "password": password, "email": email }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}