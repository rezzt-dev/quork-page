document.addEventListener('DOMContentLoaded', function() {
    const windowElement = document.querySelector('.window');
    const windowControls = document.querySelectorAll('.control');
    const body = document.body;
    let isMaximized = false;

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

    // Animación al hacer clic en las tarjetas
    document.querySelectorAll('.feature-card, .role-card, .testimonial-card, .tech-item').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName.toLowerCase() === 'a') return;
            const originalBoxShadow = card.style.boxShadow;
            const originalBackground = card.style.background;
            const originalBorder = card.style.border;
            const originalTransform = card.style.transform;
            card.style.transition = 'all 0.3s ease-in-out';
            card.style.boxShadow = '0 0 0 4px #2366c455, 0 8px 18px #2366c455';
            card.style.background = '#e3f2ff';
            card.style.border = '1px solid #2366C4';
            card.style.transform = 'translateY(-2px) scale(1.01)';
            setTimeout(() => {
                card.style.boxShadow = originalBoxShadow;
                card.style.background = originalBackground;
                card.style.border = originalBorder;
                card.style.transform = originalTransform;
            }, 300);
        });
    });

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

    windowControls[0].addEventListener('click', function() {
        windowElement.style.opacity = '0';
        windowElement.style.pointerEvents = 'none';
        windowElement.style.transform = 'translateY(40px)';
        windowElement.style.transition = 'opacity 0.3s, transform 0.3s';
        setTimeout(() => {
            windowElement.style.display = 'none';
            // Botón de restaurar (puedes usar el estilo que prefieras)
            const restoreButton = document.createElement('button');
            restoreButton.className = 'centered-quork-button';
            restoreButton.innerHTML = `<img src="resources/app.ico" alt="QUORK"> Restaurar ventana`;
            restoreButton.addEventListener('click', function() {
                windowElement.style.display = '';
                windowElement.style.opacity = '0';
                windowElement.style.transform = 'translateY(40px)';
                setTimeout(() => {
                    windowElement.style.opacity = '1';
                    windowElement.style.transform = 'translateY(0)';
                    windowElement.style.pointerEvents = '';
                    restoreButton.remove();
                }, 10);
            });
            document.body.appendChild(restoreButton);
        }, 300);
    });

    // Maximizar: Alterna entre pantalla completa y normal
    windowControls[1].addEventListener('click', function() {
        if (!isMaximized) {
            body.classList.add('maximized');
            windowElement.style.position = 'fixed';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
            windowElement.style.width = '100vw';
            windowElement.style.height = '100vh';
            windowElement.style.margin = '0';
            windowElement.style.borderRadius = '0';
            windowElement.style.zIndex = '1000';
            isMaximized = true;
        } else {
            body.classList.remove('maximized');
            windowElement.style.position = '';
            windowElement.style.left = '';
            windowElement.style.top = '';
            windowElement.style.width = '';
            windowElement.style.height = '';
            windowElement.style.margin = '';
            windowElement.style.borderRadius = '';
            windowElement.style.zIndex = '';
            isMaximized = false;
            // Si usas margin: auto en CSS, la ventana se centra sola
        }
    });

    // Cerrar: Oculta la ventana y muestra el botón de reabrir (solo icono)
    windowControls[2].addEventListener('click', function() {
        windowElement.style.opacity = '0';
        windowElement.style.transform = 'scale(0.9)';
        windowElement.style.transition = 'opacity 0.3s, transform 0.3s';
        windowElement.style.pointerEvents = 'none';
        setTimeout(() => {
            windowElement.style.display = 'none';
            // Botón solo icono para reabrir
            const reopenButton = document.createElement('button');
            reopenButton.className = 'centered-quork-icon-button';
            reopenButton.innerHTML = `<img src="resources/app.ico" alt="QUORK">`;
            reopenButton.addEventListener('click', function() {
                windowElement.style.display = '';
                windowElement.style.opacity = '0';
                windowElement.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    windowElement.style.opacity = '1';
                    windowElement.style.transform = 'scale(1)';
                    windowElement.style.pointerEvents = '';
                    reopenButton.remove();
                }, 10);
            });
            document.body.appendChild(reopenButton);
        }, 300);
    });
});
