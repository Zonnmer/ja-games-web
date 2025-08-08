// Variables globales
let isPlaying = false;
let audioPlayer = null;
let playBtn = null;
let statusElement = null;
let titleElement = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Inicializar elementos del DOM
function initializeElements() {
    audioPlayer = document.getElementById('audioPlayer');
    playBtn = document.getElementById('playBtn');
    statusElement = document.getElementById('status');
    titleElement = document.getElementById('title');
}

// Inicializar event listeners
function initializeEventListeners() {
    // Event listener para el botón de play/pause
    if (playBtn) {
        playBtn.addEventListener('click', togglePlayPause);
    }

    // Event listeners para el audio player
    if (audioPlayer) {
        audioPlayer.addEventListener('play', onPlay);
        audioPlayer.addEventListener('pause', onPause);
        audioPlayer.addEventListener('ended', onEnded);
        audioPlayer.addEventListener('error', onError);
        audioPlayer.addEventListener('loadstart', onLoadStart);
        audioPlayer.addEventListener('canplay', onCanPlay);
    }

    // Event listeners para navegación
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Event listeners para botones de explorar
    const exploreButtons = document.querySelectorAll('a[href="#eventos"]');
    exploreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventosSection = document.querySelector('#eventos');
            if (eventosSection) {
                eventosSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Funciones del reproductor de radio
function togglePlayPause() {
    if (!audioPlayer) return;

    try {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    } catch (error) {
        console.error('Error al reproducir audio:', error);
        updateStatus('Error al reproducir', 'error');
    }
}

function onPlay() {
    isPlaying = true;
    updatePlayButton(true);
    updateStatus('Reproduciendo', 'playing');
    updateTitle('JA GAMES Radio - En Vivo');
}

function onPause() {
    isPlaying = false;
    updatePlayButton(false);
    updateStatus('Pausado', 'paused');
}

function onEnded() {
    isPlaying = false;
    updatePlayButton(false);
    updateStatus('Finalizado', 'ended');
}

function onError(event) {
    console.error('Error en el audio:', event);
    isPlaying = false;
    updatePlayButton(false);
    updateStatus('Error de conexión', 'error');
    updateTitle('JA GAMES Radio');
}

function onLoadStart() {
    updateStatus('Cargando...', 'loading');
    updateTitle('JA GAMES Radio');
}

function onCanPlay() {
    if (isPlaying) {
        updateStatus('Reproduciendo', 'playing');
        updateTitle('JA GAMES Radio - En Vivo');
    }
}

// Funciones de actualización de UI
function updatePlayButton(playing) {
    if (!playBtn) return;

    const icon = playBtn.querySelector('i');
    if (playing) {
        icon.className = 'fas fa-pause';
        playBtn.classList.add('playing');
    } else {
        icon.className = 'fas fa-play';
        playBtn.classList.remove('playing');
    }
}

function updateStatus(text, type) {
    if (!statusElement) return;

    statusElement.textContent = text;
    statusElement.className = `status-${type}`;
}

function updateTitle(text) {
    if (!titleElement) return;
    titleElement.textContent = text;
}

// Navegación suave
function initializeSmoothScrolling() {
    // Agregar offset para el header fijo
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    // Ajustar scroll para todas las secciones
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        section.style.scrollMarginTop = `${headerHeight + 20}px`;
    });
}

// Animaciones al hacer scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.event-card, .game-category, .product-card, .info-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Función para manejar errores de red
function handleNetworkError() {
    if (audioPlayer && audioPlayer.src) {
        console.log('Reintentando conexión...');
        setTimeout(() => {
            if (audioPlayer) {
                audioPlayer.load();
                if (isPlaying) {
                    audioPlayer.play().catch(error => {
                        console.error('Error al reintentar:', error);
                    });
                }
            }
        }, 3000);
    }
}

// Función para verificar el estado de la conexión
function checkConnection() {
    if (!navigator.onLine) {
        updateStatus('Sin conexión', 'offline');
        updateTitle('JA GAMES Radio');
    }
}

// Event listeners para estado de conexión
window.addEventListener('online', function() {
    if (isPlaying) {
        audioPlayer.play().catch(error => {
            console.error('Error al reanudar:', error);
        });
    }
});

window.addEventListener('offline', function() {
    updateStatus('Sin conexión', 'offline');
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff3333' : type === 'success' ? '#00cc00' : '#ff6600'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para manejar clicks en enlaces de juegos
function initializeGameLinks() {
    const gameLinks = document.querySelectorAll('.game-item');
    gameLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const gameName = this.textContent;
            showNotification(`Cargando ${gameName}...`, 'info');
            
            // Simular carga del juego
            setTimeout(() => {
                showNotification(`${gameName} cargado exitosamente!`, 'success');
            }, 2000);
        });
    });
}

// Función para manejar descargas de productos
function initializeProductDownloads() {
    const downloadButtons = document.querySelectorAll('.product-card .btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            showNotification(`Iniciando descarga de ${productName}...`, 'info');
            
            // Simular descarga
            setTimeout(() => {
                showNotification(`${productName} descargado exitosamente!`, 'success');
            }, 3000);
        });
    });
}

// Inicializar funcionalidades adicionales
document.addEventListener('DOMContentLoaded', function() {
    initializeGameLinks();
    initializeProductDownloads();
    
    // Verificar conexión inicial
    checkConnection();
    
    // Verificar conexión periódicamente
    setInterval(checkConnection, 10000);
});

// Función para agregar efectos de hover dinámicos
function addHoverEffects() {
    const cards = document.querySelectorAll('.event-card, .game-category, .product-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar efectos de hover
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Función para manejar el scroll del header
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Inicializar manejo de scroll del header
document.addEventListener('DOMContentLoaded', handleHeaderScroll);

// Función para agregar contador de visitantes (simulado)
function initializeVisitorCounter() {
    const visitorCount = localStorage.getItem('visitorCount') || 0;
    const newCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', newCount);
    
    // Mostrar en consola (puedes agregar un elemento en el HTML para mostrarlo)
    console.log(`Visitante #${newCount} en JA GAMES`);
}

// Inicializar contador de visitantes
document.addEventListener('DOMContentLoaded', initializeVisitorCounter);
