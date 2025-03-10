import { PickType } from '@nestjs/mapped-types';
import { CreateMemberDto } from 'src/app/member/dto/create-member.dto';

export class SigninDto extends PickType(CreateMemberDto, [
  'email',
  'password',
] as const) {}
