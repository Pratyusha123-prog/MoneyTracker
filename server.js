const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/MoneyTrackerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Create a schema for the expense
const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

// Create models based on the schemas
const Expense = mongoose.model('Expense', expenseSchema);

// Route to handle expense data
app.post('/add-expense', async (req, res) => {
  const { category, amount, date } = req.body;

  // Validate the input
  if (!category || !amount || !date) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newExpense = new Expense({ category, amount, date });
    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully!' });
  } catch (error) {
    console.error('Error saving expense to database:', error);
    res.status(500).json({ message: 'Error saving expense to database.' });
  }
});

// Route to handle expense deletion (optional)
app.delete('/delete-expense', async (req, res) => {
  const { category, amount, date } = req.body;

  try {
    await Expense.deleteOne({ category, amount, date });
    res.status(200).json({ message: 'Expense deleted successfully!' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Error deleting expense.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
