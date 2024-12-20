document.addEventListener("DOMContentLoaded", () => {
    const helloText = document.querySelector("#hello");
    const homeMenu = document.querySelector("#home-menu");

    setTimeout(() => {
        helloText.style.opacity = "1";
        helloText.style.transform = "translateY(0)";

        setTimeout(() => {
            homeMenu.style.opacity = "1";
            homeMenu.style.transform = "scale(1)";
        }, 400)
    }, 300);
});