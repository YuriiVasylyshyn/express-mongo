import * as mongoose from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  name: string;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model<User>('Users', userSchema);

export default UserModel;
