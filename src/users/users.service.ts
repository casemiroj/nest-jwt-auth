import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create({ name, email, password }: CreateUserDto) {
    const user = new this.userModel({
      name,
      email,
      password: await hash(password, 10),
    });
    user.save();
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
