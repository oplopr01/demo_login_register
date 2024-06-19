import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          
        } else {
          toast.error(data.message);
        }
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Error registering user');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs (email, name, password) */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
