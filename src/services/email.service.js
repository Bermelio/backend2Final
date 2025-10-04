import { sendEmail, sendPasswordResetEmail, sendPurchaseConfirmation } from '../config/nodemailer.js';

class EmailService {
  async sendPasswordReset(email, resetToken) {
    try {
      await sendPasswordResetEmail(email, resetToken);
      return { success: true, message: 'Email de recuperación enviado' };
    } catch (error) {
      console.error('Error al enviar email de recuperación:', error);
      throw new Error('No se pudo enviar el email de recuperación');
    }
  }

  async sendPurchaseConfirmation(email, ticket) {
    try {
      await sendPurchaseConfirmation(email, ticket);
      return { success: true, message: 'Email de confirmación enviado' };
    } catch (error) {
      console.error('Error al enviar email de confirmación:', error);
      throw new Error('No se pudo enviar el email de confirmación');
    }
  }

  async sendCustomEmail(to, subject, html) {
    try {
      await sendEmail(to, subject, html);
      return { success: true, message: 'Email enviado' };
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw new Error('No se pudo enviar el email');
    }
  }

  async sendWelcomeEmail(user) {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a nuestro E-commerce!</h1>
            </div>
            <div class="content">
              <p>Hola ${user.first_name},</p>
              <p>Gracias por registrarte en nuestra plataforma.</p>
              <p>Estamos emocionados de tenerte con nosotros.</p>
              <p>¡Felices compras! 🛒</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail(user.email, 'Bienvenido a nuestro E-commerce', html);
      return { success: true, message: 'Email de bienvenida enviado' };
    } catch (error) {
      console.error('Error al enviar email de bienvenida:', error);
      return { success: false, message: 'No se pudo enviar el email de bienvenida' };
    }
  }

  async sendStockAlert(adminEmail, product) {
    try {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert { background-color: #dc3545; color: white; padding: 15px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="alert">
              <h2>⚠️ Alerta de Stock Bajo</h2>
            </div>
            <div class="content">
              <p><strong>Producto:</strong> ${product.title}</p>
              <p><strong>Código:</strong> ${product.code}</p>
              <p><strong>Stock actual:</strong> ${product.stock} unidades</p>
              <p>Por favor, considera reabastecer este producto.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail(adminEmail, `Alerta de Stock Bajo: ${product.title}`, html);
      return { success: true, message: 'Alerta de stock enviada' };
    } catch (error) {
      console.error('Error al enviar alerta de stock:', error);
      throw new Error('No se pudo enviar la alerta de stock');
    }
  }
}

export default new EmailService();