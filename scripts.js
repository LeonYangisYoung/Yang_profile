const quotes = [
    "I’ve become your shadow, your misery was mine.",
    "I want a tooth for a tooth, I want an eye for an eye.",
    "When dark meets the light, it burns like the sun.",
    "So give me a reason to prove me wrong and wash this memory clean.",
    "Mission sub rosa, concealed en umbra.",
    "I’m due for a miracle.",
    "By pulling me down, pulling me down, burn me to the ground.",
    "All I see is illusion — it’s all illusion.",
    "I hear it from no one; the old world may have said no word, but I have to keep knowing.",
    "I’ve seen the highest high when I’m down in the lowest low.",
    "Hold your ground. The night hums with neon and promise."
];

function displayRandomQuote() {
    const quoteElement = document.getElementById("random-quote");
    if (!quoteElement) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

function revealSectionsOnScroll() {
    const sections = document.querySelectorAll('.section[data-animate]');
    if (!('IntersectionObserver' in window) || sections.length === 0) {
        sections.forEach(section => section.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.35
    });

    sections.forEach(section => observer.observe(section));
}

function setActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    function updateActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentId = sections[0]?.id ?? '';
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentId = section.id;
            }
        });
        navLinks.forEach(link => {
            const matches = link.dataset.nav === currentId;
            link.classList.toggle('is-active', matches);
        });
    }

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);
}

function handleScrollHint() {
    const scrollHint = document.querySelector('[data-scroll-hint]');
    if (!scrollHint) return;
    const toggleHint = () => {
        scrollHint.style.opacity = window.scrollY > 180 ? '0' : '1';
    };
    toggleHint();
    window.addEventListener('scroll', toggleHint, { passive: true });
}

function showWelcomeToast() {
    const toast = document.getElementById('welcome-toast');
    if (!toast) return;
    const closeButton = toast.querySelector('.toast-close');

    const revealToast = () => toast.classList.add('show');
    const hideToast = () => toast.classList.remove('show');

    setTimeout(revealToast, 800);
    setTimeout(hideToast, 1000 * 12);

    closeButton?.addEventListener('click', hideToast);
}

function initParticleField() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02030a, 0.18);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const particleCount = 1400;
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const colorA = new THREE.Color(0x68f1ff);
    const colorB = new THREE.Color(0xff4dbe);
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const radius = 2.4 + Math.random() * 4.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        const x = radius * Math.cos(theta) * Math.cos(phi);
        const y = radius * Math.sin(phi) * 0.8;
        const z = radius * Math.sin(theta) * Math.cos(phi);

        basePositions[i3] = positions[i3] = x;
        basePositions[i3 + 1] = positions[i3 + 1] = y;
        basePositions[i3 + 2] = positions[i3 + 2] = z;

        speeds[i] = 0.35 + Math.random() * 0.9;

        const mix = THREE.MathUtils.clamp((y + 3.6) / 7.2, 0, 1);
        tempColor.copy(colorA).lerp(colorB, mix);
        colors[i3] = tempColor.r;
        colors[i3 + 1] = tempColor.g;
        colors[i3 + 2] = tempColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.055,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const clock = new THREE.Clock();
    const targetRotation = { x: 0, y: 0 };

    function handlePointer(event) {
        const point = event.touches ? event.touches[0] : event;
        const normalizedX = (point.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = (point.clientY / window.innerHeight) * 2 - 1;
        targetRotation.x = normalizedX * 0.45;
        targetRotation.y = normalizedY * 0.25;
    }

    window.addEventListener('mousemove', handlePointer);
    window.addEventListener('touchmove', handlePointer, { passive: true });

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        const positionAttr = geometry.attributes.position;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const baseX = basePositions[i3];
            const baseY = basePositions[i3 + 1];
            const baseZ = basePositions[i3 + 2];
            const speed = speeds[i];

            positions[i3] = baseX + Math.sin(elapsed * 0.4 + baseY) * 0.08;
            positions[i3 + 1] = baseY + Math.sin(elapsed * speed + baseX) * 0.45;
            positions[i3 + 2] = baseZ + Math.cos(elapsed * speed + baseY) * 0.3;
        }

        positionAttr.needsUpdate = true;

        particleSystem.rotation.y += (targetRotation.x - particleSystem.rotation.y) * 0.02;
        particleSystem.rotation.x += (targetRotation.y - particleSystem.rotation.x) * 0.02;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initApp() {
    displayRandomQuote();
    revealSectionsOnScroll();
    setActiveNavigation();
    handleScrollHint();
    showWelcomeToast();
    initParticleField();
}

document.addEventListener('DOMContentLoaded', initApp);
