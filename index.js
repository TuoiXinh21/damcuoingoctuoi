/* =====================================================
   ALBUM CAROUSEL
===================================================== */

const albumCards =
    document.querySelectorAll(".album-card");

const albumDots =
    document.querySelector(".album-dots");

let currentAlbum = 0;


/* =====================================================
   TẠO DOT
===================================================== */

albumCards.forEach((card, index) => {

    const dot =
        document.createElement("button");

    dot.className = "album-dot";

    dot.addEventListener("click", () => {

        currentAlbum = index;

        updateAlbum();

    });

    albumDots.appendChild(dot);

});


/* =====================================================
   HIỂN THỊ ALBUM
===================================================== */

function updateAlbum() {

    const total = albumCards.length;

    albumCards.forEach((card, index) => {

        card.className = "album-card";

        let difference =
            index - currentAlbum;


        if (difference > total / 2) {
            difference -= total;
        }

        if (difference < -total / 2) {
            difference += total;
        }


        /* ẢNH CHÍNH */

        if (difference === 0) {
            card.classList.add("active");
        }


        /* BÊN TRÁI */

        else if (difference === -1) {
            card.classList.add("left-1");
        }

        else if (difference === -2) {
            card.classList.add("left-2");
        }


        /* BÊN PHẢI */

        else if (difference === 1) {
            card.classList.add("right-1");
        }

        else if (difference === 2) {
            card.classList.add("right-2");
        }


        /* ẢNH XA */

        else {
            card.classList.add("hidden");
        }

    });


    /* DOT */

    const dots =
        document.querySelectorAll(".album-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentAlbum
        );

    });

}


/* =====================================================
   ẢNH TRƯỚC
===================================================== */

function prevAlbum() {

    currentAlbum--;

    if (currentAlbum < 0) {
        currentAlbum =
            albumCards.length - 1;
    }

    updateAlbum();
}


/* =====================================================
   ẢNH SAU
===================================================== */

function nextAlbum() {

    currentAlbum++;

    if (
        currentAlbum >=
        albumCards.length
    ) {
        currentAlbum = 0;
    }

    updateAlbum();
}


/* =====================================================
   KHỞI TẠO
===================================================== */

updateAlbum();


/* =====================================================
   TỰ ĐỘNG CHUYỂN ẢNH
   3 GIÂY / ẢNH
===================================================== */

setInterval(() => {

    nextAlbum();

}, 3000);


const weddingDate = new Date("2026-10-25T08:30:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    const countdown =
        document.getElementById("countdownText");

    if (distance <= 0) {

        countdown.innerHTML =
            "Đã đến ngày cưới ❤️";

        return;
    }

    const days =
        Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

    countdown.innerHTML =
        `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);

function openQR() {
    document.getElementById("qrPopup").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeQR() {
    document.getElementById("qrPopup").classList.remove("active");
    document.body.style.overflow = "";
}