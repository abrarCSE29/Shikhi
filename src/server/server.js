const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON request bodies

const uri = "mongodb+srv://jucse29398:4PETX4lgFan9saZW@cluster0.it9791n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let db; // Declare a global `db` variable to store the connected database instance
const dbName = "Shikhi_Project";
const courseCollection = "courses";
const usersCollection = "users";

// Connect to the MongoDB database once when the server starts
async function connectToDatabase() {
  try {
    await client.connect(); // Connect to the MongoDB server
    db = client.db(dbName); // Assign the connected database instance to the global `db` variable
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application if the connection fails
  }
}

// Fetch courses and log them to the terminal
app.get('/courses', async (req, res) => {
  try {
    const collection = db.collection(courseCollection); // Use the existing connection
    const courses = await collection.find({}).toArray(); // Fetch all courses

    // Log courses to the VSCode terminal
    console.log('Courses fetched from MongoDB:', courses);

    // Respond with courses in JSON format
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Set user information to MongoDB
app.post('/users', async (req, res) => {
  const { name, email, mobile, dob, profession } = req.body;

  try {
    const collection = db.collection(usersCollection); // Use the existing connection
    const newUser = { name, email, mobile, dob, profession };
    await collection.insertOne(newUser); // Insert the user into the MongoDB collection
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Get user information from MongoDB upon logging in
app.get('/users/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const collection = db.collection(usersCollection); // Use the existing connection
    const user = await collection.findOne({ email: email }); // Find user by email

    if (user) {
      res.status(200).json(user); // Send user data
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Start the server and connect to the database before handling requests
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
