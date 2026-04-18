# 📚 Prueba Técnica Frontend

Aplicación desarrollada con Next.js que permite listar, visualizar y crear posts consumiendo la API de JSONPlaceholder.

---

## 🚀 Tecnologías usadas

- Next.js (App Router)
- React
- TypeScript
- SCSS

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone https://github.com/JuniorXD0301/Prueba-Tecnica-Frontend.git
cd prueba-tecnico-frontend/app-prueba
```

Instala dependencias:
```bash
npm install
```

## ▶️ Ejecución del proyecto

Modo desarrollo:
```bash
npm run dev
```
Abrir en navegador:
```bash
http://localhost:3000
```

## ⚙️ Decisiones técnicas
1. Uso de Server y Client Components

    Se utilizó:

    Server Component para la vista de detalle (/posts/[id])
    Permite hacer fetch en el servidor
    Mejora performance y evita enviar lógica innecesaria al cliente
    Client Components para:
    Tabla de posts
    Formularios
    Modales
    Manejo de estado e interacción del usuario
2. Manejo de estado

    Se centralizó la lógica en hooks personalizados (usePosts, useCreatePost) para:

    Separar lógica de presentación
    Reutilizar lógica fácilmente
    Mantener componentes limpios

3. Fetch de datos

    Se utiliza fetch nativo con configuración de cache de Next.js:

    force-cache para datos estáticos
    separación clara entre servicios y UI

## 📁 Estructura del proyecto
```bash
app/
  components/
  core/
    services/
    interfaces/
  posts/
    [id]/        
  modals/
```