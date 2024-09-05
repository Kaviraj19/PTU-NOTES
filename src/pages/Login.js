import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Basic client-side validation
      if (!username || !password) {
        setError('Both email and password are required.');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        console.error('Login error:', error.message); // Log the error message
        setError('Invalid email or password.'); // Generic error message
      } else if (data) {
        console.log('Logged in:', data); // Log the user object to verify successful login
        navigate('/add'); // Redirect to the appropriate page
      }

    } catch (error) {
      console.error('Unexpected error:', error); // Log unexpected errors
      setError('An unexpected error occurred. Please try again later.'); // Generic error message
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required // HTML5 required attribute
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required // HTML5 required attribute
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
