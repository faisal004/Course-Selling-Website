import express from "express";
import connectDb from "./utils/dbConnection.js";
import User from "./models/userModel.js";
import Course from "./models/courseModel.js";
import Admin from "./models/adminModel.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import {authenticateJwt,SECRET }from './middleware/auth.js';


const app = express();

connectDb();

app.use(express.json());
app.use(cors());

const port = 3000;

app.use(bodyParser.json());

app.post("/admin/courses", authenticateJwt, async (req, res) => {
  try {
    const { title, description, price, imageLink, published } = req.body;

    const course = new Course({
      title,
      description,
      price,
      imageLink,
      published,
    });
    await course.save();

    res.json({ message: "Course created successfully", courseId: course.id });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
});

app.put("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      {
        new: true,
      }
    );
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/admin/courses", async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});
app.post("/admin/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: "Admin Exists" });
    } else {
      const newAdmin = new Admin({ username, email, password });
      await newAdmin.save();
      const token = jwt.sign({ email, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      const token = jwt.sign({ email, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/users/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: "User Exists" });
    } else {
      const newUser = new User({ username, email, password });
      await newUser.save();
      const token = jwt.sign({ email, role: "user" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "User created successfully", token });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log(user);
    if (user) {
      const token = jwt.sign({ email, role: "user" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/users/courses", authenticateJwt, async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/users/courses/:courseId", authenticateJwt, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const alreadyBought = user.purchasedCourses.includes(courseId);

    if (alreadyBought) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    user.purchasedCourses.push(course);
    await user.save();
    res.json({ message: "Course purchased successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users/purchasedCourses", authenticateJwt, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate(
      "purchasedCourses"
    );
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
