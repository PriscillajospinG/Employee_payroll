const express = require('express');
const router = express.Router();
const pool = require('../db/database'); // PostgreSQL connection

router.post('/', async (req, res) => {
  const { employee_id, password } = req.body;

  // Log login attempt
  console.log(`Login attempt: employee_id = ${employee_id}, password = ${password}`);

  try {
    // Check if employee login exists
    const result = await pool.query(
      `SELECT * FROM employee_login WHERE employee_id = $1 AND password = $2`,
      [employee_id, password]
    );

    console.log('Login query result:', result.rows);

    if (result.rows.length > 0) {
      // Set session
      req.session.loggedIn = true;
      req.session.employeeId = employee_id;

      // Mark as "Present" if not already marked today
      await pool.query(`
        INSERT INTO attendance (employee_id, attendance_date, status)
        VALUES ($1, CURRENT_DATE, 'Present')
        ON CONFLICT (employee_id, attendance_date) DO NOTHING
      `, [employee_id]);

      // Respond success
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;