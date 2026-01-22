//Handles navbar sliding up and down
var lastScrollTop = 0;
navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
    var scrollTop = this.window.pageYOffset || this.document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.style.top = "-80px";
    } else {
        navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
})