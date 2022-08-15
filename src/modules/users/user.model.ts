import * as mongoose from 'mongoose';

import type { CreateUserDto } from './dtos/create-user.dto';

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const userModel = mongoose.model<CreateUserDto & mongoose.Document>('Users', usersSchema);

export default userModel;
