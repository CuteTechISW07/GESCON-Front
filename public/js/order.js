$(document).ready(() => {
    var order = $("#order");
    var terms = $("#terms-container");
    var cartType = parseInt(localStorage.getItem('cartType'));
    var payment_method = $("#payment_method");
    var address = $("#address-container");
    var addAddress =$("#addAddress");
    var token = localStorage.getItem('tokenSession')
    var terminos = $("#terminos");
    var flag = false;
    var paymentId=$("#paymentId");
    var addressId = $("#addressId");


    payment_method.css({"display":"none"});
    order.click(() => {
        if (flag) {
            if (terminos.is(":checked")) {
                createOrder(token,addressId.val(),paymentId.val(),cartType).then((response)=>{
                    if(response != null){
                        if(response.success){
                            $("#compra").modal("show");
                            window.setTimeout(function(){
                                window.location.href = "index.html";
                        
                            }, 7000);
                        }else{
                            alert(response.error.message);
                        }
                    }
                });
                //
            } else {
                alert("Primero debes aceptar los términos y condiciones");
                terminos.focus()
            }
        }else{
            console.log(addressId.val());
            if(addressId.val() !="" ){
                flag=true;
                addAddress.css({"display":"none"})
                address.css({"display":"none"})
                payment_method.css({"display":"block"});
                order.text("Confirmar orden");
            }else{
                alert("Primero selecciona un método de envío");
            }

        }


    });


    //

});


const createOrder = (token, addressId, paymentId,cartType) => {
    console.log(addressId);
    console.log(paymentId);
    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/order',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ "addressId": addressId, "paymentId": paymentId,"cartType":cartType}),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}