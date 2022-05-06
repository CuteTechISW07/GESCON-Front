$(document).ready(() => {

    token = localStorage.getItem('tokenSession');
    var wishList = $("#wish_list");
    /*var qtyCart = $("#qty");
    var subtotal = $("#subtotal");
    var qtyTotal = $("#qty-total");*/
    var deleteProd = $("#delete");

    if (token == null || token.length == 4) {
        flag = false
        $("#no_products_wish").text("Inicia sesión para agregar productos")
        $("#wish_buttons").css({ "display": "none" });

    } else {
        flag = true
        $("#no_products_wish").text("Parece que no hay nada por aquí. ¡Agrega productos!")
    }

    getCart(token, 2).then((response) => {
        console.log("Se hizo la petición");
        if (response.success && response.products != null && response.products != 0 && response.products.length != 0) {

            var c = "";
            var prods = 0;
            var toPay = 0;

            response.products.forEach(element => {
                prods += element.qty
                toPay += parseInt(element.product.price) * parseInt(element.qty)
                c += wishCard(element.product.id, element.product.name, element.product.price, element.categoryId, element.product.image);

            });
            console.log(c);
            wishList.html(c);
            setStyle();
        } else {
            $("#wish-summary").css({ "display": "none" });
            $("#wish_buttons").css({ "display": "none" });
        }
    });

    document.querySelector('#wish_list').addEventListener('click', e => {
        action = e.target.id.split('-')
        if (action[0] === "see") {
            console.log(action[1]);
            localStorage.setItem('productId', action[1])
            window.location.href = ("./producto.html")
        } else if (action[0] === "cart") {
            addToCart(token, action[1], 1, 1).then((response) => {
                if (response != null) {
                    if (response.success) {
                        deleteProductCart(token, action[1], 2).then((res) => {
                            if (res != null) {
                                if (res.success) {
                                    alert("Producto agregado al carrito");
                                    window.location.reload();
                                }
                            }

                        })
                    } else {
                        alert(response.error.message);
                    }

                }

            });

        }else if(action[0]==="delete"){
            deleteProductCart(token,action[1],2).then((response)=>{

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

});



const wishCard = (id, name, price, category, image) => {
    return (`
    <div class="product">
    <button class="delete" id=delete-${id}><i class="fa fa-close" id=delete-${id}></i></button>
        <div class="product-img">
            <img src=${image} alt="">
        </div>
        <div class="product-body">
            <h3 class="product-name">${name}</h3>
            <h4 class="product-price">${price}.00</h4>
            <div class="product-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <div class="product-btns">
                <button class="quick-view" id=see-${id}><i class="fa fa-eye" id=see-${id}></i><span class="tooltipp">ver</span></button>
            </div>
        </div>
        <div class="add-to-cart">
            <button class="add-to-cart-btn" id="cart-${id}">
                <i class="fa fa-shopping-cart"></i> Agregar al carrito</button>
        </div>
    </div>
    `);
}