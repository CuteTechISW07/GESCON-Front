$(document).ready(() => {
    var container = $("#product-container")
    var search = $("#search_string");
    $("#search-btn").click((e) => {

        e.preventDefault();
        var name = search.val();
        if (name != "") {
            localStorage.setItem('toSearch',name);
            window.location.href = 'search.html';
        }else{
        }
    });
});