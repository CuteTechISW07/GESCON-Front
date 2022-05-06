$(document).ready(() => {
    var container = $("#product-container")
    var search = $("#search_string");
    var toSearch = localStorage.getItem('toSearch');

    productsByDescription(toSearch).then((data) => {
        printResult(data);
    });
    
    $("#search-btn").click((e) => {
        e.preventDefault();
        var name = search.val();
        if (name != "") {
            localStorage.setItem('toSearch',name);
            productsByDescription(name).then((data) => {
                printResult(data);
            });
        }
    });


    document.querySelector('#product-container').addEventListener('click', e => {
        console.log("Click")
        action = e.target.id.split('-')
        if (action[0] === "see") {
            localStorage.setItem('productId', action[1])
            window.location.href = ("./producto.html")
        } else if (action[0] === "add") {
            if (flag) {
                var cart = "";
                var qtyProds = 0;
                var toPay = 0;
                addToCart(token, action[1], 1,1).then((response) => {
                    if (response.success) {
                        alert("Producto agregado al carrito")

                        $("#cart_buttons").css({ "display": "block" });
                        $("#summary").css({ "display": "block" });
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
                        subtotal.text("Subtotal: $" + toPay + " .00")
                        qtyCart.text(qtyProds)
                        cartList.html(cart);
                    }

                });
            } else {
                alert("Para agregar productos al carrito, debes iniciar sesión primero")
            }

        }else if (action[0] === "wish"){
            addToCart(token, action[1], 1, 2).then((response) => {
                if (response.success) {
                    alert("Producto agregado a deseos");
                    window.location.reload();
                }else{
                    alert(response.error.message);
                }

            });

        }

    });




const printResult = (data) =>{
    if (data.success) {
        var prods = ""
        var i=0;
        data.products.forEach(element => {
            i=i+1;
            console.log(element.image)
            prods += cardProduct(element.id, element.name, element.description, element.price, element.sku, element.stock, element.image);

            if(i%3==0){
                console.log("add");
                prods+='<div class="clearfix visible-lg visible-md"></div>';
            }
        });
        container.html(prods)
    }
}


});



const productsByDescription = (name) => {



    return $.ajax({
        method: "POST",
        url: 'http://143.244.156.198:5001/products',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        accepts: 'application/json',
        data: JSON.stringify({ "name": name }),
        success: (data, status) => {
            console.log("response ", data);
            return data;
        }
    });



}


const cardProduct = (id,name, description,price,sku,stock,img) => {
    return (
        `<div class="col-md-4 col-xs-6">
        <div class="product">
            <div class="product-img">
                <img src=${img} alt="">
                <div class="product-label">

                    <span class="new">NUEVO</span>
                </div>
            </div>
            <div class="product-body">
                <h3 class="product-name"><a href="#">${name}</a></h3>
                <h4 class="product-price">$${price}.00 </h4>
                <div class="product-rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <div class="product-btns">
                    <button class="add-to-wishlist" id=wish-${id}><i class="fa fa-heart-o" id=wish-${id}></i><span
                            class="tooltipp">Añadir a deseos</span></button>
                    <button class="quick-view" id=see-${id}><i class="fa fa-eye"
                            id=see-${id}></i><span class="tooltipp">ver</span></button>
                </div>
            </div>
            <div class="add-to-cart">
                <button class="add-to-cart-btn" id=add-${id}><i class="fa fa-shopping-cart"></i>
                    Añadir al carrito</button>
            </div>
        </div>
    </div>`)
}