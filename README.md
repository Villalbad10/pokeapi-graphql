# Pokédex GraphQL

Una aplicación React que consume la API de Pokémon usando GraphQL para mostrar una lista de todos los Pokémon ordenados alfabéticamente, con funcionalidad de favoritos y detalles completos.

## Características

- 📱 **Lista de Pokémon**: Muestra todos los Pokémon ordenados alfabéticamente
- ❤️ **Sistema de Favoritos**: Agrega y quita Pokémon de tu lista de favoritos
- 🔍 **Detalles Completos**: Vista detallada con nombre, tipo, imagen, generación, peso y altura
- 🎨 **Interfaz Moderna**: Diseño responsivo y atractivo
- 💾 **Persistencia**: Los favoritos se guardan en localStorage
- 📱 **Completamente Responsive**: Optimizado para móviles, tablets y desktop
- 🎯 **Touch-Friendly**: Interacciones optimizadas para dispositivos táctiles
- ♿ **Accesible**: Cumple con estándares de accesibilidad web

## Tecnologías Utilizadas

- **React 18** - Framework de interfaz de usuario
- **Apollo Client** - Cliente GraphQL
- **GraphQL** - Lenguaje de consulta para APIs
- **Vite** - Herramienta de construcción
- **CSS3** - Estilos personalizados con gradientes y animaciones

## API Utilizada

- **Pokemon GraphQL API**: https://beta.pokeapi.co/graphql/v1beta

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## Funcionalidades

### Lista de Pokémon
- Carga automática de todos los Pokémon desde la API
- Ordenamiento alfabético y por número
- Vista en tarjetas con imagen, nombre, tipos y número
- Indicador de favoritos
- Búsqueda en tiempo real
- Filtrado por tipo

### Sistema de Favoritos
- Agregar/quitar Pokémon de favoritos con un clic
- Persistencia en localStorage
- Modal dedicado para ver todos los favoritos
- Contador de favoritos en la interfaz
- Eliminación desde el modal de favoritos

### Detalles del Pokémon
- Modal con información completa y diseño dinámico
- Colores que cambian según el tipo del Pokémon
- Imagen del Pokémon (priorizando dream_world)
- Tipos con colores distintivos
- Información básica (número, generación, altura, peso)
- Estadísticas base con barras de progreso
- Botón de favoritos integrado

### Sistema de Colores Dinámico
- 18 tipos de Pokémon con paletas de colores completas
- Colores que se adaptan automáticamente al tipo principal
- Header, imagen y elementos con colores temáticos
- Fallback a colores por defecto si no se encuentra el tipo

### Interfaz de Usuario
- Header con distribución homogénea
- Barra de búsqueda con icono
- Botón de ordenamiento dinámico (A/#)
- Botón de favoritos en el header
- Modales responsivos y accesibles

### Diseño Responsive
- **Mobile First**: Diseñado primero para móviles
- **Breakpoints**: Optimizado para pantallas desde 320px hasta 1920px+
- **Orientación**: Adaptación automática a landscape/portrait
- **Touch**: Botones y áreas táctiles optimizadas (mínimo 44px)
- **Scroll**: Scrollbars personalizadas y suaves
- **Accesibilidad**: Soporte para lectores de pantalla y navegación por teclado

## Estructura del Proyecto

```
src/
├── components/
│   ├── PokemonList.jsx          # Lista principal de Pokémon
│   ├── PokemonList.css          # Estilos de la lista
│   ├── PokemonCard.jsx          # Tarjeta individual de Pokémon
│   ├── PokemonCard.css          # Estilos de las tarjetas
│   ├── PokemonDetail.jsx        # Modal de detalles con diseño dinámico
│   ├── PokemonDetail.css        # Estilos del modal de detalles
│   ├── SortModal.jsx            # Modal de ordenamiento
│   ├── SortModal.css            # Estilos del modal de ordenamiento
│   ├── FavoritesModal.jsx       # Modal de lista de favoritos
│   └── FavoritesModal.css       # Estilos del modal de favoritos
├── context/
│   └── PokemonFavoritesContext.jsx  # Context para gestión de favoritos
├── graphql/
│   ├── client.js                # Configuración de Apollo Client
│   └── queries.js               # Consultas GraphQL para Pokémon y estadísticas
├── utils/
│   ├── pokemonUtils.js          # Utilidades para procesar datos de Pokémon
│   └── pokemonColors.js         # Sistema de colores dinámico por tipo
├── styles/
│   └── responsive.css           # Estilos responsivos adicionales
├── assets/
│   └── img/
│       ├── search-icon.svg      # Icono de búsqueda
│       └── pokeball-icon.svg    # Icono de Pokéball
├── App.jsx                      # Componente principal con layout
├── App.css                      # Estilos principales de la aplicación
├── index.css                    # Estilos globales
└── main.jsx                     # Punto de entrada de la aplicación
```

## Consultas GraphQL

La aplicación utiliza dos consultas principales:

1. **GET_ALL_POKEMON**: Obtiene la lista completa de Pokémon con información básica
2. **GET_POKEMON_BY_ID**: Obtiene detalles específicos de un Pokémon incluyendo estadísticas base

### Datos Incluidos:
- Información básica (ID, nombre, altura, peso)
- Tipos de Pokémon
- Imágenes (priorizando dream_world)
- Estadísticas base (HP, ATK, DEF, SATK, SDEF, SPD)
- Información de generación

## Personalización

Puedes personalizar fácilmente:
- **Colores de tipos**: Modifica `pokemonColors.js` para cambiar las paletas de colores
- **Estilos generales**: Personaliza `App.css` para el tema principal
- **Componentes**: Edita los archivos CSS individuales de cada componente
- **Consultas GraphQL**: Modifica `queries.js` para agregar más datos
- **Funcionalidad de favoritos**: Personaliza `PokemonFavoritesContext.jsx`
- **Imágenes**: Reemplaza los SVG en `assets/img/` por tus propios iconos
- **Responsive**: Ajusta breakpoints en `responsive.css`