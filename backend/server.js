const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- add this

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔥 Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Your existing routes
const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});