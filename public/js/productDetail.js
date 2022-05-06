$(document).ready(() => {
    var cartType = localStorage.setItem('cartType',1);
    var token = localStorage.getItem('tokenSession');
    var productName = $("#product_name");
    var productPrice = $("#product_price");
    var productStock = $("#product_stock");
    var productDes = $("#product_description");
    var cartList = $("#cart-list");
    var img = $("#img");
    var img2 = $("#img2");
    var addTo = $("#add-to-cart");
    var qtyAdd = $("#qty-picker");
    var subtotal = $("#subtotal");
    var qtyTotal = $("#qty-total");
    var qtyCart = $("#qty");
    var desc_prod = $("#desc_prod");

    var stock = 0;
    var productId = parseInt(localStorage.getItem('productId'));

    getProduct(productId).then((response) => {
        var product = response.products;
        productName.text(product.name);
        productPrice.text("$" + product.price + ".00");
        stock = product.stock
        desc_prod.text(product.description)
        productStock.text(product.stock + " disponibles");
        productDes.text(product.description);
        img.attr('src', product.image)
        img2.attr('src', product.image)

    });

    if (token == null || token.length == 4) {
        flag = false

    } else {
        flag = true
    }

    addTo.click(() => {
        if (flag) {
            var qty = parseInt(qtyAdd.val())
            if (qty > 0 && qty <= stock) {
                var cart = "";
                var qtyProds = 0;
                var toPay = 0;
                addToCart(token, productId, qty,1).then((response) => {
                    if (response.success) {
                        response.products.forEach(element => {
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
                        $("#cart_buttons").css({ "display": "block" })
                        $("#title").text("Confirmación");
                        $("#copy").text("Se ha agregado correctamente al carrito. Gracias por ser cool y hacerte notar.")
                    }
                });
            } else {
                $("#title").text("Error");
                $("#copy").text("Hubo un error al agregar el producto al carrito. Stock insuficiente")
            }
        }

    });


    $("#buyNow").click(() => {
        if (flag) {
            var q = parseInt(qtyAdd.val());
            console.log(q)
            if (q == "" || q==0 || Number.isNaN(q)){
                alert("Ingresa una cantidad valida");
                qtyAdd.focus();
                return;
            }

            addToCart(token, productId, q,3).then((response)=>{
                if(response!= null){
                    if(response.success){
                        localStorage.setItem('cartType',"3");
                        window.location.href = "checkout.html"
                    }
                }
            })
        } else {
            alert("Para comprar este producto debes iniciar sesión primero.")
        }

    });



});


const getProduct = (productId) => {
    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/products',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        data:JSON.stringify({ "productId": productId }),
        accepts: 'application/json',
        success: (data, status) => {
            if (data) {
                return data;
            }
        }
    });
}
