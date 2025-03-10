import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from 'src/app/member/entities/member.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Member') private memberModel: Model<Member>,
  ) {}

  async signin(signinDto: SigninDto) {
    const member = await this.memberModel.findOne({
      email: signinDto.email,
    });
    if (!member) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      signinDto.password,
      member.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      sub: member._id,
      email: member.email,
      isAdmin: member.isAdmin,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
