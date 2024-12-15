import User from "../entities/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
  email: z.string().email({ message: "Enter valid Email !!!" }),
  password: z
    .string()
    .min(4, { message: "password should be atleast contain 4 letter" }),
  username: z
    .string()
    .min(3, { message: "username should be atleast contain 3 letter" }),
});

export const register = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const validation = userSchema.safeParse({ email, username, password });
    if (!validation) {
      const errorMessage = validation.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res
      .status(200)
      .json({ message: "User Logged In Successfully !!!", user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Server Error" });
  }
};
