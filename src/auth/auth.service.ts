// ========== Auth Service
// import all modules
import { Body, HttpStatus, Injectable } from '@nestjs/common';
import { IResponse } from '../types';
import { LoginDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async login(@Body() dto: LoginDto): Promise<IResponse<LoginDto>> {
    try {
      const result = await this.userModel
        .findOne({ username: dto.username })
        .lean();

      if (result) {
        return {
          statusCode: HttpStatus.OK,
          data: result,
        };
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          data: result,
        };
      }
    } catch (err) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errors: {
          server: [err.message],
        },
      };
    }
  }
}
