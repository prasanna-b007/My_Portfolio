/**
 * High-End Developer Portfolio Script
 * Dynamic Elements, Micro-interactions, and 3D Visuals
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.replace('theme-dark', 'theme-light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('theme-dark')) {
            body.classList.replace('theme-dark', 'theme-light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('theme-light', 'theme-dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 2. Cursor Glow Tracking
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // 2. Typed.js Initialization
    new Typed('#typed-roles', {
        strings: [
            'Full Stack Developer',
            'AI Application Builder',
            'Java Systems Architect',
            'Problem Solver'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        cursorChar: '_'
    });

    // 3. AOS Initialization
    AOS.init({
        duration: 1000,
        easing: 'ease-out-expo',
        once: true,
        offset: 80
    });

    // 4. Three.js - Epic Wireframe Orb
    const initThree = () => {
        const canvas = document.querySelector('#three-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create a large, wireframe Icosahedron
        const geometry = new THREE.IcosahedronGeometry(15, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x3DDCFF,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Add a secondary, smaller rotating element
        const innerGeo = new THREE.IcosahedronGeometry(8, 1);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x8B5CF6,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerMesh);

        camera.position.z = 30;

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.001;
            mesh.rotation.y += 0.001;
            innerMesh.rotation.x -= 0.002;
            innerMesh.rotation.y -= 0.002;
            renderer.render(scene, camera);
        };

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    };
    initThree();

    // 5. tsParticles - Minimal Floating Grid
    tsParticles.load("hero-particles", {
        particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.1, random: true },
            size: { value: 1.5, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.05,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.4,
                direction: "none",
                random: true,
                out_mode: "out"
            }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "grab" }
            }
        }
    });

    // 6. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link, .btn-modern, .btn-p-link, .btn-gradient-border').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 7. Dynamic Navbar on Scroll
    const nav = document.querySelector('.super-nav');
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 100) {
                nav.style.padding = '10px 4vw';
                nav.style.background = 'rgba(10, 10, 12, 0.9)';
            } else {
                nav.style.padding = '15px 4vw';
                nav.style.background = 'rgba(10, 10, 12, 0.6)';
            }
        }
    });

    // 8. Mobile Menu Logic (Basic)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '70px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'var(--clr-surface)';
                navMenu.style.padding = '20px';
                navMenu.style.borderRadius = '16px';
                navMenu.style.border = '1px solid var(--clr-border)';
            }
        });
    }

    // 9. EmailJS Integration
    (function() {
        emailjs.init("SnSbbZLc7pO9dHHbK");
    })();

    const contactForm = document.querySelector('.minimal-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = 'Sending Message... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // EmailJS Service ID and Template ID
            const serviceID = 'service_8db9k64';
            const templateID = 'template_g6sed49';

            emailjs.sendForm(serviceID, templateID, contactForm)
                .then(() => {
                    btn.innerHTML = 'Message sent successfully! <i class="fas fa-check"></i>';
                    btn.style.background = '#00ff88';
                    btn.style.color = '#000';
                    contactForm.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalContent;
                        btn.style.background = 'white';
                        btn.style.color = 'black';
                        btn.disabled = false;
                    }, 4000);
                }, (err) => {
                    btn.innerHTML = 'Failed to send message. Please try again. <i class="fas fa-exclamation-triangle"></i>';
                    btn.style.background = '#ff4d4d';
                    btn.style.color = '#fff';
                    console.error('EmailJS Error:', err);

                    setTimeout(() => {
                        btn.innerHTML = originalContent;
                        btn.style.background = 'white';
                        btn.style.color = 'black';
                        btn.disabled = false;
                    }, 4000);
                });
        });
    }

    // 10. Certificate Modal Logic
    window.openCertModal = (title, org) => {
        const modal = document.getElementById('cert-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalOrg = document.getElementById('modal-org');
        const modalImgPlaceholder = document.getElementById('modal-image-placeholder');

        modalTitle.textContent = title;
        modalOrg.textContent = org;
        
        // Pick a random gradient for the placeholder
        const grads = ['p-grad-1', 'p-grad-2', 'p-grad-3'];
        const randomGrad = grads[Math.floor(Math.random() * grads.length)];
        modalImgPlaceholder.className = `modal-placeholder ${randomGrad}`;
        
        // Set icon based on title keywords
        let iconClass = 'fa-certificate';
        if (title.toLowerCase().includes('python')) iconClass = 'fab fa-python';
        if (title.toLowerCase().includes('hackathon') || title.toLowerCase().includes('kalam')) iconClass = 'fa-trophy';
        if (title.toLowerCase().includes('research')) iconClass = 'fa-file-alt';
        if (title.toLowerCase().includes('web')) iconClass = 'fa-laptop-code';
        
        modalImgPlaceholder.innerHTML = `<i class="fas ${iconClass}"></i>`;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    window.closeCertModal = () => {
        const modal = document.getElementById('cert-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('cert-modal');
        if (e.target === modal) {
            closeCertModal();
        }
    });

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertModal();
        }
    });
});
