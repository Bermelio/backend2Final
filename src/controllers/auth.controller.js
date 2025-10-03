import UserService from '../services/user.service.js';
import { generateToken } from '../utils/jwt.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { sendPasswordResetEmail } from '../config/nodemailer.js';
import crypto from 'crypto';

class AuthController {
  async register(req, res) {
    try {
      const { first_name, last_name, email, age, password } = req.body;

      if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Todos los campos son requeridos' 
        });
      }

      const existingUser = await UserService.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'El email ya está registrado' 
        });
      }

      const hashedPassword = await hashPassword(password);

      const userData = {
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role: 'user'
      };

      const newUser = await UserService.createUser(userData);

      res.status(201).json({
        status: 'success',
        message: 'Usuario registrado exitosamente',
        data: { userId: newUser._id }
      });
    } catch (error) {
      console.error('Error en register:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al registrar usuario' 
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Email y contraseña son requeridos' 
        });
      }

      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          status: 'error', 
          message: 'Email no registrado' 
        });
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          status: 'error', 
          message: 'Contraseña inválida' 
        });
      }

      const token = generateToken({ id: user._id, email: user.email, role: user.role });

      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json({
        status: 'success',
        message: 'Login exitoso',
        data: { token }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al iniciar sesión' 
      });
    }
  }

  async current(req, res) {
    try {
      const userDTO = await UserService.getUserDTO(req.user._id);

      res.json({
        status: 'success',
        data: userDTO
      });
    } catch (error) {
      console.error('Error en current:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al obtener usuario actual' 
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie('token');
      res.json({
        status: 'success',
        message: 'Logout exitoso'
      });
    } catch (error) {
      console.error('Error en logout:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al cerrar sesión' 
      });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'El email es requerido' 
        });
      }

      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.json({
          status: 'success',
          message: 'Si el email existe, recibirás un correo para restablecer tu contraseña'
        });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000;

      await UserService.updateUser(user._id, {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpiry
      });

      await sendPasswordResetEmail(user.email, resetToken);

      res.json({
        status: 'success',
        message: 'Si el email existe, recibirás un correo para restablecer tu contraseña'
      });
    } catch (error) {
      console.error('Error en requestPasswordReset:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al solicitar recuperación de contraseña' 
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Token y nueva contraseña son requeridos' 
        });
      }

      const user = await UserService.getUserByResetToken(token);
      
      if (!user) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'Token inválido o expirado' 
        });
      }

      const isSamePassword = await comparePassword(newPassword, user.password);
      if (isSamePassword) {
        return res.status(400).json({ 
          status: 'error', 
          message: 'La nueva contraseña no puede ser igual a la anterior' 
        });
      }

      const hashedPassword = await hashPassword(newPassword);

      await UserService.updateUser(user._id, {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      });

      res.json({
        status: 'success',
        message: 'Contraseña restablecida exitosamente'
      });
    } catch (error) {
      console.error('Error en resetPassword:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Error al restablecer contraseña' 
      });
    }
  }
}

export default new AuthController();