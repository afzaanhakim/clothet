import { Router, Request, Response, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthService } from '../services/auth.service';

const router = Router();

// Validation middleware
const validateRegistration = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isString().withMessage('Password is required'),
  body('name').isString().withMessage('Name is required'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isString().withMessage('Password is required'),
];

// Register route
const registerHandler: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { user, token } = await AuthService.register(req.body);
    
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error: any) {
    if (error.name === 'PasswordValidationError') {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login route
const loginHandler: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    if (!result) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const { user, token } = result;
    
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

router.post('/register', validateRegistration, registerHandler);
router.post('/login', validateLogin, loginHandler);

export default router; 