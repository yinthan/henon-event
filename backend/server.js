require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
