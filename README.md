# JA GAMES Web

Sitio web dinámico para JA GAMES con sistema de gestión de contenido automático.

## 📁 Estructura del Proyecto

```
JA GAMES Web/
├── pages/           # Páginas HTML
│   ├── eventos.html
│   ├── juegos.html
│   ├── productos.html
│   ├── informacion.html
│   └── ja-live.html
├── media/           # Gestión de contenido
│   ├── juegos/
│   │   ├── data.json
│   │   └── images/
│   └── productos/
│       ├── data.json
│       └── images/
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── content-loader.js
└── index.html
```

## 🎯 Sistema de Gestión de Contenido

### **Cómo Agregar Nuevos Juegos:**

1. **Edita el archivo**: `media/juegos/data.json`
2. **Agrega una nueva entrada**:
```json
{
  "categoria": "UMF",
  "nombre": "Nuevo Juego UMF",
  "imagen": "nuevo-juego.jpg",
  "link": "https://example.com/nuevo-juego"
}
```

3. **Coloca la imagen** en `media/juegos/images/nuevo-juego.jpg`

### **Cómo Agregar Nuevos Productos:**

1. **Edita el archivo**: `media/productos/data.json`
2. **Agrega una nueva entrada**:
```json
{
  "categoria": "Merchandise",
  "nombre": "Nuevo Producto",
  "imagen": "nuevo-producto.jpg",
  "link": "https://example.com/descargar"
}
```

3. **Coloca la imagen** en `media/productos/images/nuevo-producto.jpg`

## 📋 Categorías Disponibles

### **Juegos:**
- `UMF` - Ultra Music Festival
- `Ultra` - Ultra Music Festival
- `EDC` - Electric Daisy Carnival
- `Variados` - Otros juegos

### **Productos:**
- `Merchandise` - Ropa y accesorios
- `Accesorios` - Accesorios varios
- `Digital` - Contenido digital

## 🖼️ Gestión de Imágenes

### **Especificaciones:**
- **Formato**: JPG, PNG, WebP
- **Tamaño recomendado**: 300x200 píxeles
- **Ubicación**: `media/[seccion]/images/`

### **Ejemplo de Discord:**
1. **Descarga la imagen** de Discord
2. **Renómbrala** (ej: `mi-juego.jpg`)
3. **Colócala** en la carpeta correspondiente
4. **Actualiza** el `data.json` con el nombre del archivo

## 🔧 Funcionalidades

### **Sistema Automático:**
- ✅ **Carga dinámica** desde archivos JSON
- ✅ **Agrupación por categorías**
- ✅ **Imágenes automáticas**
- ✅ **Enlaces funcionales**
- ✅ **Diseño responsive**

### **Radio 24/7:**
- ✅ **Stream en vivo** desde Zeno.fm
- ✅ **Reproductor flotante** entre páginas
- ✅ **Controles de volumen**
- ✅ **Visualizador de audio**

### **Navegación:**
- ✅ **Páginas separadas** por sección
- ✅ **Enlaces actualizados**
- ✅ **Diseño consistente**

## 🚀 Cómo Usar

### **1. Iniciar el Servidor:**
```bash
python -m http.server 8000
```

### **2. Abrir el Sitio:**
```
http://localhost:8000
```

### **3. Navegar:**
- **Inicio**: Vista general
- **Juegos**: Contenido dinámico desde JSON
- **Productos**: Contenido dinámico desde JSON
- **JA LIVE**: Radio 24/7

## 📝 Ejemplo de Agregar Contenido

### **Paso 1: Preparar la imagen**
```
media/juegos/images/mi-nuevo-juego.jpg
```

### **Paso 2: Editar data.json**
```json
[
  {
    "categoria": "UMF",
    "nombre": "Mi Nuevo Juego",
    "imagen": "mi-nuevo-juego.jpg",
    "link": "https://example.com/jugar"
  }
]
```

### **Paso 3: ¡Listo!**
El contenido aparecerá automáticamente en la página de juegos.

## 🎨 Personalización

### **Colores del Tema:**
- **Rojo**: `#e63946`
- **Naranja**: `#ff6b35`
- **Amarillo**: `#ffc107`

### **Modo Oscuro:**
El sitio incluye un tema oscuro automático que mantiene los colores principales.

## 🔗 Enlaces Importantes

- **Radio Stream**: `https://stream.zeno.fm/hx2n86ucgabuv`
- **API de Metadatos**: `https://api.zeno.fm/station/hx2n86ucgabuv`

## 📱 Responsive Design

El sitio es completamente responsive y funciona en:
- 📱 **Móviles**
- 📱 **Tablets**
- 💻 **Desktop**

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript** - Interactividad
- **JSON** - Gestión de datos
- **Font Awesome** - Iconos

---

**¡El sistema está listo para usar! Solo agrega contenido a los archivos JSON y las imágenes correspondientes.**
