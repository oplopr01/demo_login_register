// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createConnection, getRepository } = require('typeorm');
const { User } = require('./src/entities/User');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// TypeORM initialization
createConnection()
  .then(() => console.log('Connected to database'))
  .catch(error => console.error('Database connection error:', error));

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // Checking if user already exists
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Login successful, generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


