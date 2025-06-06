const express = require('express');
const app = express();
const authRouter = require('./routes/authRoutes');
const menuRouter = require('./routes/menuRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const morgan = require('morgan');

app.use(morgan('dev')); 
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);

app.get("/", (req, res) => {
    res.send(" Service  Is  Running");
});

module.exports = app;
