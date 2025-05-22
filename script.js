document.addEventListener('DOMContentLoaded', function() {
    // Configuración de iconos
    const ICONS = [
        'code', 'bug_report', 'terminal', 'api', 'memory',
        'settings_suggest', 'cloud_queue', 'data_object', 'schema'
    ];
    
    const ICON_SIZE = 24;
    const SPACING = ICON_SIZE * 2;

    // Función para crear el fondo de iconos
    function createIconBackground() {
        const container = document.getElementById('iconBackground');
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const columns = Math.ceil(windowWidth / SPACING);
        const rows = Math.ceil(windowHeight / SPACING);
        
        // Limpiar iconos existentes
        container.innerHTML = '';
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const icon = document.createElement('span');
                icon.className = 'material-icons';
                icon.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];
                
                icon.style.left = `${col * SPACING}px`;
                icon.style.top = `${row * SPACING}px`;
                
                container.appendChild(icon);
            }
        }
    }

    // Función para animar los iconos
    function animateIcons() {
        const icons = document.querySelectorAll('.icon-background .material-icons');
        icons.forEach(icon => {
            setInterval(() => {
                icon.classList.toggle('pulse');
            }, Math.random() * 2000 + 2000); // Intervalo aleatorio entre 2-4 segundos
        });
    }

    // Crear el fondo inicial
    createIconBackground();
    
    // Iniciar animaciones
    animateIcons();
    
    // Recrear el fondo cuando se redimensiona la ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createIconBackground, 200);
    });

    // Tu código existente para el botón CTA
    const ctaButton = document.getElementById('ctaButton');
    ctaButton.addEventListener('click', function() {
        alert('¡Gracias por tu interés! Pronto podrás comenzar a usar QUORK.');
    });

    // Animación suave al scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación de entrada para las feature cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.feature-card').forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});