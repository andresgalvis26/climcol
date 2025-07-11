# 🌤️ ClimCol – Clima de Colombia en Tiempo Real

**ClimCol** es una aplicación web moderna construida con **React** y **Express** para visualizar el clima en tiempo real de las principales ciudades de Colombia. Integra datos desde [WeatherAPI](https://www.weatherapi.com/) y ofrece análisis visuales, estadísticas y búsqueda personalizada por ciudad.

## 📦 Estructura del Proyecto

Este proyecto utiliza un **monorepo** con la siguiente estructura:

```
climcol/
│
├── client/       # Aplicación frontend (React + Tailwind + Lucide React)
├── server/       # Servidor backend (Express, Node.js)
├── package.json  # Configuración raíz (scripts con concurrently)
└── README.md
```

## 🚀 Tecnologías

- **Frontend:** React + TailwindCSS + Lucide React
- **Backend:** Express + Node.js
- **API:** [WeatherAPI](https://weatherapi.com)
- **Herramientas Dev:** `concurrently`, `nodemon`, `cors`, `dotenv`

## ⚙️ Instalación

```bash
git clone https://github.com/andresgalvis26/climcol
cd climcol
npm install
```

Instala también las dependencias de los subproyectos:

```bash
cd client
npm install

cd ../server
npm install
```

## 🧪 Comandos útiles

### Levantar frontend y backend juntos (modo desarrollo)

Desde la raíz del proyecto:

```bash
npm run dev
```

Este comando utiliza `concurrently` para levantar:

- Frontend en: `http://localhost:5173`
- Backend en: `http://localhost:3000`

### Scripts disponibles

#### 📁 En `package.json` raíz:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\""
  }
}
```

#### 📁 En `client/package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### 📁 En `server/package.json`:
```json
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

## 🧠 Funcionalidades principales

- 🔍 Buscar clima por ciudad (ej. "Bogotá", "Miami")
- ⚡️ Carga inicial de ciudades colombianas
- 📊 Dashboard con estadísticas agregadas
- 🧠 Cache de resultados para evitar sobrecargar la API
- 📦 Separación clara entre frontend y backend

## 🌐 Despliegue en Azure

- App Service para el backend (Express)
- App Service estático o CDN para el frontend (React)
- Se puede desplegar como monorepo o por separado

## 📄 .env para `server/`

Crea un archivo `.env` dentro de `/server`:

```
PORT=3000
WEATHER_API_KEY=TU_API_KEY_DE_WEATHERAPI
```

## 📸 Capturas

> Agrega aquí screenshots de tu app: página de inicio, dashboard, búsqueda, etc.

## 👨‍💻 Autor

**Andrés Felipe Galvis Galviz**  
[GitHub](https://github.com/andresgalvis26) | [LinkedIn](https://www.linkedin.com/in/andres-felipe-galvis-galviz/)

## 📝 Licencia

MIT License. Libre para uso educativo y personal.
