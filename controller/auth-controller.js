const User = require("../model/auth");
const appError = require("../utility/appError");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path');


// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + path.extname(file.originalname));
  }
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Handle image upload
const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a URL to access the image
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    user.profileImage = imageUrl;
    await user.save();

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create("user is already exit", 400, "REGISTER FAIL");
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res
    .status(201)
    .json({ status: "SUCCESSFULLY REGISTERED!", data: { user: newUser } });
};



const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = appError.create(
      "email or password are required",
      400,
      "fail"
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.create("email not found!", 400, "LOGIN FALI");
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);
  if (matchedPassword) {
    res.status(200).json({ message: "Logged in successfully", data: { user } });
  } else {
    return res.status(400).json({ message: "Authentication failed" });
  }
};

module.exports = {
  register,
  login,
  upload,
  handleUpload,
};
