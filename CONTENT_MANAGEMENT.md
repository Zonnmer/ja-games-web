# Sistema de Gestión de Contenido - JA GAMES

Este documento explica cómo gestionar el contenido dinámico de la web de JA GAMES.

## 📁 Estructura de Archivos

```
media/
├── juegos/
│   ├── data.json
│   └── images/
├── productos/
│   ├── data.json
│   └── images/
├── eventos/
│   ├── data.json
│   └── images/
└── empleados/
    ├── data.json
    └── images/
```

## 🎮 Gestión de Juegos

### Archivo: `media/juegos/data.json`

```json
{
  "juegos": [
    {
      "nombre": "UMF 2024",
      "imagen_base": "umf2024.png",
      "descripcion": "Juego oficial del Ultra Music Festival 2024",
      "categoria": "Festival",
      "link": "https://ejemplo.com/juego-umf"
    }
  ]
}
```

### Campos Requeridos:
- **nombre**: Título del juego
- **imagen_base**: Nombre del archivo de imagen (con extensión)
- **descripcion**: Descripción del juego
- **categoria**: Categoría del juego
- **link**: URL del juego

## 🛍️ Gestión de Productos

### Archivo: `media/productos/data.json`

```json
{
  "productos": [
    {
      "nombre": "Camiseta JA GAMES",
      "imagen_base": "tshirt.jpg",
      "descripcion": "Camiseta oficial de JA GAMES",
      "precio": "$25.00",
      "talla": "M",
      "link": "https://ejemplo.com/producto"
    }
  ]
}
```

### Campos Requeridos:
- **nombre**: Nombre del producto
- **imagen_base**: Nombre del archivo de imagen
- **descripcion**: Descripción del producto
- **precio**: Precio del producto
- **link**: URL de compra

### Campos Opcionales:
- **talla**: Talla del producto
- **formato**: Formato (para productos digitales)
- **resolucion**: Resolución (para wallpapers, etc.)

## 🎉 Gestión de Eventos

### Archivo: `media/eventos/data.json`

```json
{
  "eventos": [
    {
      "nombre": "Mysteral Black",
      "imagen_base": "MysteralBlack.png",
      "descripcion": "Evento nocturno de música electrónica",
      "fecha": "15 de Diciembre, 2024",
      "link": "https://ejemplo.com/evento",
      "dj_sets": ["DJ Alex", "DJ Maria", "DJ Carlos"]
    }
  ]
}
```

### Campos Requeridos:
- **nombre**: Nombre del evento
- **imagen_base**: Nombre del archivo de imagen
- **descripcion**: Descripción del evento
- **fecha**: Fecha del evento
- **link**: URL del evento

### Campos Opcionales:
- **dj_sets**: Array con nombres de DJs

## 👥 Gestión de Empleados

### Archivo: `media/empleados/data.json`

```json
{
  "empleados": [
    {
      "nombre": "Juan Andrés",
      "foto": "https://cdn.discordapp.com/avatars/123456789/abc123.png",
      "puesto": "Fundador & CEO",
      "descripcion": "Fundador de JA GAMES, apasionado por la música electrónica",
      "categoria": "Directivos",
      "discord": "juan_andres#1234",
      "redes_sociales": {
        "discord": "juan_andres#1234",
        "instagram": "@juanandres_ja",
        "twitter": "@juanandres_ja",
        "soundcloud": "juanandres_music",
        "spotify": "juanandres_official",
        "behance": "juanandres_design",
        "github": "juanandres_dev",
        "linkedin": "juanandres-professional",
        "tiktok": "@juanandres_ja"
      }
    }
  ],
  "categorias": {
    "Directivos": {
      "descripcion": "Líderes y fundadores de JA GAMES",
      "color": "#dc2626",
      "icono": "fas fa-crown"
    },
    "Eventos": {
      "descripcion": "Especialistas en organización y gestión de eventos",
      "color": "#ea580c",
      "icono": "fas fa-calendar-alt"
    },
    "DJs": {
      "descripcion": "Artistas y DJs residentes de JA GAMES",
      "color": "#d97706",
      "icono": "fas fa-music"
    },
    "Diseño": {
      "descripcion": "Equipo creativo y de diseño visual",
      "color": "#059669",
      "icono": "fas fa-palette"
    },
    "Producción": {
      "descripcion": "Especialistas en producción musical y audio",
      "color": "#7c3aed",
      "icono": "fas fa-microphone"
    },
    "Marketing": {
      "descripcion": "Equipo de marketing y redes sociales",
      "color": "#0891b2",
      "icono": "fas fa-bullhorn"
    },
    "Tecnología": {
      "descripcion": "Desarrolladores y equipo técnico",
      "color": "#0ea5e9",
      "icono": "fas fa-code"
    },
    "Comunidad": {
      "descripcion": "Gestores de comunidad y relaciones",
      "color": "#ec4899",
      "icono": "fas fa-users"
    }
  }
}
```

### Campos Requeridos:
- **nombre**: Nombre completo del empleado
- **foto**: URL de Discord o nombre de archivo local
- **puesto**: Cargo en la empresa
- **descripcion**: Descripción del empleado
- **categoria**: Categoría del empleado (debe coincidir con las definidas)

### Campos Opcionales:
- **discord**: Username de Discord
- **redes_sociales**: Objeto con enlaces a redes sociales

### Tipos de Foto:
1. **URL de Discord**: `https://cdn.discordapp.com/avatars/USER_ID/AVATAR_ID.png`
2. **Archivo local**: `nombre-imagen.jpg` (se guarda en `media/empleados/images/`)

### Redes Sociales Soportadas:
- **discord**: Username de Discord (se muestra como tooltip)
- **instagram**: Username de Instagram
- **twitter**: Username de Twitter
- **soundcloud**: Username de SoundCloud
- **spotify**: Artist ID de Spotify
- **behance**: Username de Behance
- **github**: Username de GitHub
- **linkedin**: Username de LinkedIn
- **tiktok**: Username de TikTok

## 🖼️ Gestión de Imágenes

### Ubicación de Imágenes:
- **Juegos**: `media/juegos/images/`
- **Productos**: `media/productos/images/`
- **Eventos**: `media/eventos/images/`
- **Empleados**: `media/empleados/images/` (solo para archivos locales)

### Formatos Soportados:
- JPG, JPEG
- PNG
- GIF
- WebP

### Tamaños Recomendados:
- **Juegos/Productos/Eventos**: 400x300px
- **Empleados**: 300x300px (cuadradas)

## 🔧 Cómo Agregar Nuevo Contenido

### 1. Agregar Imagen
1. Sube la imagen a la carpeta correspondiente
2. Anota el nombre exacto del archivo

### 2. Actualizar JSON
1. Abre el archivo `data.json` correspondiente
2. Agrega una nueva entrada siguiendo la estructura
3. Usa el nombre exacto de la imagen en `imagen_base` o `foto`

### 3. Verificar
1. Guarda el archivo JSON
2. Recarga la página correspondiente
3. Verifica que el contenido aparezca correctamente

## 📱 Características Especiales

### Empleados con URLs de Discord
- Las fotos de Discord se cargan directamente desde la URL
- No necesitas descargar las imágenes
- Se actualizan automáticamente cuando cambias el avatar en Discord

### Categorías de Empleados
- Cada categoría tiene su propio color e icono
- Los empleados se agrupan automáticamente por categoría
- Las categorías se pueden personalizar en el JSON

### Redes Sociales
- Los iconos se muestran automáticamente según la red social
- Los enlaces se abren en nuevas pestañas
- Discord muestra el username como tooltip

## 🚨 Notas Importantes

1. **Nombres de archivos**: Usa nombres sin espacios, preferiblemente en minúsculas
2. **Extensiones**: Incluye siempre la extensión del archivo (.jpg, .png, etc.)
3. **URLs de Discord**: Asegúrate de que la URL sea válida y accesible
4. **Categorías**: Las categorías de empleados deben coincidir exactamente con las definidas
5. **Backup**: Haz backup de los archivos JSON antes de hacer cambios importantes

## 🔄 Actualización Automática

El contenido se actualiza automáticamente cuando:
- Cambias el archivo JSON
- Recargas la página
- No necesitas reiniciar el servidor

## 📞 Soporte

Si tienes problemas con el sistema de contenido:
1. Verifica que los nombres de archivos coincidan exactamente
2. Revisa la sintaxis JSON (usa un validador online)
3. Verifica que las URLs sean accesibles
4. Revisa la consola del navegador para errores
