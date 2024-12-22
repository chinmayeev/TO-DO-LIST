document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  username = document.getElementById('signup-password').value;
  const Name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  // Store the credentials in localStorage
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('Name',Name);

  alert('Account created successfully!');
  window.location.href = 'signin.html'; // Redirect to the sign-in page
});
