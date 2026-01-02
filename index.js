const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Import router correctly
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
    res.send('Student Management API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});