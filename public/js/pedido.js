$(document).ready(() => {
    var token = localStorage.getItem('tokenSession')
    var cartType = parseInt(localStorage.getItem('cartType'));
    var product = $("#order_products");
    var toPay = 0;
    var cart = "";
    var pedido = "";
    var cartList = $("#cart-list");
    var qtyCart = $("#qty");
    getCart(token,cartType).then((response) => {
        response.products.forEach(element => {
            toPay += parseInt(element.product.price) * parseInt(element.qty)
            cart += cardCart(element.product.name, element.product.price, element.qty,element.product.image,element.product.id);
            pedido += productCard(element.product.name, element.product.price, element.qty);
        });
        pedido += shippingCard(toPay)
        product.html(pedido);
    });
});

const productCard = (name, price, qty) => {
    subPrice = parseInt(price) * parseInt(qty)
    return (`<div class="order-col">
                <div>${qty}x ${name}</div>
                <div>$${subPrice}.00</div>
            </div>`)
}

const shippingCard = (toPay) => {
    return (`<div class="order-col">
        <div>Costo de envío</div>
        <div>$90.00</div>
    </div>
        <div class="order-col">
            <div><strong>TOTAL</strong></div>
            <div><strong class="order-total">$${parseInt(toPay)+90}.00</strong></div>
        </div>`)
}