document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio website is ready!");

    // Smooth Scroll Effect for Sections
    const sections = document.querySelectorAll(".section");

    const revealSections = () => {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                if (!section.classList.contains("visible")) {
                    section.classList.add("visible");
                }
            } else {
                section.classList.remove("visible"); // Reset for re-trigger
            }
        });
    };

    window.addEventListener("scroll", revealSections);
    revealSections(); // Call once on load

    // Lightbox for Portfolio Images
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    const portfolioImages = document.querySelectorAll(".portfolio-item img");

    portfolioImages.forEach((img) => {
        img.addEventListener("click", () => {
            lightbox.innerHTML = `<img src="${img.src}" alt="Portfolio Image">`;
            lightbox.classList.add("active");
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    // WhatsApp Chat Integration
    const whatsappButton = document.querySelector(".whatsapp-link");
    if (whatsappButton) {
        whatsappButton.addEventListener("click", () => {
            const phone = "YOUR_PHONE_NUMBER"; // Replace with the actual phone number
            const message = encodeURIComponent("Hello! I'm interested in your services.");
            window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});
