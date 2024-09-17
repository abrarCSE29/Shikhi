const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON request bodies

const uri = "mongodb+srv://jucse29398:4PETX4lgFan9saZW@cluster0.it9791n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const dbName = "Shikhi_Project";
const collectionName = "courses";

// Fetch courses and log them to the terminal
app.get('/courses', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const courses = await collection.find({}).toArray(); // Fetch all courses

    // Log courses to the VSCode terminal
    console.log('Courses fetched from MongoDB:', courses);

    // Respond with courses in JSON format
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Error fetching courses' });
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
