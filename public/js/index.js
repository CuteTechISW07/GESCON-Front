$(document).ready(() => {
    var user = $("#user");
    var email = $("#email");
    var logout = $("#logout");
    var signup = $("#signup");
    var profile = $("#profile");
    var summary = $("#summary");
    var token = localStorage.getItem('tokenSession');
    var cartType = localStorage.setItem('cartType',1);
    var flag = false;

    if (token == null || token.length == 4) {
        profile.css({ "display": "none" });
        flag = false;
        summary.css({ "display": "none" });
    } else {
        flag = true
        getDataClient(token);
        signup.text("")
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
                    window.location.href = "./index.html"
                }
            });
        } else {
            window.location.href = "./login.html"
        }
    });

    signup.click(() => {
        if (!flag) {
            window.location.href = "./Crearcuenta.html"
        }
    });

})

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
            client = data.client
            user.append(data.client.name)
            email.append(data.client.email)
            return data;
        }
    });
}

const setStyle = () => {

    $('.products-slick').each(function () {
        var $this = $(this),
            $nav = $this.attr('data-nav');

        $this.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            appendArrows: $nav ? $nav : false,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            ]
        });
    });
}



