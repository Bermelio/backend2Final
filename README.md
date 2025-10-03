

# 📌 Entrega Final - Proyecto Backe#Creando el final de Backend 2
ecommerce-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── passport.js
│   │   └── nodemailer.js
│   ├── dao/
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── product.model.js
│   │   │   ├── cart.model.js
│   │   │   └── ticket.model.js
│   │   ├── user.dao.js
│   │   ├── product.dao.js
│   │   ├── cart.dao.js
│   │   └── ticket.dao.js
│   ├── dto/
│   │   ├── user.dto.js
│   │   ├── product.dto.js
│   │   └── ticket.dto.js
│   ├── repositories/
│   │   ├── user.repository.js
│   │   ├── product.repository.js
│   │   ├── cart.repository.js
│   │   └── ticket.repository.js
│   ├── services/
│   │   ├── user.service.js
│   │   ├── product.service.js
│   │   ├── cart.service.js
│   │   ├── ticket.service.js
│   │   └── email.service.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   └── ticket.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   └── ticket.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── authorization.middleware.js
│   │   └── error.middleware.js
│   ├── utils/
│   │   ├── bcrypt.js
│   │   ├── jwt.js
│   │   └── validators.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.mdnd Ecommerce

## 🎯 Consigna
Mejorar la arquitectura del servidor desarrollado durante el curso, enfocándose en:
- Implementación de **patrones de diseño**.
- Manejo de **roles y autorización**.
- Mejora de la **lógica de negocio** del ecommerce.

---

## 📂 Aspectos a Incluir

### 🔹 Patrón Repository
- Implementar el **patrón Repository** para trabajar con el DAO dentro de la lógica de negocio.

### 🔹 Modificación de la Ruta `/current`
- Evitar enviar información sensible del usuario.
- Enviar un **DTO (Data Transfer Object)** con solo la información necesaria y no sensible.

### 🔹 Sistema de Recuperación de Contraseña
- Implementar un sistema de recuperación de contraseña que:
  - Envíe un correo con un **botón para restablecer la contraseña**.
  - El enlace del correo debe **expirar después de 1 hora**.
  - Evitar que el usuario restablezca la contraseña a la misma que tenía antes.

### 🔹 Middleware de Autorización
- Crear un **middleware** que trabaje junto con la estrategia `current` para limitar accesos:
  - ✅ Solo **administrador**: puede **crear, actualizar y eliminar productos**.
  - ✅ Solo **usuario**: puede **agregar productos a su carrito**.

### 🔹 Arquitectura Profesional
- Aplicar una **arquitectura más profesional** en el servidor:
  - Uso de **patrones de diseño**.
  - **Manejo de variables de entorno**.
  - Técnicas avanzadas como **mailing**.

### 🔹 Mejora en la Lógica de Compra
- Profundizar en los **roles y autorizaciones** aplicables al proceso de compra dentro del ecommerce.

---

## 📑 Formato de Entrega
- Link al repositorio de **GitHub** con el proyecto completo (sin `node_modules`).
- Incluir archivo **.env** con la configuración necesaria.

---

## ✅ Criterios de Evaluación

### DAO y DTO en Capa de Persistencia
- Los **DAOs y DTOs** están estructurados y separados siguiendo buenas prácticas.
- Transferencia de datos entre capas eficiente y sin consultas redundantes.

### Patrón Repository y Lógica de Negocio
- El **patrón Repository** se aplica correctamente.
- La **lógica de negocio** se maneja de forma clara y eficiente.

### Middleware de Autorización y Seguridad
- El **middleware** se integra con la estrategia `current`.
- Los **endpoints** se protegen según los roles de usuario de forma segura.

### Modelo de Ticket y Lógica de Compra
- El modelo **Ticket** está implementado con todos los campos necesarios.
- La lógica de compra:
  - Verifica stock de productos.
  - Genera tickets.
  - Maneja compras completas e incompletas eficientemente.

---

📌 **Objetivo final**: Consolidar los conocimientos del curso para lograr un **servidor backend robusto, seguro y profesional**.
