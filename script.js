function openGift() {
    const wrapper = document.getElementById("gift-wrapper");
    const card = document.getElementById("greeting-card");

    wrapper.classList.add("opened");

    setTimeout(() => {
        card.classList.add("show");
    }, 900);
}

