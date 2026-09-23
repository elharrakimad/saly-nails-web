/* =========================================================
   SALY NAILS
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {


    function openMenu() {

        menuToggle.classList.add("active");

        mainNav.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Fermer le menu"
        );

    }


    function closeMenu() {

        menuToggle.classList.remove("active");

        mainNav.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Ouvrir le menu"
        );

    }


    menuToggle.addEventListener(
        "click",
        function () {

            const menuIsOpen =
                mainNav.classList.contains(
                    "active"
                );


            if (menuIsOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            const clickedMenu =
                mainNav.contains(
                    event.target
                );

            const clickedButton =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedMenu &&
                !clickedButton &&
                mainNav.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            }

        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 700
            ) {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   GALERIE / LIGHTBOX
========================================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );


const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );


const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );


let currentImageIndex = 0;


/* ---------- LISTE DES IMAGES ---------- */

const galleryImages =
    Array.from(
        galleryItems
    ).map(
        function (item) {

            return item.dataset.image;

        }
    );


/* ---------- AFFICHER IMAGE ---------- */

function showImage(index) {

    if (
        !galleryImages.length
    ) {

        return;

    }


    if (index < 0) {

        index =
            galleryImages.length - 1;

    }


    if (
        index >=
        galleryImages.length
    ) {

        index = 0;

    }


    currentImageIndex =
        index;


    lightboxImage.src =
        galleryImages[
            currentImageIndex
        ];


    lightboxImage.alt =
        `Création Saly Nails ${
            currentImageIndex + 1
        }`;


    lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${
            galleryImages.length
        }`;

}


/* ---------- OUVRIR ---------- */

function openLightbox(index) {

    showImage(index);

    lightbox.classList.add(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "menu-open"
    );

}


/* ---------- FERMER ---------- */

function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


/* ---------- CLIC GALERIE ---------- */

galleryItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        item.dataset.index
                    );

                openLightbox(index);

            }
        );

    }
);


/* ---------- PRÉCÉDENT ---------- */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            showImage(
                currentImageIndex - 1
            );

        }
    );

}


/* ---------- SUIVANT ---------- */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            showImage(
                currentImageIndex + 1
            );

        }
    );

}


/* ---------- FERMER X ---------- */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        function () {

            closeLightbox();

        }
    );

}


/* ---------- CLIC ARRIÈRE-PLAN ---------- */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   CLAVIER GALERIE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            showImage(
                currentImageIndex - 1
            );

        }


        if (
            event.key === "ArrowRight"
        ) {

            showImage(
                currentImageIndex + 1
            );

        }

    }
);


/* =========================================================
   SWIPE MOBILE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


if (lightbox) {


    lightbox.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;


            handleSwipe();

        },
        {
            passive: true
        }
    );

}


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (
        Math.abs(difference) < 50
    ) {

        return;

    }


    if (difference > 0) {

        showImage(
            currentImageIndex + 1
        );

    } else {

        showImage(
            currentImageIndex - 1
        );

    }

}




/* =========================================================
   GOOGLE ANALYTICS — ÉVÉNEMENTS
========================================================= */

function trackEvent(eventName, parameters = {}) {

    if (typeof gtag === "function") {

        gtag("event", eventName, parameters);

    }

}


/* ---------- CLICS CONTACT ---------- */

document.querySelectorAll('a[href*="instagram.com"]').forEach(function (link) {

    link.addEventListener("click", function () {

        trackEvent("instagram_click", {
            link_url: link.href
        });

    });

});


document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {

    link.addEventListener("click", function () {

        trackEvent("whatsapp_click", {
            link_url: link.href
        });

    });

});


document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {

    link.addEventListener("click", function () {

        trackEvent("email_click", {
            link_url: link.href
        });

    });

});


/* ---------- CLICS RENDEZ-VOUS ---------- */

document.querySelectorAll('a[href="#reservation"]').forEach(function (link) {

    link.addEventListener("click", function () {

        trackEvent("reservation_cta_click");

    });

});


/* ---------- OUVERTURE GALERIE ---------- */

galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        trackEvent("gallery_open", {
            image_index: Number(item.dataset.index) + 1
        });

    });

});


/* =========================================================
   RÉSERVATION → WHATSAPP
========================================================= */

const reservationForm =
    document.getElementById(
        "reservationForm"
    );


if (reservationForm) {


    reservationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const service =
                document
                    .getElementById("service")
                    .value;


            const date =
                document
                    .getElementById("date")
                    .value;


            const time =
                document
                    .getElementById("time")
                    .value;


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /* =========================================
               VRAI NUMÉRO WHATSAPP SALY NAILS
            ========================================= */

            const whatsappNumber =
                "212601510209";


            /* =========================================
               MESSAGE WHATSAPP
            ========================================= */

            const whatsappMessage =

`Bonjour Saly Nails 💅

Je souhaite prendre rendez-vous.

👤 Nom : ${name}

📱 Téléphone : ${phone}

💅 Service : ${service}

📅 Date souhaitée : ${date}

🕐 Heure souhaitée : ${time}

💬 Message :
${message || "Aucun message supplémentaire."}

Merci ✨`;


            /* =========================================
               CRÉATION URL
            ========================================= */

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /* ---------- ANALYTICS : DEMANDE DE RÉSERVATION ---------- */

            trackEvent("reservation_request", {
                service: service,
                has_message: message.length > 0
            });


            /* =========================================
               OUVERTURE WHATSAPP
            ========================================= */

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================================================
   DATE MINIMUM
========================================================= */

const dateInput =
    document.getElementById(
        "date"
    );


if (dateInput) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    dateInput.min =
        `${year}-${month}-${day}`;

}