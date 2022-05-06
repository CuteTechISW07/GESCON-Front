$(document).ready(() => {

    var tec = $("#tecnologia");
    var ele = $("#electronica");
    var ipn = $("#ipn");

    var t = $("#t");
    var e = $("#e");
    var i = $("#i");


    tec.click(()=>{
        localStorage.setItem('categoryId',3)
        window.location.href="tecnologia.html"
    })
    ele.click(()=>{
        localStorage.setItem('categoryId',2)
        window.location.href="electronica.html"
    })
    ipn.click(()=>{
        localStorage.setItem('categoryId',6)
        window.location.href="IPN.html"
    })
    t.click(()=>{
        localStorage.setItem('categoryId',3)
        window.location.href="tecnologia.html"
    })
    e.click(()=>{
        localStorage.setItem('categoryId',2)
        window.location.href="electronica.html"
    })
    i.click(()=>{
        localStorage.setItem('categoryId',6)
        window.location.href="IPN.html"
    })


});


