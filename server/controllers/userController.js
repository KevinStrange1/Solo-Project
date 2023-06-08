const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { name, mood, activity } = req.body;

  try {
    const newUser = new User({
      name,
      mood,
      activity,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
