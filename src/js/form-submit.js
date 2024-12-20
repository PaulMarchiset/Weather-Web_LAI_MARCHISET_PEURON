const form = document.getElementById("contact-form");

form.addEventListener("submit", function(message) {
    message.preventDefault();

    alert("Merci, votre message a bien été transmis !");

    form.reset();
});