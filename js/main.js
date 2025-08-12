// Variables globales
let isPlaying = false;
let audioPlayer = null;
let playBtn = null;
let statusElement = null;
let titleElement = null;
let volumeSlider = null;
let audioVisualizer = null;
let currentTrackElement = null;

// Variables para transmisión en vivo
let isStreaming = false;
let streamKey = null;
let streamInterval = null;

// Variables para metadatos del stream
let metadataInterval = null;
let currentTrack = 'Cargando...';

// Variables para el reproductor flotante
let floatingPlayer = null;
let floatingPlayBtn = null;
let floatingVolumeBtn = null;
let floatingCloseBtn = null;
let globalAudioPlayer = null;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Inicializando JA GAMES Radio...');
    console.log('📍 Página actual:', window.location.pathname);
    
    // Esperar a que i18n se inicialice
    setTimeout(() => {
        initializeElements();
        initializeEventListeners();
        initializeSmoothScrolling();
        initializeAnimations();
        initializeFloatingPlayer();
        initializeLanguageSelector();
        initializeMobileMenu();
        
        // Solo inicializar el reproductor de radio si estamos en la página ja-live.html
        if (window.location.pathname.includes('ja-live.html')) {
            console.log('📻 Inicializando reproductor principal en JA LIVE');
            initializeRadioPlayer();
        }
        
        // Verificar si hay música reproduciéndose desde otra página
        checkGlobalPlayerState();
        
        // Agregar botón flotante para iniciar radio en todas las páginas
        addFloatingRadioButton();
        
        // Verificar si el reproductor flotante debe estar visible
        checkFloatingPlayerVisibility();
        
        // Debug: mostrar estado actual
        const wasPlaying = localStorage.getItem('radioWasPlaying') === 'true';
        const wasVisible = localStorage.getItem('floatingPlayerVisible') === 'true';
        console.log('🎵 Estado de la radio:', { wasPlaying, wasVisible });
    }, 100);
});

// Inicializar elementos del DOM
function initializeElements() {
    audioPlayer = document.getElementById('audioPlayer');
    playBtn = document.getElementById('playBtn');
    statusElement = document.getElementById('status');
    titleElement = document.getElementById('title');
    volumeSlider = document.getElementById('volumeSlider');
    audioVisualizer = document.getElementById('audioVisualizer');
    currentTrackElement = document.getElementById('currentTrack');
}

// Inicializar el reproductor de radio
function initializeRadioPlayer() {
    // Verificar si el elemento de audio ya existe en el HTML
    if (!audioPlayer) {
        audioPlayer = document.getElementById('audioPlayer');
    }
    
    // Si no existe, crearlo
    if (!audioPlayer) {
        audioPlayer = document.createElement('audio');
        audioPlayer.id = 'audioPlayer';
        audioPlayer.crossOrigin = 'anonymous';
        audioPlayer.preload = 'metadata';
        document.body.appendChild(audioPlayer);
    }
    
    // Configurar la fuente del stream
    audioPlayer.src = 'https://stream.zeno.fm/hx2n86ucgabuv';
    
    // Iniciar la obtención de metadatos
    startMetadataFetching();
    
    // Intentar obtener metadatos usando ICY
    fetchICYMetadata();
    

}

// Función para obtener metadatos del stream
function startMetadataFetching() {
    // Simplemente mostrar que es la radio
    currentTrack = 'JA GAMES Radio - En Vivo';
    updateCurrentTrack();
    console.log('📻 Radio iniciada: JA GAMES Radio - En Vivo');
}

// Función para obtener metadatos de Zeno.fm
async function fetchMetadataFromZeno() {
    // Simplemente mostrar que es la radio
    currentTrack = 'JA GAMES Radio - En Vivo';
    updateCurrentTrack();
    console.log('📻 Reproduciendo: JA GAMES Radio - En Vivo');
}

// Función para obtener metadatos alternativos
function fetchAlternativeMetadata() {
    console.log('🔄 Usando método alternativo para metadatos...');
    currentTrack = 'JA GAMES Radio - En Vivo';
    updateCurrentTrack();
}

// Función para obtener metadatos usando protocolo ICY
async function fetchICYMetadata() {
    // Simplemente mostrar que es la radio
    currentTrack = 'JA GAMES Radio - En Vivo';
    updateCurrentTrack();
    console.log('📻 Reproduciendo: JA GAMES Radio - En Vivo');
}



// Función para actualizar la información de la canción actual
function updateCurrentTrack() {
    if (currentTrackElement) {
        currentTrackElement.textContent = currentTrack;
    }
    if (titleElement) {
        titleElement.textContent = currentTrack;
    }
    
    // Actualizar también el reproductor flotante
    if (floatingPlayer) {
        const floatingTrackTitle = floatingPlayer.querySelector('.floating-track-title');
        if (floatingTrackTitle) {
            floatingTrackTitle.textContent = currentTrack;
        }
    }
}

// Inicializar event listeners
function initializeEventListeners() {
    // Solo configurar event listeners del reproductor si estamos en ja-live.html
    if (window.location.pathname.includes('ja-live.html')) {
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

        // Event listener para el control de volumen
        if (volumeSlider) {
            volumeSlider.addEventListener('input', handleVolumeChange);
            
            // Cargar volumen guardado o establecer volumen inicial
            const savedVolume = localStorage.getItem('jaGamesVolume');
            if (savedVolume) {
                volumeSlider.value = savedVolume;
                if (audioPlayer) {
                    audioPlayer.volume = savedVolume / 100;
                }
            } else if (audioPlayer) {
                audioPlayer.volume = volumeSlider.value / 100;
            }
            
            // Actualizar indicador visual inicial
            updateVolumeIndicator();
        }

        // Event listeners para transmisión en vivo
        initializeStreamControls();
        
        // Event listener para mostrar/ocultar sección de transmisión
        const toggleStreamBtn = document.getElementById('toggleStreamBtn');
        if (toggleStreamBtn) {
            toggleStreamBtn.addEventListener('click', toggleStreamSection);
        }
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
    // Si estamos en ja-live.html, usar el reproductor principal
    if (window.location.pathname.includes('ja-live.html') && audioPlayer) {
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
    } else {
        // En otras páginas, usar el reproductor flotante
        const floatingAudioPlayer = floatingPlayer.querySelector('#floatingAudioPlayer');
        if (floatingAudioPlayer) {
            if (floatingAudioPlayer.paused) {
                floatingAudioPlayer.play();
                floatingPlayer.style.display = 'block';
                showNotification('Radio iniciada en reproductor flotante', 'success');
            } else {
                floatingAudioPlayer.pause();
                // NO ocultar el reproductor flotante cuando se pausa
            }
        }
    }
}

function onPlay() {
    console.log('▶️ Reproduciendo radio...');
    isPlaying = true;
    updatePlayButton(true);
    updateStatus('Reproduciendo', 'playing');
    updateTitle('JA GAMES Radio - En Vivo');
    updateAudioVisualizer(true);
    
    // Guardar estado de reproducción en localStorage
    localStorage.setItem('radioWasPlaying', 'true');
    console.log('💾 Estado guardado: radioWasPlaying = true');
    
    // Si el reproductor flotante está activo, actualizar su estado
    if (floatingPlayer && floatingPlayer.style.display !== 'none') {
        const floatingPlayBtn = floatingPlayer.querySelector('.floating-play-btn');
        if (floatingPlayBtn) {
            floatingPlayBtn.querySelector('i').className = 'fas fa-pause';
        }
    }
}

function onPause() {
    console.log('⏸️ Pausando radio...');
    isPlaying = false;
    updatePlayButton(false);
    updateStatus('Pausado', 'paused');
    updateAudioVisualizer(false);
    
    // Guardar estado de pausa en localStorage
    localStorage.setItem('radioWasPlaying', 'false');
    console.log('💾 Estado guardado: radioWasPlaying = false');
    
    // Si el reproductor flotante está activo, actualizar su estado
    if (floatingPlayer && floatingPlayer.style.display !== 'none') {
        const floatingPlayBtn = floatingPlayer.querySelector('.floating-play-btn');
        if (floatingPlayBtn) {
            floatingPlayBtn.querySelector('i').className = 'fas fa-play';
        }
    }
}

function onEnded() {
    isPlaying = false;
    updatePlayButton(false);
    updateStatus('Finalizado', 'ended');
    updateAudioVisualizer(false);
}

function onError(event) {
    console.error('Error en el audio:', event);
    isPlaying = false;
    updatePlayButton(false);
    updateStatus('Error de conexión', 'error');
    updateTitle('JA GAMES Radio');
    updateAudioVisualizer(false);
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

// Función para actualizar el visualizador de audio
function updateAudioVisualizer(playing) {
    if (!audioVisualizer) return;
    
    if (playing) {
        audioVisualizer.classList.remove('paused');
    } else {
        audioVisualizer.classList.add('paused');
    }
}

// Función para manejar el cambio de volumen
function handleVolumeChange() {
    if (!audioPlayer || !volumeSlider) return;
    
    const volume = volumeSlider.value / 100;
    audioPlayer.volume = volume;
    
    // Guardar el volumen en localStorage
    localStorage.setItem('jaGamesVolume', volumeSlider.value);
    
    // Actualizar indicador visual en la barra de volumen
    updateVolumeIndicator();
}

// Función para actualizar el indicador visual del volumen
function updateVolumeIndicator() {
    if (!volumeSlider) return;
    
    const volume = volumeSlider.value;
    
    // Actualizar el color de la barra según el volumen
    let color;
    if (volume == 0) {
        color = '#666';
    } else if (volume < 30) {
        color = '#ff6b6b';
    } else if (volume < 70) {
        color = '#ffa726';
    } else {
        color = '#66bb6a';
    }
    
    // Actualizar el gradiente de la barra
    volumeSlider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${volume}%, var(--dark-border) ${volume}%, var(--dark-border) 100%)`;
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

// Funciones para transmisión en vivo integrada con la radio
function initializeStreamControls() {
    // Generar clave de transmisión automáticamente al cargar la página
    generateStreamKey();
    
    // Iniciar monitoreo automático del stream
    startStreamMonitoring();
    
    // Ocultar sección de transmisión en vivo (ya no necesaria)
    const liveStreamSection = document.getElementById('liveStreamSection');
    if (liveStreamSection) {
        liveStreamSection.style.display = 'none';
    }
    
    // Ocultar botón de toggle de transmisión
    const toggleStreamBtn = document.getElementById('toggleStreamBtn');
    if (toggleStreamBtn) {
        toggleStreamBtn.style.display = 'none';
    }
}

function generateStreamKey() {
    // Generar una clave de transmisión única
    streamKey = 'ja-games-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
    
    // Guardar la clave en localStorage para referencia
    localStorage.setItem('streamKey', streamKey);
    
    // Mostrar la clave en la consola para desarrollo
    console.log('🔑 Clave de transmisión generada:', streamKey);
    console.log('📡 Para simular una transmisión en vivo, ejecuta en la consola: simulateLiveStream()');
    
    showNotification('Sistema de transmisión en vivo activado', 'success');
}

// Función para simular una transmisión en vivo (solo para desarrollo/pruebas)
function simulateLiveStream() {
    // Guardar el tiempo de inicio del stream
    localStorage.setItem('streamStartTime', Date.now().toString());
    
    // Forzar la detección del stream
    setTimeout(() => {
        checkStreamStatus();
    }, 2000);
    
    console.log('🎥 Simulando transmisión en vivo...');
    showNotification('Transmisión en vivo simulada iniciada', 'success');
}

// Función para detener la simulación de transmisión
function stopSimulatedStream() {
    localStorage.removeItem('streamStartTime');
    
    // Forzar el retorno a la radio
    if (isStreaming) {
        isStreaming = false;
        switchToRadio();
    }
    
    console.log('🛑 Simulación de transmisión detenida');
    showNotification('Simulación de transmisión detenida', 'info');
}

function startLiveStream() {
    if (!streamKey) {
        showNotification('Primero debes generar una clave de transmisión', 'error');
        return;
    }
    
    isStreaming = true;
    const startStreamBtn = document.getElementById('startStreamBtn');
    const stopStreamBtn = document.getElementById('stopStreamBtn');
    const streamContainer = document.getElementById('streamContainer');
    const liveStreamSection = document.getElementById('liveStreamSection');
    const streamInfo = document.getElementById('streamInfo');
    
    if (startStreamBtn) {
        startStreamBtn.style.display = 'none';
    }
    
    if (stopStreamBtn) {
        stopStreamBtn.style.display = 'inline-block';
    }
    
    if (streamContainer) {
        streamContainer.style.display = 'block';
        // Aquí puedes configurar el iframe con tu servicio de streaming
        // Por ejemplo, para YouTube Live, Twitch, o un servicio personalizado
        const iframe = document.getElementById('liveStreamFrame');
        if (iframe) {
            // Ejemplo con un servicio de streaming (reemplaza con tu URL real)
            iframe.src = `https://your-streaming-service.com/embed/${streamKey}`;
        }
    }
    
    if (liveStreamSection) {
        liveStreamSection.classList.add('stream-active');
    }
    
    if (streamInfo) {
        streamInfo.innerHTML = `
            <p><i class="fas fa-broadcast-tower"></i> <strong>TRANSMISIÓN EN VIVO ACTIVA</strong></p>
            <p><i class="fas fa-users"></i> Esperando conexión del streamer...</p>
        `;
    }
    
    // Pausar la radio automáticamente
    if (audioPlayer && isPlaying) {
        audioPlayer.pause();
    }
    
    // Iniciar monitoreo del stream
    startStreamMonitoring();
    
    showNotification('Transmisión en vivo iniciada', 'success');
}

function stopLiveStream() {
    isStreaming = false;
    const startStreamBtn = document.getElementById('startStreamBtn');
    const stopStreamBtn = document.getElementById('stopStreamBtn');
    const streamContainer = document.getElementById('streamContainer');
    const liveStreamSection = document.getElementById('liveStreamSection');
    const streamInfo = document.getElementById('streamInfo');
    
    if (startStreamBtn) {
        startStreamBtn.style.display = 'inline-block';
    }
    
    if (stopStreamBtn) {
        stopStreamBtn.style.display = 'none';
    }
    
    if (streamContainer) {
        streamContainer.style.display = 'none';
        const iframe = document.getElementById('liveStreamFrame');
        if (iframe) {
            iframe.src = '';
        }
    }
    
    if (liveStreamSection) {
        liveStreamSection.classList.remove('stream-active');
    }
    
    if (streamInfo) {
        streamInfo.innerHTML = `
            <p><i class="fas fa-info-circle"></i> Transmisión detenida. La radio volverá automáticamente.</p>
        `;
    }
    
    // Detener monitoreo del stream
    stopStreamMonitoring();
    
    // Reanudar la radio automáticamente
    setTimeout(() => {
        if (audioPlayer && !isPlaying) {
            audioPlayer.play();
        }
    }, 2000);
    
    showNotification('Transmisión en vivo detenida', 'info');
}

function startStreamMonitoring() {
    // Monitoreo automático del stream cada 10 segundos
    streamInterval = setInterval(() => {
        checkStreamStatus();
    }, 10000); // Verificar cada 10 segundos
}

function stopStreamMonitoring() {
    if (streamInterval) {
        clearInterval(streamInterval);
        streamInterval = null;
    }
}

function checkStreamStatus() {
    // Verificar si hay una transmisión en vivo activa
    // En un caso real, esto haría una petición a tu API de streaming
    const isStreamActive = detectLiveStream();
    
    if (isStreamActive && !isStreaming) {
        // Se detectó una transmisión en vivo, cambiar al stream
        isStreaming = true;
        switchToLiveStream();
        showNotification('¡Transmisión en vivo detectada! Cambiando al stream...', 'success');
    } else if (!isStreamActive && isStreaming) {
        // La transmisión en vivo terminó, volver a la radio
        isStreaming = false;
        switchToRadio();
        showNotification('Transmisión en vivo terminada. Volviendo a la radio...', 'info');
    }
}

// Función para detectar si hay una transmisión en vivo activa
function detectLiveStream() {
    // En un caso real, esto verificaría tu API de streaming
    // Por ahora, simulamos una detección cada cierto tiempo
    const now = Date.now();
    const streamStartTime = localStorage.getItem('streamStartTime');
    
    if (streamStartTime) {
        const timeSinceStart = now - parseInt(streamStartTime);
        // Simular que el stream dura entre 30 minutos y 2 horas
        if (timeSinceStart > 1800000 && timeSinceStart < 7200000) {
            return Math.random() > 0.3; // 70% de probabilidad de que esté activo
        }
    }
    
    return false;
}

// Función para cambiar al stream en vivo
function switchToLiveStream() {
    if (audioPlayer && isPlaying) {
        audioPlayer.pause();
    }
    
    // Actualizar la información de la canción actual
    if (currentTrackElement) {
        currentTrackElement.textContent = '🎥 TRANSMISIÓN EN VIVO - JA GAMES';
        currentTrackElement.classList.add('live-stream');
    }
    if (titleElement) {
        titleElement.textContent = '🎥 TRANSMISIÓN EN VIVO - JA GAMES';
    }
    
    // Actualizar el visualizador
    updateAudioVisualizer(false);
    
    // Actualizar el botón de play
    if (playBtn) {
        const icon = playBtn.querySelector('i');
        icon.className = 'fas fa-broadcast-tower';
        playBtn.classList.add('live-stream');
    }
    
    // Actualizar el reproductor
    const radioPlayer = document.querySelector('.radio-player');
    if (radioPlayer) {
        radioPlayer.classList.add('live-stream-active');
    }
}

// Función para volver a la radio
function switchToRadio() {
    // Reanudar la radio después de un breve delay
    setTimeout(() => {
        if (audioPlayer && !isPlaying) {
            audioPlayer.play();
        }
    }, 2000);
    
    // Actualizar la información de la canción actual
    updateCurrentTrack();
    
    // Actualizar el botón de play
    if (playBtn) {
        const icon = playBtn.querySelector('i');
        icon.className = 'fas fa-play';
        playBtn.classList.remove('live-stream');
    }
    
    // Actualizar el reproductor
    const radioPlayer = document.querySelector('.radio-player');
    if (radioPlayer) {
        radioPlayer.classList.remove('live-stream-active');
    }
    
    // Remover clase de transmisión en vivo del texto
    if (currentTrackElement) {
        currentTrackElement.classList.remove('live-stream');
    }
}

function toggleStreamSection() {
    const liveStreamSection = document.getElementById('liveStreamSection');
    const toggleStreamBtn = document.getElementById('toggleStreamBtn');
    
    if (liveStreamSection && toggleStreamBtn) {
        const isVisible = liveStreamSection.style.display !== 'none';
        
        if (isVisible) {
            liveStreamSection.style.display = 'none';
            toggleStreamBtn.innerHTML = '<i class="fas fa-video"></i><span>Transmisión en Vivo</span>';
            toggleStreamBtn.classList.remove('btn-primary');
            toggleStreamBtn.classList.add('btn-outline');
        } else {
            liveStreamSection.style.display = 'block';
            toggleStreamBtn.innerHTML = '<i class="fas fa-times"></i><span>Ocultar Transmisión</span>';
            toggleStreamBtn.classList.remove('btn-outline');
            toggleStreamBtn.classList.add('btn-primary');
        }
    }
}

// Función para inicializar el selector de idioma
function initializeLanguageSelector() {
    console.log('🌐 Inicializando selector de idioma...');
    
    const selectorContainer = document.getElementById('languageSelector');
    if (selectorContainer && window.i18n) {
        const languageSelector = window.i18n.createLanguageSelector();
        selectorContainer.appendChild(languageSelector);
        console.log('🌐 Selector de idioma inicializado');
    }
}

// Función para inicializar el menú móvil
function initializeMobileMenu() {
    console.log('📱 Inicializando menú móvil...');
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            console.log('📱 Toggle menú móvil');
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
        
        console.log('📱 Menú móvil inicializado');
    }
}

// Funciones para el reproductor flotante
function initializeFloatingPlayer() {
    floatingPlayer = document.getElementById('floatingPlayer');
    if (!floatingPlayer) {
        floatingPlayer = document.createElement('div');
        floatingPlayer.id = 'floatingPlayer';
        floatingPlayer.className = 'floating-player';
        floatingPlayer.innerHTML = `
            <div class="floating-player-header">
                <h4><i class="fas fa-broadcast-tower"></i> JA GAMES Radio</h4>
                <button class="floating-close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="floating-player-body">
                <div class="floating-track-info">
                    <span class="floating-track-title">JA GAMES Radio - En Vivo</span>
                </div>
                <div class="floating-controls">
                    <button class="floating-play-btn"><i class="fas fa-play"></i></button>
                    <button class="floating-volume-btn"><i class="fas fa-volume-up"></i></button>
                    <input type="range" class="floating-volume-slider" min="0" max="100" value="50">
                </div>
                <audio id="floatingAudioPlayer" preload="none"></audio>
            </div>
        `;
        document.body.appendChild(floatingPlayer);
    }

    floatingPlayBtn = floatingPlayer.querySelector('.floating-play-btn');
    floatingVolumeBtn = floatingPlayer.querySelector('.floating-volume-btn');
    floatingCloseBtn = floatingPlayer.querySelector('.floating-close-btn');

    if (floatingPlayBtn) {
        floatingPlayBtn.addEventListener('click', togglePlayPause);
    }

    if (floatingVolumeBtn) {
        floatingVolumeBtn.addEventListener('click', toggleVolume);
    }

    if (floatingCloseBtn) {
        floatingCloseBtn.addEventListener('click', () => {
            // Detener la música antes de cerrar
            const floatingAudioPlayer = floatingPlayer.querySelector('#floatingAudioPlayer');
            if (floatingAudioPlayer) {
                floatingAudioPlayer.pause();
                localStorage.setItem('radioWasPlaying', 'false');
            }
            
            // Ocultar el reproductor flotante
            floatingPlayer.style.display = 'none';
            localStorage.setItem('floatingPlayerVisible', 'false');
            
            // Reanudar la radio principal si estamos en ja-live.html
            if (window.location.pathname.includes('ja-live.html') && audioPlayer) {
                audioPlayer.play();
            }
        });
    }

    // Configurar el audio flotante
    const floatingAudioPlayer = floatingPlayer.querySelector('#floatingAudioPlayer');
    if (floatingAudioPlayer) {
        floatingAudioPlayer.crossOrigin = 'anonymous';
        floatingAudioPlayer.preload = 'metadata';
        floatingAudioPlayer.src = 'https://stream.zeno.fm/hx2n86ucgabuv'; // Fuente de la radio
        floatingAudioPlayer.addEventListener('play', onPlay);
        floatingAudioPlayer.addEventListener('pause', onPause);
        floatingAudioPlayer.addEventListener('ended', onEnded);
        floatingAudioPlayer.addEventListener('error', onError);
        floatingAudioPlayer.addEventListener('loadstart', onLoadStart);
        floatingAudioPlayer.addEventListener('canplay', onCanPlay);

        // Cargar volumen guardado o establecer volumen inicial
        const savedVolume = localStorage.getItem('jaGamesVolume');
        if (savedVolume) {
            floatingAudioPlayer.volume = savedVolume / 100;
        } else {
            floatingAudioPlayer.volume = 0.5; // Volumen por defecto
        }
        updateVolumeIndicator(floatingAudioPlayer); // Actualizar indicador visual
        
        // Event listener para el control de volumen del reproductor flotante
        const floatingVolumeSlider = floatingPlayer.querySelector('.floating-volume-slider');
        if (floatingVolumeSlider) {
            floatingVolumeSlider.value = floatingAudioPlayer.volume * 100;
            floatingVolumeSlider.addEventListener('input', function() {
                const volume = this.value / 100;
                floatingAudioPlayer.volume = volume;
                localStorage.setItem('jaGamesVolume', this.value);
                updateVolumeIndicator(floatingAudioPlayer);
            });
        }
    }
}

function toggleVolume() {
    const floatingAudioPlayer = floatingPlayer.querySelector('#floatingAudioPlayer');
    if (!floatingAudioPlayer) return;

    if (floatingAudioPlayer.volume === 0) {
        floatingAudioPlayer.volume = 0.5;
        floatingVolumeBtn.querySelector('i').className = 'fas fa-volume-up';
    } else {
        floatingAudioPlayer.volume = 0;
        floatingVolumeBtn.querySelector('i').className = 'fas fa-volume-mute';
    }
    updateVolumeIndicator(floatingAudioPlayer);
}

function updateVolumeIndicator(audioElement = null) {
    // Actualizar el volumen del reproductor principal si existe
    if (volumeSlider) {
        const volume = audioElement ? audioElement.volume * 100 : volumeSlider.value;

        // Actualizar el color de la barra según el volumen
        let color;
        if (volume == 0) {
            color = '#666';
        } else if (volume < 30) {
            color = '#ff6b6b';
        } else if (volume < 70) {
            color = '#ffa726';
        } else {
            color = '#66bb6a';
        }
        
        // Actualizar el gradiente de la barra
        volumeSlider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${volume}%, var(--dark-border) ${volume}%, var(--dark-border) 100%)`;
    }
    
    // Actualizar el volumen del reproductor flotante si existe
    if (floatingPlayer) {
        const floatingVolumeSlider = floatingPlayer.querySelector('.floating-volume-slider');
        if (floatingVolumeSlider) {
            const volume = audioElement ? audioElement.volume * 100 : floatingVolumeSlider.value;

            // Actualizar el color de la barra según el volumen
            let color;
            if (volume == 0) {
                color = '#666';
            } else if (volume < 30) {
                color = '#ff6b6b';
            } else if (volume < 70) {
                color = '#ffa726';
            } else {
                color = '#66bb6a';
            }
            
            // Actualizar el gradiente de la barra
            floatingVolumeSlider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${volume}%, var(--dark-border) ${volume}%, var(--dark-border) 100%)`;
        }
    }
}

function checkGlobalPlayerState() {
    const currentSrc = audioPlayer ? audioPlayer.src : '';
    const floatingSrc = floatingPlayer ? floatingPlayer.querySelector('#floatingAudioPlayer').src : '';

    if (currentSrc && floatingSrc && currentSrc === floatingSrc) {
        // Si la fuente del audioPlayer y el floatingAudioPlayer son la misma,
        // significa que la música está reproduciéndose en el reproductor flotante.
        // Pausar el audioPlayer principal y actualizar el botón de play.
        if (audioPlayer) {
            audioPlayer.pause();
        }
        isPlaying = false;
        updatePlayButton(false);
        updateStatus('Pausado', 'paused');
        updateAudioVisualizer(false);
        updateTitle('JA GAMES Radio'); // Actualizar el título en el reproductor flotante
    }
}

// Función para agregar botón flotante de radio en todas las páginas
function addFloatingRadioButton() {
    // Solo agregar si no estamos en ja-live.html
    if (window.location.pathname.includes('ja-live.html')) {
        return;
    }
    
    // Crear botón flotante
    const floatingRadioBtn = document.createElement('div');
    floatingRadioBtn.className = 'floating-radio-btn';
    floatingRadioBtn.innerHTML = `
        <i class="fas fa-broadcast-tower"></i>
        <span>Radio</span>
    `;
    
    // Event listener para iniciar radio
    floatingRadioBtn.addEventListener('click', function() {
        const floatingAudioPlayer = floatingPlayer.querySelector('#floatingAudioPlayer');
        if (floatingAudioPlayer && floatingAudioPlayer.paused) {
            floatingAudioPlayer.play();
            floatingPlayer.style.display = 'block';
            localStorage.setItem('floatingPlayerVisible', 'true');
            showNotification('Radio iniciada en reproductor flotante', 'success');
        } else if (floatingAudioPlayer && !floatingAudioPlayer.paused) {
            // Si ya está reproduciendo, solo mostrar el reproductor
            floatingPlayer.style.display = 'block';
            localStorage.setItem('floatingPlayerVisible', 'true');
        }
    });
    
    // Verificar si la música estaba reproduciéndose antes
    const wasPlaying = localStorage.getItem('radioWasPlaying') === 'true';
    const wasVisible = localStorage.getItem('floatingPlayerVisible') === 'true';
    
    if (wasPlaying || wasVisible) {
        // Si la música estaba reproduciéndose o el reproductor estaba visible, mostrarlo
        setTimeout(() => {
            const floatingAudioPlayer = floatingPlayer.querySelector('#floatingAudioPlayer');
            if (floatingAudioPlayer) {
                floatingPlayer.style.display = 'block';
                
                // Si la música estaba reproduciéndose, reanudarla
                if (wasPlaying && floatingAudioPlayer.paused) {
                    floatingAudioPlayer.play().catch(error => {
                        console.error('Error al reanudar la música:', error);
                    });
                }
            }
        }, 500);
    }
    
    document.body.appendChild(floatingRadioBtn);
}

// Función para verificar si el reproductor flotante debe estar visible
function checkFloatingPlayerVisibility() {
    // Solo verificar si no estamos en ja-live.html
    if (window.location.pathname.includes('ja-live.html')) {
        console.log('📻 En JA LIVE, no verificando reproductor flotante');
        return;
    }
    
    const wasPlaying = localStorage.getItem('radioWasPlaying') === 'true';
    const wasVisible = localStorage.getItem('floatingPlayerVisible') === 'true';
    
    console.log('🔍 Verificando visibilidad del reproductor flotante:', { wasPlaying, wasVisible });
    
    if (wasPlaying || wasVisible) {
        console.log('🎵 Mostrando reproductor flotante...');
        // Si la música estaba reproduciéndose o el reproductor estaba visible, mostrarlo
        setTimeout(() => {
            if (floatingPlayer) {
                floatingPlayer.style.display = 'block';
                console.log('✅ Reproductor flotante mostrado');
                
                // Si la música estaba reproduciéndose, reanudarla
                if (wasPlaying) {
                    const floatingAudioPlayer = floatingPlayer.querySelector('#floatingAudioPlayer');
                    if (floatingAudioPlayer && floatingAudioPlayer.paused) {
                        console.log('▶️ Reanudando música...');
                        floatingAudioPlayer.play().catch(error => {
                            console.error('❌ Error al reanudar la música:', error);
                        });
                    }
                }
            } else {
                console.error('❌ Reproductor flotante no encontrado');
            }
        }, 300);
    } else {
        console.log('🔇 No hay música reproduciéndose, reproductor flotante oculto');
    }
}
