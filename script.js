document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Dark / Light Theme Toggle with LocalStorage Persistence
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeIcon) themeIcon.classList.replace("fa-sun", "fa-moon");
    }

    themeToggle?.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");

        if (themeIcon) {
            themeIcon.classList.toggle("fa-sun", !isLight);
            themeIcon.classList.toggle("fa-moon", isLight);
        }
        localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });

    // 3. Mobile Navigation Menu Toggle
    const menuIcon = document.getElementById("menu-icon");
    const menu = document.getElementById("menu");
    const menuLinks = document.querySelectorAll(".menu a");

    menuIcon?.addEventListener("click", () => {
        menu.classList.toggle("active");
        const icon = menuIcon.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    });

    // Close mobile menu when a link is clicked
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            const icon = menuIcon?.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        });
    });

    // 4. Typing Animation in Hero Section
    const typingElement = document.getElementById("typing");
    const roles = [
        "Telecom & Network Engineer",
        "LTE / 4G / 5G Specialist",
        "Python & Automation Developer",
        "IT Infrastructure Engineer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];
        typingElement.textContent = currentRole.substring(0, charIndex);

        let typingSpeed = isDeleting ? 45 : 90;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 1800; // Pause at complete word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        charIndex += isDeleting ? -1 : 1;
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // 5. Active Nav Link Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY + 150;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            const navLink = document.querySelector(`.menu a[href="#${id}"]`);

            if (scrollY >= top && scrollY < top + height) {
                menuLinks.forEach((link) => link.classList.remove("active"));
                navLink?.classList.add("active");
            }
        });
    });

    // 6. Contact Form Submission (Formspree AJAX)
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);

        formStatus.style.color = "var(--accent)";
        formStatus.textContent = "Sending message...";

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                formStatus.style.color = "#22c55e";
                formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
                contactForm.reset();
            } else {
                formStatus.style.color = "#ef4444";
                formStatus.textContent = "Something went wrong. Please check your Formspree ID or try again.";
            }
        } catch (error) {
            formStatus.style.color = "#ef4444";
            formStatus.textContent = "Network error. Please check your internet connection.";
        }
    });
});