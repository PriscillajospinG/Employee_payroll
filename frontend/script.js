document.getElementById('employee-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      department: document.getElementById('department').value,
      position: document.getElementById('position').value,
      salary: document.getElementById('salary').value,
    };
  
    await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  
    loadEmployees();
  });
  
  async function loadEmployees() {
    const res = await fetch('/api/employees');
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
  }
  
  async function deleteEmployee(id) {
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    loadEmployees();
  }
  
  loadEmployees();