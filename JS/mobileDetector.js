function handleDestopView() {
    document.getElementById("AMText").setAttribute("data-aos-offset", "300");
    document.getElementById("left-div").setAttribute("data-aos-offset", "250");
    document.getElementById("right-div").setAttribute("data-aos-offset", "250");
}

function handleMobileView() {
    document.getElementById("AMText").setAttribute("data-aos-offset", "280");
    document.getElementById("left-div").setAttribute("data-aos-offset", "210");
    document.getElementById("right-div").setAttribute("data-aos-offset", "210");
}

//Phone 
const mediaQuery = window.matchMedia("(max-width: 767px)");

function checkScreen(e) {
    if (e.matches) {
        handleDestopView();
    } else {
        handleMobileView();
    }
}

// Run immediately
checkScreen(mediaQuery);

// Run whenever screen size changes
mediaQuery.addEventListener("change", checkScreen);