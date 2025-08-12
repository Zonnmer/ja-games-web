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

        // Group by category
        const groupedData = this.groupByCategory(data);
        
        // Clear existing content
        container.innerHTML = '';
        
        // Render each category
        Object.keys(groupedData).forEach(category => {
            const categorySection = this.createCategorySection(category, groupedData[category]);
            container.appendChild(categorySection);
        });
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
        
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = category;
        
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
        
        // Use placeholder image if no image is provided
        const imgSrc = item.imagen_base ? `../media/${this.currentPage}/images/${item.imagen_base}` : 'https://via.placeholder.com/300x200/ff6b35/ffffff?text=JA+GAMES';
        
        image.innerHTML = `
            <img src="${imgSrc}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/300x200/ff6b35/ffffff?text=JA+GAMES'">
        `;
        
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

