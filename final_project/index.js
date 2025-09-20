const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

// Authentication middleware for /customer/auth/*
app.use("/customer/auth/*", function auth(req, res, next) {
    const token = req.session.accessToken;  // Token is stored in session
    
    if (!token) {
        return res.status(403).json({ message: "No token provided, please login" });
    }

    jwt.verify(token, "your_jwt_secret", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Failed to authenticate token" });
        }

        req.user = decoded;  // Attach user data to the request
        next();
    });
});

 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
