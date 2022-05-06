
$(document).ready(() => {
    var cart = "";
    var qtyProds = 0;
    var toPay = 0;

    token = localStorage.getItem('tokenSession');
    var cartType = 1;
    var cartList = $("#cart_list");
    /*var qtyCart = $("#qty");
    var subtotal = $("#subtotal");
    var qtyTotal = $("#qty-total");*/
    var deleteProd = $("#delete");

    if (token == null || token.length == 4) {
        flag = false
        $("#no_products").text("Inicia sesión para agregar productos")
        $("#cart_buttons").css({ "display": "none" });

    } else {
        flag = true
        $("#no_products").text("Parece que no hay nada por aquí. ¡Agrega productos!")
    }

    getCart(token,cartType).then((response) => {
        if (response.success && response.products != null && response.products != 0) {

            response.products.forEach(element => {
                qtyProds += element.qty
                toPay += parseInt(element.product.price) * parseInt(element.qty)
                cart += card(element.product.id, element.product.name, element.product.price, element.qty, element.categoryId, element.product.image);
            });
            cartList.html(cart);
            setStyle();
        } else {
            $("#summary").css({ "display": "none" });
            $("#cart_buttons").css({ "display": "none" });
        }
    });

    deleteProd.click(() => {
        deleteCart(token).then((response) => {
            if (response.success) {
                alert("Carrito vaciado!")
                window.location.reload()
            }
        })
    });


    document.querySelector('#cart_list').addEventListener('click', e => {
        action = e.target.id.split('-')

        if (action[0] === "item") {
            var target = e.target;
            var old = e.target.value;
            var productId = action[1]
            target.addEventListener('focusout', e => {
                if (e.target.value != "") {
                    if (e.target.value != 0) {
                        if (old != e.target.value) {
                            addToCart(token, productId, e.target.value,cartType).then((response) => {
                                if (response != null) {
                                    if (response.success) {
                                        window.location.reload();
                                    } else {
                                        switch (response.error.code) {
                                            case 8003:
                                                target.value = old;
                                                target.focus();
                                                break;
                                        }
                                        alert(response.error.message);

                                    }
                                }
                            });
                        }
                    }else{
                        deleteProductCart(token,productId,cartType).then((response)=>{
                            if(response!=null){
                                if(response.success){
                                    alert("Producto eliminado");
                                    window.location.reload()
                                }else{
                                    alert(response.error.message);
                                }
                            }
                        })
                    }
                } else {
                    alert("Ingresa una cantida válida");
                    target.value = old;
                    target.focus()
                }
            });
        }
    });
    document.querySelector('#cart_list').addEventListener('click', e => {
        action = e.target.id.split('-')
        if (action[0] === "see") {
            localStorage.setItem('productId', action[1])
            window.location.href = ("./producto.html")
        }else if(action[0]==="delete"){
            deleteProductCart(token,action[1],1).then((response)=>{

                if(response!= null){
                    if(response.success){
                        alert("Producto eliminado");
                        window.location.reload();
                    }else{
                        alert(response.error.message);
                    }
                }

            });
        }
    });

    document.querySelector('#cart_list').addEventListener('click', e => {
        console.log(e)
        action = e.target
        if (typeof (action.id) === "int" && action.id != "" && action.id != null) {
            deleteProductCart(token, action.id,cartType).then((response) => {
                console.log(response)
                if (response != null) {
                    if (response.success) {
                        alert("Producto eliminado")
                        window.location.reload()
                    } else {
                        alert(response.error.message)
                    }
                }
            });
        }
    });

});

const card = (id, name, price, stock, categoryId, image) => {
    return (` <!-- product -->
    <div class="product" >
    <button class="delete" id=delete-${id}><i class="fa fa-close" id=delete-${id}></i></button>
        <div class="product-img">
            <img src=${image} alt="">
        </div>
       
        <div class="product-body" >
                <h3 class="product-name">${name}</h3>
            <h3 class="product-name">Cantidad: <div class="input-number">
            <input type="number" min="0" oninput="validity.valid||(value='');" id="item-${id}" value="${stock}">
        </div></h3>

            <h4 class="product-price">$${price}.00</h4>
            <div class="product-btns">
                <button class="add-to-wishlist" id="Add"><i class="fa fa-heart-o"></i><span class="tooltipp">Añadir a deseos</span></button>
                <button class="quick-view" id=see-${id}><i class="fa fa-eye" id=see-${id}></i><span class="tooltipp">ver</span></button>
            </div>
        </div>
       
    </div>
    <!-- /product -->`)
}