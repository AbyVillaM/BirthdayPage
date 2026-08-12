function openGift() {

    const wrapper = document.getElementById("gift-wrapper");
    const card = document.getElementById("greeting-card");

    wrapper.classList.add("opened");

    setTimeout(function () {
        card.classList.add("show");
    }, 900);
}


function openLetter() {

    window.location.href = "carta.html";

}