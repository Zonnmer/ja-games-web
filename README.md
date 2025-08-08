# JA GAMES - Portal de Entretenimiento

## Descripción
JA GAMES es un portal web moderno y dinámico que ofrece una experiencia completa de entretenimiento con eventos, juegos, productos y radio en vivo.

## Características

### 🎵 Eventos
- Sección dedicada a eventos con DJ Sets
- Diseño atractivo con tarjetas interactivas
- Enlaces a sets de música y información adicional

### 🎮 Juegos
- Categorías organizadas: UMF, Ultra, EDC, Variados
- Enlaces directos a juegos
- Interfaz intuitiva y fácil navegación

### 📦 Productos
- Sección de descargas de productos
- Botones de descarga funcionales
- Notificaciones de estado de descarga

### ℹ️ Información
- Información sobre JA GAMES
- Enlaces útiles y políticas
- Sección de contacto

### 🎧 JA LIVE
- **Radio 24/7** con stream en vivo desde Zeno.fm
- Reproductor integrado con controles
- Enlaces adicionales para contenido en vivo
- Estado de conexión en tiempo real

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño moderno con gradientes y animaciones
- **JavaScript**: Funcionalidades interactivas y reproductor de radio
- **Font Awesome**: Iconos profesionales
- **Responsive Design**: Compatible con todos los dispositivos

## Colores del Tema

- **Rojo**: `#ff3333` - Color principal
- **Naranja**: `#ff6600` - Color secundario
- **Amarillo**: `#ffcc00` - Color de acento

## Estructura del Proyecto

```
JA GAMES Web/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── main.js         # Funcionalidades JavaScript
└── README.md           # Documentación
```

## Funcionalidades Principales

### Reproductor de Radio
- Stream en vivo desde `https://stream.zeno.fm/hx2n86ucgabuv`
- Controles de play/pause
- Indicadores de estado (cargando, reproduciendo, error)
- Manejo de errores de conexión

### Navegación
- Header fijo con navegación suave
- Scroll automático a secciones
- Animaciones al hacer scroll

### Interactividad
- Efectos hover en tarjetas
- Notificaciones de estado
- Contador de visitantes
- Manejo de eventos de red

## Cómo Usar

1. Abre `index.html` en tu navegador web
2. Navega por las diferentes secciones usando el menú superior
3. En la sección JA LIVE, haz clic en el botón de play para escuchar la radio
4. Explora los eventos, juegos y productos disponibles

## Características Responsivas

- Diseño adaptable a móviles, tablets y desktop
- Menú responsive que se adapta a pantallas pequeñas
- Grid layouts que se reorganizan automáticamente
- Botones y controles optimizados para touch

## Compatibilidad

- Chrome (recomendado)
- Firefox
- Safari
- Edge
- Navegadores móviles

## Personalización

### Cambiar Colores
Los colores se pueden modificar fácilmente editando las variables CSS en `css/styles.css`:

```css
:root {
    --primary-red: #ff3333;
    --primary-orange: #ff6600;
    --primary-yellow: #ffcc00;
    /* ... más colores */
}
```

### Agregar Contenido
- **Eventos**: Edita la sección de eventos en `index.html`
- **Juegos**: Modifica las categorías y enlaces en la sección de juegos
- **Productos**: Agrega nuevos productos en la sección correspondiente
- **Radio**: Cambia el stream URL en el elemento `<audio>` de JA LIVE

## Notas Técnicas

- El reproductor de radio requiere conexión a internet
- Las notificaciones se muestran en la esquina superior derecha
- El contador de visitantes se almacena en localStorage
- Las animaciones utilizan CSS transitions y JavaScript Intersection Observer

## Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de JA GAMES.

---

**JA GAMES** - Tu Portal de Entretenimiento Definitivo 🎮🎵
