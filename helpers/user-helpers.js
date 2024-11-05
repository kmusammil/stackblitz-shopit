const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    signupUser: async (userData) => {
        try {
            const { name, email, password } = userData;

            // Check if the user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                // Throw an error if the email is already in use
                throw new Error('Email already in use');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user and save it to the database
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            });

            await newUser.save();

            return { success: true, message: 'Sign-up successful', user: newUser };
        } catch (error) {
            throw error; // Rethrow the error to be handled in the route
        }
    },
    signinUser: async (userData) => {
        const { name, email, password } = userData;

        try {
            // Find the user by name and email
            const existingUser = await User.findOne({ name, email });

            // If user does not exist
            if (!existingUser) {
                return { success: false, message: 'User not found' };
            }

            // Compare the hashed password with the provided password
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return { success: false, message: 'Invalid password' };
            }

            // If all checks pass, return success
            return { success: true, message: 'Sign-in successful', user: existingUser };
        } catch (error) {
            // Handle any errors
            return { success: false, message: 'Error signing in', error };
        }
    },
    getAllUsers: async () => {
        try {
          const users = await User.find();
          return users;
        } catch (error) {
          console.error('Error fetching users:', error);
          throw new Error('Could not fetch users');
        }
      },
      deleteUser: (userEmail) => {
        return User.deleteOne({ email: userEmail });
      }
      
      
};
