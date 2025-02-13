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
            const phone = "6352191121"; // Replace with the actual phone number
            const message = encodeURIComponent("Hello! I'm interested in your services.");
            window.open(`https://wa.me/qr/TVMZTXF775RJP1?text=${message}`, "_blank");
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

document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    let response = await fetch("/submit", {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    if (result.success) {
        document.getElementById("responseMessage").textContent = result.message;
        document.getElementById("responseMessage").style.display = "block";

        // Redirect user to WhatsApp
        setTimeout(() => {
            window.location.href = result.whatsapp_link;
        }, 2000);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let index = 0;
    const testimonials = document.querySelectorAll(".testimonial-item");
    const totalTestimonials = testimonials.length;
    const prevBtn = document.getElementById("prevTestimonial");
    const nextBtn = document.getElementById("nextTestimonial");

    function showTestimonial(newIndex) {
        testimonials.forEach((item, i) => {
            item.classList.remove("active");
            if (i === newIndex) item.classList.add("active");
        });
    }

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(index);
    });

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % totalTestimonials;
        showTestimonial(index);
    });

    showTestimonial(index);
});

        // YouTube Modal Script
        document.querySelectorAll('.youtube-link').forEach(item => {
            item.addEventListener('click', event => {
                event.preventDefault();
                document.getElementById('modal-video').src = item.href + "?autoplay=1";
                document.getElementById('videoModal').style.display = "block";
            });
        });

        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('videoModal').style.display = "none";
            document.getElementById('modal-video').src = "";
        });