const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all employees
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM employees');
  res.json(result.rows);
});

// ADD an employee
router.post('/', async (req, res) => {
  const { name, department, position, salary } = req.body;
  await db.query(
    'INSERT INTO employees (employee_name, department, position, base_salary) VALUES ($1, $2, $3, $4)',
    [name, department, position, salary]
  );
  res.status(201).send('Employee added');
});

// DELETE an employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM employees WHERE employee_id = $1', [id]);
  res.send('Employee deleted');
});

module.exports = router;