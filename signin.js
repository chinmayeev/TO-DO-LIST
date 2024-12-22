document.getElementById('signin-form').addEventListener('submit', function (e) {
  e.preventDefault();




  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;




  // Get stored credentials
  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');




  // Check if entered credentials match the stored ones
  if (email === storedEmail && password === storedPassword) {
    window.location.href = 'index.html'; // Redirect to the to-do list page
  } else {
    alert('Incorrect email or password');
  }
});
