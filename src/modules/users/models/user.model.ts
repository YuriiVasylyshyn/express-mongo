import * as mongoose from 'mongoose';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const userModel = mongoose.model<User & mongoose.Document>('Users', usersSchema);

export default userModel;
