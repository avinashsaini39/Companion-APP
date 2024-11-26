import 'dotenv/config'; // Import dotenv
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import authRoutes from './route/authRoutes.js';
import userRoutes from './route/userRoutes.js';
import diagramRoutes from './route/diagramRoutes.js';



const app = express();


const PORT = process.env.PORT || 5300;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Database connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/diagrams', diagramRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
