(function() {
    function initFilterEngine() {
        const buttons = document.querySelectorAll(".tp-scroll-item");
        // GARANTİ ÖNLEM: Sayfada hem 'tp-hotel-card-link' hem de 'tp-hotel-card' sınıfını arar, hangisi varsa onu yakalar.
        let cards = document.querySelectorAll(".tp-hotel-card-link");
        if (cards.length === 0) {
            cards = document.querySelectorAll(".tp-hotel-card");
        }

        if (buttons.length === 0 || cards.length === 0) return;

        buttons.forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                
                buttons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");

                const targetCity = this.getAttribute("data-target").trim().toLowerCase();

                cards.forEach(card => {
                    const cardCity = card.getAttribute("data-city") ? card.getAttribute("data-city").trim().toLowerCase() : "";
                    
                    // Tam uyuşma veya esnek metin içerme kontrolü
                    if (targetCity === "all" || cardCity === targetCity || cardCity.indexOf(targetCity) !== -1) {
                        card.classList.remove("is-hidden");
                    } else {
                        card.classList.add("is-hidden");
                    }
                });
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initFilterEngine);
    } else {
        initFilterEngine();
    }
})();