document.cookie = "myCookie=myValue; SameSite=Lax; Secure";

window.onload = function() {
    StartPage();
    
};

function StartPage() {
    $.post("/requetArticle", function (data) {
        let element = document.getElementById("genArticle");
        if(element) {
            element.innerHTML = data;
        }
    });
}
