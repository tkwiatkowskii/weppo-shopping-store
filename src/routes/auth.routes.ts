import express from 'express';
import registerUserService from '../services/auth.services/registerUserService.js';
import loginUserService from '../services/auth.services/loginUserService.js';

const router = express.Router();

router.get('/register', (_req, res) => {
  res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
  const { Username, Email, Password } = req.body;

  try {
    const result = await registerUserService(Username, Password, Email, req);

    if (!result.success) {
       res.render('register', { error: result.reason });
      return;
    }

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('register', { error: 'Registration failed' });
  }
});

router.get('/login', (_req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const result = await loginUserService(email, username, password, req);

    if (!result.success) {
      res.render('login', { error: result.reason });
      return;
    }

    req.session.save((err) => {
      if (err) {
        console.error("Błąd zapisu sesji:", err);
        res.render('login', { error: 'Session save failed' });
        return;
      }
      res.redirect('/product/get-products');
    });

  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Login failed' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

export default router;