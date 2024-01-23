
$(document).ready(function(){
    var currentRoute = window.location.pathname;
    headerColor(currentRoute);
})

function headerColor(location){
    if (location === "/") {
       $("#home").addClass("activeButton");
    }
    else if (location === "/about") {
        $("#about").addClass("activeButton");
    }
    else{
        $("#post").addClass("activeButton");
    }
}