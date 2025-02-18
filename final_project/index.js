const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const usersAuth = require("./router/auth_users.js");
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    
    const token = req.body.token;
    let authenticated = usersAuth.authenticatedUser(token)
    if (authenticated['login']) {
        req.user = authenticated
        next(); // Move to the next route
    } else {
        res.status(401).json({ message: "Unauthorized access" }); // Block unauthorized users
    }

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));

