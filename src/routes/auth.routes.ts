import express from 'express';
import crypto from 'crypto';
import { User, Password, Role } from '../infrastructure/models/index.js';
import type { SessionData } from 'express-session';

const router = express.Router();

router.get('/register', (_req, _res) => {
  // render strony
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      // return res.render('register', { error: 'Email already exists' });
    }

    const user = await User.create({ username, email }) as InstanceType<typeof User> 
      & { id: number };

    const salt = crypto.randomBytes(16).toString('hex');
    const iterations = 10000;
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
      .toString('hex');

    await Password.create({
      userId: user.id,
      hashedPassword,
      salt,
      iterations,
    });

    const role = await Role.findOne({ where: { roleName: 'user' } });
    // Za duzo roboty z typowaniem tych modeli
    await (user as any).addRole(role);

    const session = req.session as SessionData & { userId?: number; roles?: string[] };
    session.userId = user.id;
    session.roles = ['user'];

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    // res.render('register', { error: 'Registration failed' });
  }
});

router.get('/login', (_req, _res) => {
  // `Render` strony
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: [Password, Role],
    }) as any;

    if (!user || !user.Password) {
      // return res.render('login', { error: 'Invalid credentials' });
    }

    const { salt, iterations, hashedPassword } = user.Password;

    const hashAttempt = crypto
      .pbkdf2Sync(password, salt, iterations, 64, 'sha512')
      .toString('hex');

    if (hashAttempt !== hashedPassword) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    const session = req.session as SessionData & { userId?: number; roles?: string[] };
    session.userId = user.id;
    session.roles = user.Roles.map(r => r.roleName);

    res.redirect('/');
  } catch (err) {
    console.error(err);
    // res.render('login', { error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    // res.redirect('/');
  });
});

export default router;