// Internationalization (i18n) System for JA GAMES
// Handles multiple language support

class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'es';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.updatePageLanguage();
    }

    getStoredLanguage() {
        return localStorage.getItem('ja-games-language') || 'es';
    }

    setStoredLanguage(lang) {
        localStorage.setItem('ja-games-language', lang);
    }

    async loadTranslations() {
        try {
            const response = await fetch(`../locales/${this.currentLanguage}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${this.currentLanguage}`);
            }
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to Spanish if translation fails
            if (this.currentLanguage !== 'es') {
                this.currentLanguage = 'es';
                await this.loadTranslations();
            }
        }
    }

    async changeLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        this.currentLanguage = lang;
        this.setStoredLanguage(lang);
        await this.loadTranslations();
        this.updatePageLanguage();
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key; // Return the key if translation not found
            }
        }
        
        return value || key;
    }

    updatePageLanguage() {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update page title
        const pageTitle = this.getPageTitle();
        if (pageTitle) {
            document.title = pageTitle;
        }

        // Update meta description
        const metaDescription = this.getMetaDescription();
        if (metaDescription) {
            const meta = document.querySelector('meta[name="description"]');
            if (meta) {
                meta.setAttribute('content', metaDescription);
            }
        }
    }

    getPageTitle() {
        const path = window.location.pathname;
        if (path.includes('eventos.html')) {
            return `${this.t('nav.events')} - ${this.t('hero.title')}`;
        } else if (path.includes('juegos.html') || path.includes('games.html')) {
            return `${this.t('nav.games')} - ${this.t('hero.title')}`;
        } else if (path.includes('productos.html') || path.includes('products.html')) {
            return `${this.t('nav.products')} - ${this.t('hero.title')}`;
        } else if (path.includes('informacion.html') || path.includes('information.html')) {
            return `${this.t('nav.information')} - ${this.t('hero.title')}`;
        } else if (path.includes('ja-live.html')) {
            return `${this.t('nav.ja_live')} - ${this.t('hero.title')}`;
        } else {
            return this.t('hero.title');
        }
    }

    getMetaDescription() {
        const path = window.location.pathname;
        if (path.includes('eventos.html')) {
            return this.t('hero.events_subtitle');
        } else if (path.includes('juegos.html') || path.includes('games.html')) {
            return this.t('hero.games_subtitle');
        } else if (path.includes('productos.html') || path.includes('products.html')) {
            return this.t('hero.products_subtitle');
        } else if (path.includes('informacion.html') || path.includes('information.html')) {
            return this.t('hero.information_subtitle');
        } else {
            return this.t('hero.subtitle');
        }
    }

    createLanguageSelector() {
        const selector = document.createElement('div');
        selector.className = 'language-selector';
        selector.innerHTML = `
            <div class="language-dropdown">
                <button class="language-btn" id="languageBtn">
                    <span class="flag">${this.getFlag(this.currentLanguage)}</span>
                    <span class="lang-name">${this.getLanguageName(this.currentLanguage)}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="language-options" id="languageOptions">
                    <div class="language-option" data-lang="es">
                        <span class="flag">🇪🇸</span>
                        <span class="lang-name">Español</span>
                    </div>
                    <div class="language-option" data-lang="en">
                        <span class="flag">🇺🇸</span>
                        <span class="lang-name">English</span>
                    </div>
                    <div class="language-option" data-lang="pt">
                        <span class="flag">🇧🇷</span>
                        <span class="lang-name">Português</span>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const btn = selector.querySelector('#languageBtn');
        const options = selector.querySelector('#languageOptions');
        const langOptions = selector.querySelectorAll('.language-option');

        btn.addEventListener('click', () => {
            options.classList.toggle('show');
        });

        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.changeLanguage(lang);
                options.classList.remove('show');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!selector.contains(e.target)) {
                options.classList.remove('show');
            }
        });

        return selector;
    }

    getFlag(lang) {
        const flags = {
            'es': '🇪🇸',
            'en': '🇺🇸',
            'pt': '🇧🇷'
        };
        return flags[lang] || '🌐';
    }

    getLanguageName(lang) {
        const names = {
            'es': 'Español',
            'en': 'English',
            'pt': 'Português'
        };
        return names[lang] || 'Unknown';
    }
}

// Initialize i18n when DOM is ready
let i18n;
document.addEventListener('DOMContentLoaded', () => {
    i18n = new I18n();
});

// Export for use in other scripts
window.i18n = i18n;
