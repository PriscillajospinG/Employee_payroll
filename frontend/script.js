// === LOGIN HANDLER ===
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const employee_id = document.getElementById('employee_id').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Include session cookies
        body: JSON.stringify({ employee_id, password })
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Redirect to dashboard after successful login
        window.location.href = '/dashboard';
      } else {
        document.getElementById('error').textContent = 'Invalid credentials';
      }
    } catch (err) {
      console.error('Login failed:', err);
      document.getElementById('error').textContent = 'Server error. Try again later.';
    }
  });
}

// === DASHBOARD HANDLER ===
const employeeForm = document.getElementById('employee-form');
if (employeeForm) {
  employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      department: document.getElementById('department').value,
      position: document.getElementById('position').value,
      salary: document.getElementById('salary').value,
    };

    try {
      await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Include session cookies
        body: JSON.stringify(data)
      });

      loadEmployees();
      employeeForm.reset(); // Clear form fields
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  });

  // === Load all employees ===
  async function loadEmployees() {
    try {
      const res = await fetch('/api/employees', {
        credentials: 'include'
      });
      const employees = await res.json();
      const tbody = document.getElementById('employee-table-body');
      tbody.innerHTML = '';

      employees.forEach(emp => {
        const row = `<tr>
          <td>${emp.employee_name}</td>
          <td>${emp.department}</td>
          <td>${emp.position}</td>
          <td>${emp.base_salary}</td>
          <td><button onclick="deleteEmployee(${emp.employee_id})">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
      });
    } catch (err) {
      console.error('Failed to load employees:', err);
    }
  }

  // === Delete employee ===
  async function deleteEmployee(id) {
    try {
      await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      loadEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

  // Initial load
  loadEmployees();
}

// === LOGOUT HANDLER ===
function logout() {
  fetch('/logout', {
    method: 'GET',
    credentials: 'include'
  })
    .then(() => {
      window.location.href = '/';
    })
    .catch((err) => {
      console.error('Logout failed:', err);
    });
}