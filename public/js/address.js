$(document).ready(() => {

    var add = $("#addAddress")
    var token = localStorage.getItem('tokenSession');

    $("#addressId").css({"display":"none"})
    getAddress(token).then((response) => {
        if (response != null) {

            if (response.success) {
                var address = response.address
                console.log(address);
                localStorage.setItem('addressId',address.id)
                $("#addressId").val(address.id);
                $("#name").val(address.name);
                $("#lastName").val(address.lastName);
                $("#street").val(address.street);
                $("#extNum").val(address.extNum);
                $("#city").val(address.city);
                $("#suburb").val(address.suburb);
                $("#zipCode").val(address.zipCode);
                $("#phone").val(address.phone);
                add.text("Modificar")
            }
        }
    });
    add.click(() => {
        var name = $("#name").val();
        var lastName = $("#lastName").val();
        var street = $("#street").val();
        var extNum = $("#extNum").val();
        var city = $("#city").val();
        var suburb = $("#suburb").val();
        var zipCode = $("#zipCode").val();
        var phone = $("#phone").val();
        var notes = $("#notes").val();
        if (name != "" && lastName != "" && street != "" && extNum != "" && city != "" && suburb != "" && zipCode != "" && phone != "") {

            address(name + " " + lastName, street, extNum, city, suburb, zipCode, phone, token).then((response) => {
                $('#agregart').modal('show');
                if (response != null) {

                    if (response.success) {
                        $("#title").text("Confirmación")
                        $("#msg").text("La dirección de envío ha sido agregado correctamente");
                        add.text("Modificar")
                        window.location.reload()
                    } else {

                        $("#title").text("Lo sentimos :( ")
                        $("#msg").text("No se pudo guardar la dirección de envío. Intenta más tarde")
                    }

                }else{
                    $("#title").text("Lo sentimos :( ")
                    $("#msg").text("No se pudo guardar la dirección de envío. Intenta más tarde")
                }

            })
        } else {
            alert("Ingresa los datos correspondientes")
        }
    });


});

const address = (name, street, extNum, city, suburb, zipCode, phone, token) => {

    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/address',
        contentType: 'application/json',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data:JSON.stringify({
            "name": name,
            "street": street,
            "extNum": extNum,
            "city": city,
            "suburb": suburb,
            "zipCode": zipCode,
            "phone": phone
        }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });

}

const getAddress = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/address',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

