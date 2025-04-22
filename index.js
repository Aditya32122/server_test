const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// In-memory database
const users = [];

// Secret key for signing JWTs (you should store this in a .env file)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Signup route
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });
    res.status(201).json({ message: "User signed up successfully" });
});

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
        {
          sub: "test",         // This should match the Application Lookup condition
          username: username,  // Your actual user data
          aud: "local",        // Must match 'Audience' in JWT policy
         
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      
    res.status(200).json({ message: "Login successful", access_token: token });
});

// Protected route
app.get("/profile", authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}! This is your profile.` });
});

// Middleware to validate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; // Expected format: Bearer <token>

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Test route
app.get("/test", (req, res) => {
    res.send("hi");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
