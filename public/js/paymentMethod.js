$(document).ready(() => {
    var poa = $("#changePayment");
    var flag = false;
    var addPayment = $("#addPayment");
    var token = localStorage.getItem('tokenSession');
    var hasChanges = false;
    var cardHolder = $("#cardHolder");
    var cardNumber = $("#cardNumber");
    var month = $("#month");
    var year = $("#year");
    var cvv = $("#cvv");
    $("#paymentId").css({"display":"none"});

    $("#titlePOA").css({ "display": "none" });



    getPaymentMethod(token).then((response) => {
        if (response != null) {
            console.log(response);
            if (response.success) {
                $("#paymentId").val(response.payment.id)
                hasPayment = true;
                cardHolder.val(response.payment.name);
                cardNumber.get(0).type = 'text';
                month.get(0).type = 'text';
                year.get(0).type = 'text';
                cardNumber.val("XXXX-XXXX-XXXX-" + response.payment.digits);
                month.val("MM");
                year.val("YY");
                cvv.val("CVV");
                addPayment.text("Modificar tarjeta")
                cardNumber.click(() => {
                    cardNumber.get(0).type = 'number';
                    cardNumber.val(response.payment.number);

                });
                year.click(() => {
                    year.get(0).type = 'number';
                    year.val(response.payment.year);

                });
                month.click(() => {
                    month.get(0).type = 'number';
                    month.val(parseInt(response.payment.month));

                });
                cvv.click(() => {
                    cvv.get(0).type = 'number';
                    cvv.val(parseInt(response.payment.cvv));

                });
                cardNumber.blur(() => {
                    if (!hasChanges) {
                        cardNumber.get(0).type = 'text';
                        cardNumber.val("XXXX-XXXX-XXXX-" + response.payment.digits);
                    }
                });
                year.blur(() => {
                    if (!hasChanges) {
                        year.get(0).type = 'text';
                        year.val("YY");
                    }
                });
                month.blur(() => {
                    if (!hasChanges) {
                        month.get(0).type = 'text';
                        month.val("MM");
                    }
                });
                cvv.blur(() => {
                    if (!hasChanges) {
                        cvv.get(0).type = 'text';
                        cvv.val("CVV");
                    }

                });


            }
        }

    });
    document.addEventListener('keypress', e => {
        hasChanges = true;
    })
    poa.click(() => {

        if (flag) {
            flag = false;
            $("#payment_detail").css({ "display": "block" })
            $("#titlePOA").css({ "display": "none" })
            poa.text("Pago contra entrega")
            addPayment.css({ "display": "block" })
        } else {
            flag = true;
            $("#payment_detail").css({ "display": "none" })
            $("#titlePOA").css({ "display": "block" })
            addPayment.css({ "display": "none" })
            poa.text("Pago con tarjeta")
        }

    })

    addPayment.click(() => {
        if (!flag) {
            cH = cardHolder.val();
            cN = cardNumber.val();
            m = month.val();
            y = year.val();
            ccv = cvv.val();

            if (cN.length != 16 && typeof (cN) != "int") {
                alert("Número de tarjeta inválido");
                cardNumber.val("");
                cardNumber.focus();
                return;
            }
            if (m > 12) {
                alert("Ingresa un mes de expiración válid");
                month.val("");
                month.focus();
                return;
            }
            if (y <= 21 && m <= 06) {
                alert("Tarjeta expirada");
                year.val("");
                month.val("");
                year.focus();
                cvv.val("");
                return;
            }


            if (cH != "" && cN != "" && m != "" && y != "" && ccv != "") {

                if (hasChanges) {
                    updatePaymentMethod(token, cH, cN, m, y, ccv).then((response) => {
                        if (response != null) {
                            if (response.success) {
                                console.log(response)
                                $("#addPaymentModal").modal('show');
                                cardNumber.get(0).type = 'text';
                                cardNumber.val("XXXX-XXXX-XXXX-" + response.digits)
                                cvv.css({ "display": "none" })
                                cvv.css({ "display": "none" })
                                addPayment.css({ "display": "none" })
                                year.css({ "display": "none" })
                                month.css({ "display": "none" })
                            } else {
                                alert(response.error.message);
                            }
                        }
                    });
                } else {
                    savePaymentMethod(token, cH, cN, m, y, ccv).then((response) => {
                        if (response != null) {
                            if (response.success) {
                                console.log(response)
                                $("#addPaymentModal").modal('show');
                                cardNumber.get(0).type = 'text';
                                cardNumber.val("XXXX-XXXX-XXXX-" + response.digits)
                                cvv.css({ "display": "none" })
                                cvv.css({ "display": "none" })
                                addPayment.css({ "display": "none" })
                                year.css({ "display": "none" })
                                month.css({ "display": "none" })
                            } else {
                                alert(response.error.message);
                            }
                        }
                    });
                }
                
            }
            else {
                alert("Ingresa datos válidos")
            }

        }
    });

});

const savePaymentMethod = (token, cardHolder, cardNumber, month, year, cvv) => {

    payment = {
        "cardHolder": cardHolder,
        "cardNumber": cardNumber,
        "month": month,
        "year": year,
        "cvv": cvv
    }

    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ "payment": payment }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}


const getPaymentMethod = (token) => {

    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}

const updatePaymentMethod = (token, cardHolder, cardNumber, month, year, cvv, id) => {

    payment = {
        "id": id,
        "cardHolder": cardHolder,
        "cardNumber": cardNumber,
        "month": month,
        "year": year,
        "cvv": cvv
    }

    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ "payment": payment }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}