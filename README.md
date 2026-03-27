# SGE Frontend (Angular 21)

Frontend del **Sistema de Gestión Empresarial (SGE)** desarrollado con **Angular 21**, enfocado en experiencia de usuario moderna, arquitectura modular y consumo eficiente de APIs.

Este proyecto consume el backend desarrollado en **.NET (Clean Architecture)** y representa una aplicación empresarial completa con autenticación, dashboards y gestión de entidades.

---

## 🧠 Descripción del proyecto

Aplicación SPA diseñada para la gestión de empleados y departamentos, incluyendo autenticación, dashboard analítico y herramientas administrativas.

El enfoque principal del proyecto es:
- Escalabilidad del frontend
- Separación de responsabilidades
- Reutilización de componentes
- Experiencia de usuario moderna

---

## 🏗️ Arquitectura del Frontend

El proyecto sigue una estructura basada en **feature-based architecture**, separando claramente responsabilidades:

- `core/`
  → Servicios globales, interceptores, guards, utilidades y configuración base

- `features/`
  → Módulos funcionales (auth, employees, areas, dashboard)

- `shared/`
  → Componentes reutilizables (inputs, UI, etc.)

- `layouts/`
  → Layout principal (sidebar, header, navegación)

---

## ⚙️ Principales decisiones técnicas

- Uso de **Standalone Components (Angular moderno)**
- Manejo de estado local con **Signals**
- Arquitectura basada en **features (modular y escalable)**
- Interceptores HTTP para:
  - Manejo de errores global
  - Inyección automática de JWT
  - Loader global de peticiones
- Guards para control de acceso:
  - `authGuard`
  - `guestGuard`
- Formularios reactivos (**Reactive Forms**)
- Uso de **Angular Material + TailwindCSS** (UI híbrida moderna)

---

## 🔐 Seguridad

- Manejo de sesión mediante **JWT**
- Persistencia de sesión en `localStorage`
- Protección de rutas con guards
- Interceptor que invalida sesión en errores `401`

---

## 📦 Funcionalidades implementadas

### 🔑 Autenticación
- Login
- Registro de usuario
- Persistencia de sesión
- Redirección automática según estado de autenticación

---

### 👤 Empleados
- Listado con:
  - Paginación
  - Filtros
  - Ordenamiento
- Creación y edición (modal dialog)
- Activación / desactivación
- Visualización enriquecida (avatar dinámico)

---

### 🏢 Departamentos
- CRUD completo
- Modal para creación y edición
- Filtros y paginación

---

### 📊 Dashboard
- Métricas en tiempo real:
  - Total empleados
  - Activos / inactivos
  - Nómina mensual
- Exportación de datos a **Excel (xlsx)**

---

## 🎨 UI / UX

- Diseño moderno basado en:
  - **TailwindCSS**
  - **Angular Material**
- Sistema de notificaciones con **ngx-toastr**
- Loader global para peticiones HTTP
- Layout empresarial:
  - Sidebar
  - Header dinámico
  - Contenido modular

---

## 🔄 Comunicación con API

El frontend consume una API estandarizada con estructura:

```json
{
  "status": true,
  "message": "Proceso exitoso",
  "data": {}
}
