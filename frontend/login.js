document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const employee_id = document.getElementById('employee_id').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employee_id, password })
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      document.getElementById('error').textContent = data.message;
    }
  } catch (err) {
    console.error('Login error:', err);
    document.getElementById('error').textContent = 'Server error';
  }
});