document.addEventListener('DOMContentLoaded', function() {
    // Configuración de iconos
    const ICONS = [
        'code', 'bug_report', 'terminal', 'api', 'memory',
        'settings_suggest', 'cloud_queue', 'data_object', 'schema'
    ];
    const ICON_SIZE = 24;
    const SPACING = ICON_SIZE * 2;

    // Guardar intervalos para limpiar después
    let iconIntervals = [];

    // Función para crear el fondo de iconos
    function createIconBackground() {
        const container = document.getElementById('iconBackground');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const columns = Math.ceil(windowWidth / SPACING);
        const rows = Math.ceil(windowHeight / SPACING);

        // Limpiar iconos e intervalos existentes
        container.innerHTML = '';
        iconIntervals.forEach(clearInterval);
        iconIntervals = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const icon = document.createElement('span');
                icon.className = 'material-icons';
                icon.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];
                icon.style.left = `${col * SPACING}px`;
                icon.style.top = `${row * SPACING}px`;
                icon.style.position = 'absolute';

                // Animación flotante y rotación aleatoria
                const floatDuration = Math.random() * 3 + 3; // 3-6s
                const floatDistance = Math.random() * 12 + 8; // 8-20px
                const rotateDeg = Math.random() * 360;

                icon.animate([
                    { transform: `translateY(0px) rotate(0deg)` },
                    { transform: `translateY(-${floatDistance}px) rotate(${rotateDeg}deg)` },
                    { transform: `translateY(0px) rotate(0deg)` }
                ], {
                    duration: floatDuration * 1000,
                    iterations: Infinity,
                    direction: 'alternate',
                    easing: 'ease-in-out'
                });

                // Pulso aleatorio
                const interval = setInterval(() => {
                    icon.classList.toggle('pulse');
                }, Math.random() * 2000 + 2000); // 2-4s
                iconIntervals.push(interval);

                container.appendChild(icon);
            }
        }
    }

    // Crear el fondo inicial
    createIconBackground();

    // Recrear el fondo cuando se redimensiona la ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createIconBackground, 200);
    });

    // Animación suave al scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animación de entrada para todas las tarjetas
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Seleccionar todas las tarjetas relevantes
    const cardSelectors = [
        '.feature-card',
        '.role-card',
        '.testimonial-card',
        '.tech-item'
    ];
    document.querySelectorAll(cardSelectors.join(',')).forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.7s cubic-bezier(.4,2,.6,1), transform 0.7s cubic-bezier(.4,2,.6,1)';
        observer.observe(card);
    });

    // Animación de botón CTA
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.animate([
                { transform: 'scale(1)', boxShadow: '0 0 0px #2366C4' },
                { transform: 'scale(1.07)', boxShadow: '0 4px 20px #2366C455' }
            ], {
                duration: 250,
                fill: 'forwards'
            });
        });
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.animate([
                { transform: 'scale(1.07)', boxShadow: '0 4px 20px #2366C455' },
                { transform: 'scale(1)', boxShadow: '0 0 0px #2366C4' }
            ], {
                duration: 250,
                fill: 'forwards'
            });
        });
    }

    // Animación de feedback en el formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            contactForm.style.pointerEvents = 'none';
            contactForm.animate([
                { opacity: 1, filter: 'blur(0px)' },
                { opacity: 0.7, filter: 'blur(2px)' }
            ], { duration: 400, fill: 'forwards' });
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.pointerEvents = '';
                contactForm.animate([
                    { opacity: 0.7, filter: 'blur(2px)' },
                    { opacity: 1, filter: 'blur(0px)' }
                ], { duration: 400, fill: 'forwards' });
                // Mensaje visual de éxito
                let msg = document.createElement('div');
                msg.textContent = "¡Mensaje enviado!";
                msg.style.cssText = `
                    background: #4F8CFF;
                    color: #fff;
                    padding: 10px 20px;
                    border-radius: 4px;
                    text-align: center;
                    margin-top: 14px;
                    font-weight: 600;
                    font-size: 14px;
                    animation: fadeInOut 2.5s forwards;
                `;
                contactForm.parentElement.appendChild(msg);
                setTimeout(() => msg.remove(), 2500);
            }, 400);
        });
    }

    // Animación para mensaje de éxito
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px);}
        10% { opacity: 1; transform: translateY(0);}
        90% { opacity: 1; transform: translateY(0);}
        100% { opacity: 0; transform: translateY(-10px);}
    }`;
    document.head.appendChild(style);
});
