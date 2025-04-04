import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Should be in environment variables
const JWT_EXPIRES_IN = '24h';

// Password validation rules
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

class PasswordValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordValidationError';
  }
}

export class AuthService {
  static validatePassword(password: string): { isValid: boolean; message: string } {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        isValid: false,
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      };
    }

    if (!PASSWORD_REGEX.test(password)) {
      return {
        isValid: false,
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      };
    }

    return { isValid: true, message: 'Password is valid' };
  }

  static generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  static async login(email: string, password: string): Promise<{ user: User; token: string } | null> {
    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return null;
      }

      const isValidPassword = await user.validatePassword(password);
      
      if (!isValidPassword) {
        return null;
      }

      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData: { email: string; password: string; name: string }) {
    // Validate password
    const passwordValidation = this.validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      throw new PasswordValidationError(passwordValidation.message);
    }

    try {
      const user = await User.create(userData);
      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
} 