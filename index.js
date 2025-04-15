const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// In-memory database
const users = [];

// Signup route
app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Add the new user to the in-memory database
    users.push({ username, password });
    res.status(201).json({ message: "User signed up successfully" });
});

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password matches
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
});

// Test route
app.get("/test", (req, res) => {
    res.send("hi");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});