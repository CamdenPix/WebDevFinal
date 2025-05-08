const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();

// ==== Configuration ====
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/taskboarddb'; // Adjust to your DB name

// ==== Middleware ====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error(' MongoDB connection error:', err);
        process.exit(1);
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');

// ==== Routes ====
app.use('/api', apiRoutes); // API routes


// ==== Error Handling ====
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});

// ==== Start Server ====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});