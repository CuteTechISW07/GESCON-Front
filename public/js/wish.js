

$(document).ready(() => {
    token = localStorage.getItem('tokenSession');
    productId = localStorage.getItem('productId');
    var wish = $("#cart_wish");
    var cart = "";
    var qtyProds = 0;
    var toPay = 0;
    var cartList = $("#wish-list");
    var qtyTotal = $("#qty-total-wish");
    var qtyWish = $("#qty-wish");
    var subtotal = $("#subtotal-wish");
    if (token == null || token.length == 4) {
        flag = false
       $("#no_products_wish").text("Inicia sesión para agregar productos")
        $("#wish_buttons").css({ "display": "none" });

    } else {
        flag = true
        $("#no_products_wish").text("Parece que no hay nada por aquí. ¡Agrega productos!")
    }
    wish.click(()=>{
        localStorage.setItem('cartType',2);
        window.location.href ="wishlist.html";
    });

    getCart(token,2).then((response) => {
        if (response.success && response.products != null && response.products != 0) {
            response.products.forEach(element => {
                qtyProds += element.qty;
                toPay += parseInt(element.product.price) * parseInt(element.qty);
                cart += cardCart(element.product.name, element.product.price, element.qty, element.product.image,element.product.id);
            });
            if (qtyProds > 1) {
                qtyTotal.text(qtyProds + " Artículos");
            } else {
                qtyTotal.text(qtyProds + " Artículo");
            }
            subtotal.text("Subtotal: $" + toPay + ".00")
            qtyWish.text(qtyProds)
            cartList.html(cart);
        } else {
            $("#wish-summary").css({ "display": "none" });
            $("#wish_buttons").css({ "display": "none" });
        }
    });

    document.querySelector('#wish-list').addEventListener('click',e =>{
        action = e.target
        if(action.id != "" && action.id != null){
            deleteProductCart(token,action.id,2).then((response)=>{
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