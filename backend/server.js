const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// ✅ CORS setup (optional if frontend is served from same origin)
app.use(cors({
  origin: 'http://localhost:3000', // You can remove this if frontend is served by Express
  credentials: true,
}));

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session middleware
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // should be true in production with HTTPS
}));

// ✅ Static file serving (must come before route definitions)
app.use(express.static(path.join(__dirname, '../frontend'), {
  index: false // Prevent direct access to index.html
}));

// ✅ Route imports
const employeeRoutes = require('./routes/employees');
const loginRoutes = require('./routes/login');

// ✅ API Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/login', loginRoutes);

// ✅ Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// ✅ Dashboard access (protected route)
app.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  } else {
    res.redirect('/');
  }
});

// ✅ Logout route (should be POST for security, but GET works here too)
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      res.status(500).send('Logout failed');
    } else {
      res.clearCookie('connect.sid');
      res.json({ success: true });
    }
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});