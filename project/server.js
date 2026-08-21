const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./config/db');
const User = require('./models/User');
const authRouter = require('./Antara Palwankar 150096725126/router/AuthRouter');
const hospitalRouter = require('./Antara Palwankar 150096725126/router/HospitalRouter');
const isAuthenticated = require('./Antara Palwankar 150096725126/middleware/authMiddleware');

const app = express();
app.use(express.json());

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Invalid username' });
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

app.use(passport.initialize());

app.use('/', authRouter);
app.use('/hospitals', isAuthenticated, hospitalRouter);

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

module.exports = app;
