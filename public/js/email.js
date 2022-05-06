$(document).ready(() => {


    var button = $("#button");
    var code = $("#code");
    var email = $("#email");

    var token = localStorage.getItem("tokenSession");
    var message = localStorage.getItem("message");

    if (token == null || token.length == 4) {
        flag = false;
    } else {
        flag = true
        email.css({ "display": "none" })
    }

    if (message != null ) {
        
        if (flag) {
            alert(message);
        }

    }

    button.click(() => {
        c = code.val();

        if (flag) {

            e = email.val();
        }

        if (c != null && c!="") {
            sendCode(token, c, email = e).then((response) => {
                if (response.success) {
                    alert("Email validado.")
                    if (flag) {
                        window.location.href = 'index.html'
                        localStorage.removeItem('message')
                    } else {
                        window.location.href = 'login.html'
                    }
                } else {
                    alert(response.error.message);
                    switch (response.error.code) {
                        case 1001:
                            email.val("");
                            code.val("");
                            if (flag) {
                                email.focus();
                            } else {
                                code.focus();
                            }
                            break;
                        case 1002:
                            window.location.reload()
                            localStorage.removeItem('message')
                            code.val("");
                            code.focus();
                            break;
                        case 1003:
                            localStorage.removeItem('messager')
                            localStorage.removeItem('tokenSession')
                            window.location.reload();
                            break;
                        case 1004:
                            window.location.href = 'login.html';
                            break;

                    }
                }

            })
        }else{
            alert("Ingresa un código válido");
        }

    });


});


const sendCode = (token, code, email = null) => {

    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/email',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', "token": token },
        data:JSON.stringify({ "code": code, "email": email }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}