const quotes = [
    "I’ve become your shadow, your misery was mine.",
    "I want a tooth for a tooth, I want an eye for an eye.",
    "By pulling me down, pulling me down, burn me to the ground.",
    "All I see is illusion. All I am is illusion.",
    "I’ve seen the highest high when I’m down in the lowest low.",
    "I’m due for a miracle.",
    "When dark meets the light, it burns like the sun.",
    "Mission sub rosa, concealed en umbra.",
];

function displayRandomQuote() {
    const quoteElement = document.getElementById("random-quote");

    if (!quoteElement) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

function initRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    revealElements.forEach((element) => observer.observe(element));
}

function initScrollCue() {
    const scrollCue = document.querySelector(".scroll-down");

    if (!scrollCue) {
        return;
    }

    window.addEventListener("scroll", () => {
        scrollCue.classList.toggle("is-hidden", window.scrollY > 120);
    }, { passive: true });
}

function initParticleCanvas() {
    const canvas = document.getElementById("particleCanvas");

    if (!canvas) {
        return;
    }

    const context = canvas.getContext("2d");
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        const particleCount = Math.min(110, Math.floor((width * height) / 14000));
        particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.4,
            speedX: (Math.random() - 0.5) * 0.45,
            speedY: (Math.random() - 0.5) * 0.45,
            alpha: Math.random() * 0.5 + 0.2,
        }));
    }

    function drawParticles() {
        context.clearRect(0, 0, width, height);

        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > width) {
                particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > height) {
                particle.speedY *= -1;
            }

            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fillStyle = `rgba(94, 231, 255, ${particle.alpha})`;
            context.fill();

            for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
                const nextParticle = particles[nextIndex];
                const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);

                if (distance < 120) {
                    context.beginPath();
                    context.moveTo(particle.x, particle.y);
                    context.lineTo(nextParticle.x, nextParticle.y);
                    context.strokeStyle = `rgba(167, 139, 250, ${0.16 * (1 - distance / 120)})`;
                    context.lineWidth = 1;
                    context.stroke();
                }
            }
        });

        animationFrameId = requestAnimationFrame(drawParticles);
    }

    function startAnimation() {
        cancelAnimationFrame(animationFrameId);
        resizeCanvas();

        if (!mediaQuery.matches) {
            drawParticles();
        }
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    mediaQuery.addEventListener("change", startAnimation);
    startAnimation();
}

document.addEventListener("DOMContentLoaded", () => {
    displayRandomQuote();
    initRevealAnimations();
    initScrollCue();
    initParticleCanvas();
});
