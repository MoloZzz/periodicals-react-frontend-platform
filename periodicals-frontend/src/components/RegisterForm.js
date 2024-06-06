import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // Додано стан для відображення повідомлення про успішну реєстрацію
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, username, password);
      setIsRegistered(true); // Встановлюємо isRegistered в true, якщо реєстрація пройшла успішно
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Register</h3>
              {/* Додано умовний оператор для відображення Alert, якщо isRegistered === true */}
              {isRegistered ? (
                <div className="alert alert-success" role="alert">
                  You have been successfully registered! 
                  <button type="button" className="btn btn-primary btn-sm ms-2" onClick={handleContinue}>Continue</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
