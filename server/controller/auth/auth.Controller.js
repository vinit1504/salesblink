import bcrypt from "bcryptjs";
import User from "../../model/user.Model.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { username, email, contactNumber, password } = req.body;

    // Validate required fields
    if (!username || !email || !contactNumber || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
        flag: 0,
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
        flag: 0,
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
        flag: 0,
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
        flag: 0,
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
        success: false,
        flag: 0,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the user
    const user = new User({
      username,
      email,
      contactNumber,
      password: hashedPassword,
    });
    await user.save();

    const { password:_ , ...userWithoutPassword} = user.toObject()

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      flag: 1,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in userRegister:", error);
    res.status(500).json({
      message: "Server error during user registration",
      success: false,
      flag: 0,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    // Destructure the request body to get username/email and password
    const { usernameOrEmail, password } = req.body;

    // Validate the inputs
    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        message: "Please provide both username/email and password",
        success: false,
        flag: 0,
      });
    }

    // Check if the usernameOrEmail is a valid username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    // If user is not found
    if (!user) {
      return res.status(400).json({
        message: "User not found with this username/email",
        success: false,
        flag: 0,
      });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
        flag: 0,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    // Store token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    const {password:_ , ...userWithoutPassword} = user.toObject()

    // Send the response back with the token
    return res.status(200).json({
      message: "Login successful",
      success: true,
      flag: 1,
      token,
      data:userWithoutPassword
    });
  } catch (error) {
    console.error("Error in userLogin:", error);
    res.status(500).json({
      message: "Server error during user login",
      success: false,
      flag: 0,
    });
  }
};
