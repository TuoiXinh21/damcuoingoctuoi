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


/* =========================================================
   GUESTBOOK - GOOGLE SHEETS
   ========================================================= */


/* =========================================================
   LINK GOOGLE APPS SCRIPT
   ========================================================= */

const GUESTBOOK_API =
    "https://script.google.com/macros/s/AKfycbz37b_9oWdTTSf5ph_6zNmMcEaejcF9NmQ-9CSnG5ZbE-qzO2yTosOTBou3ZyL6fZND/exec";


/* =========================================================
   LẤY CÁC PHẦN TỬ HTML
   ========================================================= */

const guestName =
    document.getElementById("guestName");

const guestMessage =
    document.getElementById("guestMessage");

const sendWish =
    document.getElementById("sendWish");

const sendStatus =
    document.getElementById("sendStatus");

const guestWishes =
    document.getElementById("guestWishes");


/* =========================================================
   HIỂN THỊ DANH SÁCH LỜI CHÚC
   ========================================================= */

function displayWishes(wishes) {

    /* Xóa danh sách cũ */

    guestWishes.innerHTML = "";


    /* Không có lời chúc */

    if (!wishes || wishes.length === 0) {

        sendStatus.textContent =
            "Chưa có lời chúc nào. Hãy là người đầu tiên!";

        return;
    }


    /* Hiển thị số lượng */

    sendStatus.textContent =
        `Đã có ${wishes.length} lời chúc ❤️`;


    /* Tạo từng lời chúc */

    wishes.forEach(function (wish) {

        const wishBox =
            document.createElement("div");

        wishBox.className =
            "guest-wish";


        /* Tên */

        const name =
            document.createElement("p");

        name.className =
            "guest-wish-name";

        name.textContent =
            wish.name;


        /* Lời chúc */

        const message =
            document.createElement("p");

        message.className =
            "guest-wish-message";

        message.textContent =
            wish.message;


        /* Thêm vào khung */

        wishBox.appendChild(name);

        wishBox.appendChild(message);

        guestWishes.appendChild(wishBox);

    });

}


/* =========================================================
   LẤY LỜI CHÚC TỪ GOOGLE SHEETS
   ========================================================= */

async function loadWishes() {

    try {

        const response =
            await fetch(GUESTBOOK_API);


        if (!response.ok) {

            throw new Error(
                "Không thể kết nối Google Sheets"
            );

        }


        const wishes =
            await response.json();


        displayWishes(wishes);

    }

    catch (error) {

        console.error(
            "Lỗi tải lời chúc:",
            error
        );


        sendStatus.textContent =
            "Không thể tải lời chúc.";

    }

}


/* =========================================================
   GỬI LỜI CHÚC
   ========================================================= */

sendWish.addEventListener(
    "click",
    async function () {


        /* Lấy dữ liệu */

        const name =
            guestName.value.trim();

        const message =
            guestMessage.value.trim();


        /* =================================================
           KIỂM TRA TÊN
           ================================================= */

        if (!name) {

            alert(
                "Vui lòng nhập tên!"
            );

            guestName.focus();

            return;
        }


        /* =================================================
           KIỂM TRA LỜI CHÚC
           ================================================= */

        if (!message) {

            alert(
                "Vui lòng nhập lời chúc!"
            );

            guestMessage.focus();

            return;
        }


        /* =================================================
           KHÓA NÚT GỬI
           ================================================= */

        sendWish.disabled = true;

        sendWish.textContent =
            "ĐANG GỬI...";


        try {


            /* =============================================
               GỬI DỮ LIỆU GOOGLE SHEETS
               ============================================= */

            await fetch(
                GUESTBOOK_API,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        name: name,

                        message: message

                    })

                }
            );


            /* =============================================
               XÓA FORM
               ============================================= */

            guestName.value = "";

            guestMessage.value = "";


            /* =============================================
               THÔNG BÁO
               ============================================= */

            sendStatus.textContent =
                "💌 Cảm ơn bạn đã gửi lời chúc!";


            /* =============================================
               TẢI LẠI DANH SÁCH
               ============================================= */

            setTimeout(
                function () {

                    loadWishes();

                },
                1000
            );


        }

        catch (error) {

            console.error(
                "Lỗi gửi lời chúc:",
                error
            );


            sendStatus.textContent =
                "Có lỗi xảy ra. Vui lòng thử lại.";

        }


        /* =================================================
           MỞ KHÓA NÚT
           ================================================= */

        sendWish.disabled = false;

        sendWish.textContent =
            "GỬI LỜI CHÚC";

    }
);


/* =========================================================
   TỰ ĐỘNG TẢI LỜI CHÚC KHI MỞ TRANG
   ========================================================= */

loadWishes();
/* =========================================================
   POPUP XÁC NHẬN THAM DỰ
   ========================================================= */

const openAttendance =
    document.getElementById("openAttendance");

const attendancePopup =
    document.getElementById("attendancePopup");

const attendanceClose =
    document.getElementById("attendanceClose");

const attendanceOverlay =
    document.getElementById("attendanceOverlay");


/* =========================================================
   MỞ POPUP
   ========================================================= */

openAttendance.addEventListener(
    "click",
    function () {

        attendancePopup.classList.add("active");

        document.body.style.overflow = "hidden";

    }
);


/* =========================================================
   ĐÓNG POPUP - NÚT X
   ========================================================= */

attendanceClose.addEventListener(
    "click",
    function () {

        attendancePopup.classList.remove("active");

        document.body.style.overflow = "";

    }
);


/* =========================================================
   ĐÓNG POPUP - BẤM RA NGOÀI
   ========================================================= */

attendanceOverlay.addEventListener(
    "click",
    function () {

        attendancePopup.classList.remove("active");

        document.body.style.overflow = "";

    }
);


/* =========================================================
   ĐÓNG POPUP BẰNG PHÍM ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            attendancePopup.classList.contains("active")
        ) {

            attendancePopup.classList.remove("active");

            document.body.style.overflow = "";

        }

    }
);
/* =========================================================
   XÁC NHẬN THAM DỰ - GOOGLE SHEETS
   ========================================================= */

const attendanceName =
    document.getElementById("attendanceName");

const attendancePhone =
    document.getElementById("attendancePhone");

const attendanceGuests =
    document.getElementById("attendanceGuests");

const attendanceSubmit =
    document.getElementById("attendanceSubmit");

const attendanceStatus =
    document.getElementById("attendanceStatus");


/* =========================================================
   GỬI XÁC NHẬN
   ========================================================= */

attendanceSubmit.addEventListener(
    "click",
    async function () {


        const name =
            attendanceName.value.trim();


        const phone =
            attendancePhone.value.trim();


        const guests =
            attendanceGuests.value;


        const attendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            ).value;


        /* =============================================
           KIỂM TRA TÊN
           ============================================= */

        if (!name) {

            alert("Vui lòng nhập họ và tên!");

            attendanceName.focus();

            return;

        }


        /* =============================================
           KIỂM TRA SỐ ĐIỆN THOẠI
           ============================================= */

        if (!phone) {

            alert(
                "Vui lòng nhập số điện thoại!"
            );

            attendancePhone.focus();

            return;

        }


        /* =============================================
           KHÓA NÚT
           ============================================= */

        attendanceSubmit.disabled = true;

        attendanceSubmit.textContent =
            "ĐANG GỬI...";


        try {


            /* =========================================
               GỬI GOOGLE SHEETS
               ========================================= */

            await fetch(

                GUESTBOOK_API,

                {

                    method: "POST",

                    mode: "no-cors",

                    headers: {

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body: JSON.stringify({

                        type: "attendance",

                        name: name,

                        phone: phone,

                        guests: guests,

                        attendance: attendance

                    })

                }

            );


            /* =========================================
               THÔNG BÁO
               ========================================= */

            attendanceStatus.textContent =
                "❤️ Cảm ơn bạn đã xác nhận!";


            /* =========================================
               XÓA FORM
               ========================================= */

            attendanceName.value = "";

            attendancePhone.value = "";

            attendanceGuests.value = "1";


            /* =========================================
               ĐÓNG POPUP SAU 2 GIÂY
               ========================================= */

            setTimeout(
                function () {

                    attendancePopup.classList.remove(
                        "active"
                    );

                    document.body.style.overflow =
                        "";

                    attendanceStatus.textContent =
                        "";

                },
                2000
            );


        }

        catch (error) {

            console.error(
                "Lỗi xác nhận:",
                error
            );


            attendanceStatus.textContent =
                "Có lỗi xảy ra. Vui lòng thử lại.";

        }


        /* =============================================
           MỞ KHÓA NÚT
           ============================================= */

        attendanceSubmit.disabled = false;

        attendanceSubmit.textContent =
            "XÁC NHẬN";

    }
);
/* =========================================================
   THÊM LỄ CƯỚI NHÀ GÁI VÀO GOOGLE CALENDAR
========================================================= */

const addCalendarBride =
    document.getElementById("addCalendarBride");

addCalendarBride.addEventListener(
    "click",
    function () {

        const title =
            "Lễ cưới nhà gái - Xuân Ngọc";

        const location =
            "Thôn Yên Bình, Xã Vũ Đông, Tỉnh Ninh Bình";

        const details =
            "Trân trọng kính mời bạn đến tham dự lễ cưới nhà gái ❤️";

        const start =
            "20261025T083000";

        const end =
            "20261025T113000";

        const url =
            "https://calendar.google.com/calendar/render" +
            "?action=TEMPLATE" +
            "&text=" + encodeURIComponent(title) +
            "&dates=" + start + "/" + end +
            "&details=" + encodeURIComponent(details) +
            "&location=" + encodeURIComponent(location);

        window.open(url, "_blank");
    }
);


/* =========================================================
   THÊM LỄ CƯỚI NHÀ TRAI VÀO GOOGLE CALENDAR
========================================================= */

const addCalendarGroom =
    document.getElementById("addCalendarGroom");

addCalendarGroom.addEventListener(
    "click",
    function () {

        const title =
            "Lễ cưới nhà trai - Xuân Ngọc";

        /*
           SAU KHI BẠN GỬI ĐỊA CHỈ NHÀ TRAI
           SẼ THAY DÒNG NÀY
        */

        const location =
            "ĐỊA CHỈ NHÀ TRAI";

        const details =
            "Trân trọng kính mời bạn đến tham dự lễ cưới nhà trai ❤️";

        /*
           SAU KHI BẠN GỬI NGÀY + GIỜ NHÀ TRAI
           SẼ THAY 2 DÒNG NÀY
        */

        const start =
            "20261025T083000";

        const end =
            "20261025T113000";

        const url =
            "https://calendar.google.com/calendar/render" +
            "?action=TEMPLATE" +
            "&text=" + encodeURIComponent(title) +
            "&dates=" + start + "/" + end +
            "&details=" + encodeURIComponent(details) +
            "&location=" + encodeURIComponent(location);

        window.open(url, "_blank");
    }
);

/* =========================================================
   NHẠC THIỆP CƯỚI
========================================================= */

const weddingMusic =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


/* =========================================================
   TỰ PHÁT NHẠC KHI VÀO TRANG THIỆP
========================================================= */

if (weddingMusic) {

    weddingMusic.volume = 0.7;

    weddingMusic.play().then(function () {

        if (musicButton) {
            musicButton.textContent = "🔊";
        }

    }).catch(function () {

        /*
         * Nếu trình duyệt chặn autoplay,
         * chờ người dùng chạm/click lần đầu.
         */

        const startMusic = function () {

            weddingMusic.play();

            if (musicButton) {
                musicButton.textContent = "🔊";
            }

            document.removeEventListener(
                "click",
                startMusic
            );

            document.removeEventListener(
                "touchstart",
                startMusic
            );

        };

        document.addEventListener(
            "click",
            startMusic,
            { once: true }
        );

        document.addEventListener(
            "touchstart",
            startMusic,
            { once: true }
        );

    });
}


/* =========================================================
   NÚT BẬT / TẮT NHẠC
========================================================= */

if (musicButton && weddingMusic) {

    musicButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            if (weddingMusic.paused) {

                weddingMusic.play();

                musicButton.textContent = "🔊";

            } else {

                weddingMusic.pause();

                musicButton.textContent = "🔇";

            }

        }
    );

}

/* =========================================================
   TỰ ĐỘNG CUỘN CHẬM - 1 PHÚT
========================================================= */

if (window.location.pathname.endsWith("index.html")) {

    window.addEventListener("load", function () {

        setTimeout(function () {

            const totalHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const duration = 120000; // 60 giây = 1 phút

            const startTime = performance.now();

            function scrollPage(currentTime) {
                
                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                window.scrollTo(
                    0,
                    totalHeight * progress
                );

                if (progress < 1) {
                    requestAnimationFrame(scrollPage);
                }

            }

            requestAnimationFrame(scrollPage);

        }, 1000);

    });

}
// ========================================
// TỰ ĐỘNG LƯỚT TRANG TRÊN ĐIỆN THOẠI
// TỪ ĐẦU → CUỐI TRONG 2 PHÚT
// ========================================

if (window.innerWidth <= 768) {

    window.addEventListener("load", function () {

        setTimeout(function () {

            const maxScroll =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if (maxScroll <= 0) return;

            const duration = 120000; // 2 phút
            const startTime = performance.now();

            let running = true;

            // Người dùng chạm/vuốt → dừng tự động
            function stopAutoScroll() {
                running = false;
            }

            window.addEventListener(
                "touchstart",
                stopAutoScroll,
                { once: true, passive: true }
            );

            window.addEventListener(
                "touchmove",
                stopAutoScroll,
                { once: true, passive: true }
            );

            function autoScroll(currentTime) {

                if (!running) return;

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                window.scrollTo(
                    0,
                    maxScroll * progress
                );

                if (progress < 1) {
                    requestAnimationFrame(autoScroll);
                }

            }

            requestAnimationFrame(autoScroll);

        }, 1000);

    });

}