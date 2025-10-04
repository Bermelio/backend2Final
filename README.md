# 🛒 E-commerce Backend

Backend profesional para un sistema de E-commerce, desarrollado con **Node.js, Express y MongoDB**, aplicando arquitectura en capas y patrones de diseño.

---

## 📚 Descripción

Este proyecto implementa:

- **Arquitectura en capas** (Routes, Controllers, Services, Repositories, DAOs).
- **Patrón Repository** para desacoplar la lógica de negocio de la persistencia.
- **DTOs** para exponer solo la información necesaria al cliente.
- **Autenticación con JWT y Passport**.
- **Autorización por roles** (Admin / User).
- **Proceso de compra completo** con tickets, verificación de stock y notificaciones por email.
- **Seguridad avanzada**: hasheo de contraseñas, cookies httpOnly, validaciones y sanitización.
- **Envío de emails** (recuperación de contraseña y confirmación de compra).

---

## 🧩 Arquitectura

**Flujo de una request:**

Cliente → Routes → Middlewares → Controllers → Services → Repositories → DAOs → MongoDB

- **Routes**: Definen endpoints.  
- **Controllers**: Reciben requests y llaman a la lógica de negocio.  
- **Services**: Contienen la lógica central.  
- **Repositories**: Abstraen el acceso a datos.  
- **DAOs**: Interactúan directamente con MongoDB.  
- **DTOs**: Transforman datos para el cliente.  

---

## 🔐 Autenticación & Autorización

- **Login con JWT**: Tokens en cookies httpOnly.  
- **Roles**:  
  - Admin → gestiona productos.  
  - User → compra y gestiona carrito.  

---

## 🛒 Funcionalidades Clave

- **Carrito de compras** con validación de stock.  
- **Tickets de compra** con código único y detalle de productos.  
- **Actualización automática de stock**.  
- **Compra parcial** si no hay stock suficiente.  
- **Emails automáticos**: confirmación de compra y recuperación de contraseña.  

---

## 📦 Modelos de Datos

- **User**: datos personales, rol, carrito, tickets.  
- **Product**: información del producto, stock, dueño.  
- **Cart**: productos seleccionados por usuario.  
- **Ticket**: registro de compra con detalle y monto.  

---

## 🚀 Características Avanzadas

- Paginación de productos.  
- Population automático de referencias.  
- Manejo centralizado de errores.  
- Timestamps automáticos.  

---

💙 Desarrollado siguiendo las mejores prácticas de la industria
