import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  searches: [
    {
      mood: {
        type: String,
        required: true,
      },
      activity: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', UserSchema);

export { User };
