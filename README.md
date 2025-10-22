# Pokédex GraphQL

Una aplicación React que consume la API de Pokémon usando GraphQL para mostrar una lista de todos los Pokémon ordenados alfabéticamente, con funcionalidad de favoritos y detalles completos.

## Características

- 📱 **Lista de Pokémon**: Muestra todos los Pokémon ordenados alfabéticamente
- ❤️ **Sistema de Favoritos**: Agrega y quita Pokémon de tu lista de favoritos
- 🔍 **Detalles Completos**: Vista detallada con nombre, tipo, imagen, generación, peso y altura
- 🎨 **Interfaz Moderna**: Diseño responsivo y atractivo
- 💾 **Persistencia**: Los favoritos se guardan en localStorage

## Tecnologías Utilizadas

- **React 18** - Framework de interfaz de usuario
- **Apollo Client** - Cliente GraphQL
- **GraphQL** - Lenguaje de consulta para APIs
- **Vite** - Herramienta de construcción
- **CSS3** - Estilos personalizados con gradientes y animaciones

## API Utilizada

- **Pokemon GraphQL API**: https://graphql.pokeapi.co/v1beta2

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
- Ordenamiento alfabético
- Vista en tarjetas con imagen, nombre, tipos y número
- Indicador de favoritos

### Sistema de Favoritos
- Agregar/quitar Pokémon de favoritos con un clic
- Persistencia en localStorage
- Contador de favoritos en la interfaz

### Detalles del Pokémon
- Modal con información completa
- Imagen del Pokémon
- Tipos con colores distintivos
- Información básica (número, generación, altura, peso)
- Botón de favoritos integrado

## Estructura del Proyecto

```
src/
├── components/
│   ├── PokemonList.jsx      # Lista principal de Pokémon
│   ├── PokemonCard.jsx      # Tarjeta individual de Pokémon
│   └── PokemonDetail.jsx    # Modal de detalles
├── context/
│   └── PokemonFavoritesContext.jsx  # Context para favoritos
├── graphql/
│   ├── client.js           # Configuración de Apollo Client
│   └── queries.js          # Consultas GraphQL
├── utils/
│   └── pokemonUtils.js     # Utilidades para procesar datos
└── App.jsx                 # Componente principal
```

## Consultas GraphQL

La aplicación utiliza dos consultas principales:

1. **GET_ALL_POKEMON**: Obtiene la lista completa de Pokémon
2. **GET_POKEMON_BY_ID**: Obtiene detalles específicos de un Pokémon

## Personalización

Puedes personalizar fácilmente:
- Colores de tipos de Pokémon en los archivos CSS
- Estilos generales en `App.css`
- Consultas GraphQL en `queries.js`
- Funcionalidad de favoritos en el contexto