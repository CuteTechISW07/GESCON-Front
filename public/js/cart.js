$(document).ready(() => {
    token = localStorage.getItem('tokenSession');
    productId = localStorage.getItem('productId');
    var cartType = 1;
    var cartList = $("#cart-list");
    var qtyCart = $("#qty");
    var subtotal = $("#subtotal");
    var qtyTotal = $("#qty-total");
    var deleteProd = $("#delete");
    var detail = $("#cart_detail");

    if (token == null || token.length == 4) {
        flag = false
        $("#no_products").text("Inicia sesión para agregar productos")
        $("#cart_buttons").css({ "display": "none" });

    } else {
        flag = true
        $("#no_products").text("Parece que no hay nada por aquí. ¡Agrega productos!")
    }

    detail.click(()=>{
        localStorage.setItem('cartType',1);
        window.location.href = "Carrito.html";
    });

    getCart(token,cartType).then((response) => {

    var cart = "";
    var qtyProds = 0;
    var toPay = 0;
        if (response.success && response.products != null && response.products != 0) {

            response.products.forEach(element => {
                if (productId == element.product.id) {
                    $("#qty-picker").val(element.qty)
                }
                qtyProds += element.qty
                toPay += parseInt(element.product.price) * parseInt(element.qty)
                cart += cardCart(element.product.name, element.product.price, element.qty, element.product.image,element.product.id);
            });
            if (qtyProds > 1) {
                qtyTotal.text(qtyProds + " Artículos");
            } else {
                qtyTotal.text(qtyProds + " Artículo");
            }
            subtotal.text("Subtotal: $" + toPay + ".00")
            qtyCart.text(qtyProds)
            cartList.html(cart);
        } else {
            $("#summary").css({ "display": "none" });
            $("#cart_buttons").css({ "display": "none" });
        }
    });

    deleteProd.click(() => {
        deleteCart(token,cartType).then((response) => {
            if (response.success) {
                alert("Carrito vaciado!")
                window.location.reload()
            }
        })
    });


    $("#buy").click(() => {
        if (flag) {
            window.location.href = "checkout.html"
        } else {
            alert("Para comprar este producto debes iniciar sesión primero.")
        }

    });

    document.querySelector('#cart-list').addEventListener('click',e =>{
        action = e.target
        if(action.id != "" && action.id != null){
            deleteProductCart(token,action.id,cartType).then((response)=>{
                console.log(response)
                if (response != null){
                    if(response.success){
                        alert("Producto eliminado")
                        window.location.reload()
                    }else{
                        alert(response.error.message)
                    }
                }
            });
        }
    });

});


const getCart = (token,cartType) => {
    return $.ajax({
        method: "GET",
        url: 'http://143.244.156.198:5001/cart',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token, "cartType":cartType},
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}


const deleteCart = (token,cartType) => {
    return $.ajax({
        method: "DELETE",
        url: 'http://143.244.156.198:5001/cart',
        contentType: 'application/json',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        data:JSON.stringify({"cartType":cartType}),
        success: (data, status) => {
            return data;
        }
    });
}

const deleteProductCart = (token,productId,cartType) => {
    return $.ajax({
        method: "PUT",
        url: 'http://143.244.156.198:5001/cart',
        contentType: 'application/json',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data:JSON.stringify({"productId":productId,"cartType":cartType}),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}




const addToCart = (token, productId, qty,cartType) => {
    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/cart',
        contentType: 'application/json',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data:JSON.stringify( { "productId": productId, "qty": qty, "cartType":cartType}),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

const cardCart = (name, price, qty, img,productId) => {
    finalPrice = parseInt(price) * parseInt(qty)
    return (`<div class="product-widget">
        <div class="product-img">
            <img src=${img} alt="">
        </div>
        <div class="product-body">
            <h3 class="product-name">${name}</h3>
            <h4 class="product-price"><span class="qty">${qty}x</span>$${finalPrice}.00</h4>
        </div>
        <button class="delete"><i class="fa fa-close" id=${productId}></i></button>
    </div>`)
}