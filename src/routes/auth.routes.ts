import express from 'express';
import registerUserService from '../services/auth.services/registerUserService.js';
import loginUserService from '../services/auth.services/loginUserService.js';

const router = express.Router();

router.get('/register', (_req, _res) => {
  // render strony
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await registerUserService(username, password, email, req);

    if (!result.success) {
      // res.render('register', { error: result.reason });
      return;
    }

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
  const { email, username, password } = req.body;

  try {
    const result = await loginUserService(email, username, password, req);

    if (!result.success) {
      // res.render('login', { error: result.reason });
      return;
    }

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