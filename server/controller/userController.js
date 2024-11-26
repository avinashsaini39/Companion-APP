import { User, ROLES } from '../model/userModel.js';

// Create a new user (manager or user)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, uid } = req.body;

    // Check for valid roles
    if (![ROLES.MANAGER, ROLES.USER].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Create a new user instance
    const newUser = new User({ 
      name, 
      email, 
      password, 
      role,
      uid,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: `${role} created successfully`, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users or filter by role
export const getUsers = async (req, res) => {
  try {
    // Always filter by role USER
    const users = await User.find({ role: ROLES.USER });
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, uid } = req.body;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only the provided fields
    if (uid) user.uid = uid;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
