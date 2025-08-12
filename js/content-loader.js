// Content Loader for JA GAMES
// Handles dynamic loading of games, products, and events from JSON files

class ContentLoader {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('juegos.html')) return 'juegos';
        if (path.includes('productos.html')) return 'productos';
        if (path.includes('eventos.html')) return 'eventos';
        if (path.includes('empleados.html')) return 'empleados';
        if (path.includes('informacion.html')) return 'empleados'; // Cargar empleados en información
        return null;
    }

    async init() {
        if (this.currentPage) {
            await this.loadContent();
        }
    }

    async loadContent() {
        try {
            const dataPath = `../media/${this.currentPage}/data.json`;
            const response = await fetch(dataPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.renderContent(data);
            
        } catch (error) {
            console.error('Error loading content:', error);
            this.showError();
        }
    }

    renderContent(data) {
        const container = this.getContainer();
        if (!container) return;

        // Handle different data structures
        let items;
        if (this.currentPage === 'empleados' && data.empleados) {
            items = data.empleados;
        } else if (Array.isArray(data)) {
            items = data;
        } else {
            console.error('Invalid data structure:', data);
            this.showError();
            return;
        }

        // Clear existing content
        container.innerHTML = '';
        
        // Create single grid for all employees (like in first image)
        const grid = document.createElement('div');
        grid.className = 'content-grid';
        
        items.forEach(item => {
            const card = this.createItemCard(item);
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
    }

    groupByCategory(data) {
        const grouped = {};
        data.forEach(item => {
            if (!grouped[item.categoria]) {
                grouped[item.categoria] = [];
            }
            grouped[item.categoria].push(item);
        });
        return grouped;
    }

    createCategorySection(category, items) {
        const section = document.createElement('div');
        section.className = 'category-section';
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.innerHTML = `<i class="${this.getCategoryIcon(category)}"></i> ${category}`;
        
        const grid = document.createElement('div');
        grid.className = 'content-grid';
        
        items.forEach(item => {
            const card = this.createItemCard(item);
            grid.appendChild(card);
        });
        
        section.appendChild(title);
        section.appendChild(grid);
        
        return section;
    }

    createItemCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        
        const image = document.createElement('div');
        image.className = 'content-image';
        
        // Use different image paths for employees vs other content
        let imgSrc;
        if (this.currentPage === 'empleados' || (this.currentPage === 'empleados' && window.location.pathname.includes('informacion.html'))) {
            // For employees, check if foto is a URL (starts with http) or a local file
            if (item.foto && item.foto.startsWith('http')) {
                imgSrc = item.foto; // Use Discord URL directly
            } else {
                imgSrc = item.foto ? `../media/empleados/images/${item.foto}` : '';
            }
        } else {
            imgSrc = item.imagen_base ? `../media/${this.currentPage}/images/${item.imagen_base}` : 'https://via.placeholder.com/300x200/ff6b35/ffffff?text=JA+GAMES';
        }
        
        // Para empleados, usar avatar circular
        if (this.currentPage === 'empleados' || (this.currentPage === 'empleados' && window.location.pathname.includes('informacion.html'))) {
            if (imgSrc && imgSrc.startsWith('http')) {
                image.innerHTML = `<img src="${imgSrc}" alt="${item.nombre}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-user\\'></i>'">`;
            } else {
                image.innerHTML = '<i class="fas fa-user"></i>';
            }
        } else {
            image.innerHTML = `<img src="${imgSrc}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/300x200/ff6b35/ffffff?text=JA+GAMES'">`;
        }
        
        const content = document.createElement('div');
        content.className = 'content-info';
        
        // Render content based on page type
        content.innerHTML = this.renderContentInfo(item);
        
        card.appendChild(image);
        card.appendChild(content);
        
        return card;
    }

    renderContentInfo(item) {
        switch (this.currentPage) {
            case 'juegos':
                return this.renderGameInfo(item);
            case 'productos':
                return this.renderProductInfo(item);
            case 'eventos':
                return this.renderEventInfo(item);
            case 'empleados':
                return this.renderEmployeeInfo(item);
            default:
                return this.renderDefaultInfo(item);
        }
    }

    renderGameInfo(item) {
        return `
            <h3>${item.titulo || item.nombre}</h3>
            <p class="game-description">${item.descripcion || 'Juego emocionante de JA GAMES'}</p>
            <div class="game-details">
                <span class="game-category-tag">${item.categoria}</span>
            </div>
            <a href="${item.link}" class="btn-primary" target="_blank">
                Jugar Ahora
            </a>
        `;
    }

    renderProductInfo(item) {
        return `
            <h3>${item.titulo || item.nombre}</h3>
            <p class="product-description">${item.descripcion || 'Producto oficial de JA GAMES'}</p>
            <div class="product-details">
                <span class="product-price">${item.precio || 'Consultar'}</span>
                ${item.talla ? `<span class="product-size">Talla: ${item.talla}</span>` : ''}
                ${item.formato ? `<span class="product-format">Formato: ${item.formato}</span>` : ''}
                ${item.resolucion ? `<span class="product-resolution">Resolución: ${item.resolucion}</span>` : ''}
            </div>
            <a href="${item.link}" class="btn-primary" target="_blank">
                ${item.precio === 'Gratis' ? 'Descargar Gratis' : 'Comprar Ahora'}
            </a>
        `;
    }

    renderEventInfo(item) {
        const djSetsHtml = item.dj_sets ? `
            <div class="event-djs">
                <strong>DJ Sets:</strong>
                <ul>
                    ${item.dj_sets.map(dj => `<li>${dj}</li>`).join('')}
                </ul>
            </div>
        ` : '';

        return `
            <h3>${item.titulo || item.nombre}</h3>
            <p class="event-description">${item.descripcion || 'Evento emocionante de JA GAMES'}</p>
            <div class="event-details">
                <span class="event-date"><i class="fas fa-calendar"></i> ${item.fecha || 'Fecha por confirmar'}</span>
            </div>
            ${djSetsHtml}
            <a href="${item.link}" class="btn-primary" target="_blank">
                Ver Detalles
            </a>
        `;
    }

    renderEmployeeInfo(item) {
                        const redesSocialesHtml = item.redes_sociales ? `
                    <div class="employee-social">
                        ${item.redes_sociales.discord ? `<a href="#" class="social-link discord" title="Discord: ${item.redes_sociales.discord}">Discord</a>` : ''}
                        ${item.redes_sociales.instagram ? `<a href="https://instagram.com/${item.redes_sociales.instagram.replace('@', '')}" class="social-link instagram" target="_blank">Instagram</a>` : ''}
                        ${item.redes_sociales.twitter ? `<a href="https://twitter.com/${item.redes_sociales.twitter.replace('@', '')}" class="social-link twitter" target="_blank">Twitter</a>` : ''}
                        ${item.redes_sociales.soundcloud ? `<a href="https://soundcloud.com/${item.redes_sociales.soundcloud}" class="social-link soundcloud" target="_blank">SoundCloud</a>` : ''}
                        ${item.redes_sociales.spotify ? `<a href="https://open.spotify.com/artist/${item.redes_sociales.spotify}" class="social-link spotify" target="_blank">Spotify</a>` : ''}
                        ${item.redes_sociales.behance ? `<a href="https://behance.net/${item.redes_sociales.behance}" class="social-link behance" target="_blank">Behance</a>` : ''}
                        ${item.redes_sociales.github ? `<a href="https://github.com/${item.redes_sociales.github}" class="social-link github" target="_blank">GitHub</a>` : ''}
                        ${item.redes_sociales.linkedin ? `<a href="https://linkedin.com/in/${item.redes_sociales.linkedin}" class="social-link linkedin" target="_blank">LinkedIn</a>` : ''}
                        ${item.redes_sociales.tiktok ? `<a href="https://tiktok.com/@${item.redes_sociales.tiktok.replace('@', '')}" class="social-link tiktok" target="_blank">TikTok</a>` : ''}
                    </div>
                ` : '';

        return `
            <h3>${item.nombre}</h3>
            <div class="employee-position">
                <i class="fas fa-briefcase"></i>
                <span>${item.puesto}</span>
            </div>
            <p class="employee-description">${item.descripcion || 'Miembro del equipo JA GAMES'}</p>
            <div class="employee-category">
                <i class="${this.getCategoryIcon(item.categoria)}"></i>
                <span>${item.categoria}</span>
            </div>
            ${redesSocialesHtml}
        `;
    }

    getCategoryIcon(categoria) {
        const iconos = {
            'Owners': 'fas fa-crown',
            'Devs': 'fas fa-code',
            'Mods': 'fas fa-shield-alt',
            'Staff': 'fas fa-users',
            'Media': 'fas fa-palette'
        };
        return iconos[categoria] || 'fas fa-user';
    }

    renderDefaultInfo(item) {
        return `
            <h3>${item.nombre}</h3>
            <p>Categoría: ${item.categoria}</p>
            <a href="${item.link}" class="btn-primary" target="_blank">
                Ver Más
            </a>
        `;
    }

    getContainer() {
        if (this.currentPage === 'juegos') {
            return document.querySelector('.games-container') || document.querySelector('.content-container');
        } else if (this.currentPage === 'productos') {
            return document.querySelector('.products-container') || document.querySelector('.content-container');
        } else if (this.currentPage === 'eventos') {
            return document.querySelector('.events-container') || document.querySelector('.content-container');
        } else if (this.currentPage === 'empleados') {
            return document.querySelector('.empleados-container') || document.querySelector('.content-container');
        }
        return null;
    }

    showError() {
        const container = this.getContainer();
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error al cargar el contenido</h3>
                    <p>No se pudo cargar el contenido. Por favor, intenta de nuevo más tarde.</p>
                </div>
            `;
        }
    }
}

// Initialize content loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContentLoader();
});

