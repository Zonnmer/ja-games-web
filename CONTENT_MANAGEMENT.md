# 🎮 Sistema de Gestión de Contenido - JA GAMES

Este sistema te permite agregar contenido dinámicamente a las secciones de **Juegos**, **Productos** y **Eventos** sin necesidad de tocar el código HTML.

## 📁 Estructura de Archivos

```
media/
├── juegos/
│   ├── data.json          # Datos de juegos
│   └── images/            # Imágenes de juegos
├── productos/
│   ├── data.json          # Datos de productos
│   └── images/            # Imágenes de productos
└── eventos/
    ├── data.json          # Datos de eventos
    └── images/            # Imágenes de eventos
```

## 🎯 Cómo Agregar Contenido

### 1. **Juegos** (`media/juegos/data.json`)

Estructura para cada juego:
```json
{
  "categoria": "UMF",
  "nombre": "Nombre del Juego",
  "logo": "logo-juego.png",
  "imagen_base": "imagen-juego.jpg",
  "link": "https://ejemplo.com/juego",
  "titulo": "Título del Juego",
  "descripcion": "Descripción detallada del juego"
}
```

**Campos:**
- `categoria`: UMF, Ultra, EDC, Variados
- `nombre`: Nombre interno del juego
- `logo`: Archivo de logo (opcional)
- `imagen_base`: Imagen principal del juego
- `link`: URL para jugar
- `titulo`: Título que se muestra
- `descripcion`: Descripción del juego

### 2. **Productos** (`media/productos/data.json`)

Estructura para cada producto:
```json
{
  "categoria": "Merchandise",
  "nombre": "Nombre del Producto",
  "logo": "logo-producto.png",
  "imagen_base": "imagen-producto.jpg",
  "link": "https://ejemplo.com/producto",
  "titulo": "Título del Producto",
  "descripcion": "Descripción del producto",
  "precio": "$25.99",
  "talla": "S, M, L, XL"
}
```

**Campos:**
- `categoria`: Merchandise, Música
- `nombre`: Nombre interno del producto
- `logo`: Archivo de logo (opcional)
- `imagen_base`: Imagen principal del producto
- `link`: URL de compra/descarga
- `titulo`: Título que se muestra
- `descripcion`: Descripción del producto
- `precio`: Precio (o "Gratis")
- `talla`: Tallas disponibles (para ropa)
- `formato`: Formato de archivo (para música)
- `resolucion`: Resolución (para wallpapers)

### 3. **Eventos** (`media/eventos/data.json`)

Estructura para cada evento:
```json
{
  "categoria": "Festivales",
  "nombre": "Nombre del Evento",
  "imagen_base": "imagen-evento.jpg",
  "link": "https://ejemplo.com/evento",
  "titulo": "Título del Evento",
  "descripcion": "Descripción del evento",
  "fecha": "22-24 Marzo 2024",
  "dj_sets": ["DJ 1", "DJ 2", "DJ 3"]
}
```

**Campos:**
- `categoria`: Festivales, Eventos
- `nombre`: Nombre interno del evento
- `imagen_base`: Imagen principal del evento
- `link`: URL del evento
- `titulo`: Título que se muestra
- `descripcion`: Descripción del evento
- `fecha`: Fecha del evento
- `dj_sets`: Array con nombres de DJs

## 🖼️ Gestión de Imágenes

### Ubicación de Imágenes:
- **Juegos**: `media/juegos/images/`
- **Productos**: `media/productos/images/`
- **Eventos**: `media/eventos/images/`

### Formatos Soportados:
- JPG, JPEG
- PNG
- GIF
- WebP

### Tamaños Recomendados:
- **Imágenes principales**: 300x200px
- **Logos**: 100x100px
- **Banners**: 800x400px

## 📝 Ejemplos de Uso

### Agregar un Nuevo Juego:

1. **Agregar imagen** a `media/juegos/images/mi-juego.jpg`
2. **Editar** `media/juegos/data.json`:
```json
{
  "categoria": "UMF",
  "nombre": "Mi Nuevo Juego",
  "imagen_base": "mi-juego.jpg",
  "link": "https://ejemplo.com/mi-juego",
  "titulo": "Mi Juego Increíble",
  "descripcion": "Un juego emocionante de música electrónica"
}
```

### Agregar un Nuevo Producto:

1. **Agregar imagen** a `media/productos/images/mi-producto.jpg`
2. **Editar** `media/productos/data.json`:
```json
{
  "categoria": "Merchandise",
  "nombre": "Mi Producto",
  "imagen_base": "mi-producto.jpg",
  "link": "https://ejemplo.com/mi-producto",
  "titulo": "Mi Producto Oficial",
  "descripcion": "Producto exclusivo de JA GAMES",
  "precio": "$29.99",
  "talla": "S, M, L, XL"
}
```

### Agregar un Nuevo Evento:

1. **Agregar imagen** a `media/eventos/images/mi-evento.jpg`
2. **Editar** `media/eventos/data.json`:
```json
{
  "categoria": "Festivales",
  "nombre": "Mi Festival",
  "imagen_base": "mi-evento.jpg",
  "link": "https://ejemplo.com/mi-evento",
  "titulo": "Mi Festival 2024",
  "descripcion": "El festival más grande del año",
  "fecha": "15-17 Diciembre 2024",
  "dj_sets": ["JA GAMES", "DJ Invitado", "Artista Local"]
}
```

## 🔧 Características del Sistema

### ✅ **Ventajas:**
- **Fácil de usar**: Solo editar archivos JSON
- **Sin código**: No necesitas tocar HTML/CSS/JS
- **Organizado**: Contenido separado por categorías
- **Flexible**: Estructuras específicas para cada tipo
- **Escalable**: Fácil agregar más contenido

### 🎨 **Características Visuales:**
- **Títulos blancos** para mejor contraste
- **Colores oscuros** elegantes
- **Efectos hover** suaves
- **Responsive** en todos los dispositivos
- **Carga dinámica** sin recargar página

### 📱 **Compatibilidad:**
- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, Tablet, Mobile
- **Imágenes**: Placeholder automático si no existe

## 🚀 Cómo Probar

1. **Edita** el archivo JSON correspondiente
2. **Agrega** las imágenes a la carpeta `images/`
3. **Recarga** la página en el navegador
4. **Verifica** que el contenido aparezca correctamente

## ⚠️ Notas Importantes

- **Nombres de archivos**: Usa solo letras, números y guiones
- **URLs**: Asegúrate de que los enlaces funcionen
- **Imágenes**: Optimiza las imágenes para web
- **Backup**: Haz copia de seguridad antes de editar
- **Validación**: Verifica que el JSON sea válido

¡El sistema está listo para usar! 🎮✨
