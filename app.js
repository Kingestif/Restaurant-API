const express = require('express');
const app = express();
const authRouter = require('./routes/authRoutes');
const morgan = require('morgan');

app.use(morgan('dev')); 
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.get("/", (req, res) => {
    res.send(" Service  Is  Running");
});

module.exports = app;
