import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { MemberService } from 'src/app/member/member.service';
import { CreateMemberDto } from 'src/app/member/dto/create-member.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('register')
  register(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }
}
