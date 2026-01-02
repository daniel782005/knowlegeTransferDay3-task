const express = require('express');
const router = express.Router();

// In-memory student data
let students = [
    { id: 1, name: "Arun", dept: "CSE", age: 23 },
    { id: 2, name: "Bala", dept: "CSE", age: 23 }
];

// CREATE - Add new student
router.post('/', (req, res) => {
    const { name, dept, age } = req.body;
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = { id: newId, name, dept, age: parseInt(age) };
    students.push(newStudent);
    res.status(201).json({ message: "Student created successfully", student: newStudent });
});

// READ - Get all students
router.get('/', (req, res) => {
    res.json(students);
});

// READ - Get student by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
});

// UPDATE - Update student by ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, dept, age } = req.body;
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }
    students[index] = { ...students[index], name, dept, age: parseInt(age) };
    res.json({ message: "Student updated successfully", student: students[index] });
});

// DELETE - Delete student by ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }
    students.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
});

// Export router correctly
module.exports = router;

