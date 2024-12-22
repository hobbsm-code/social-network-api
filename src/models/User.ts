import { Schema, Document, model, ObjectId } from 'mongoose';
import Thought from './Thought';

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: typeof Thought[];
  friends: ObjectId[];
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function (this: IUser) {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

export default User
