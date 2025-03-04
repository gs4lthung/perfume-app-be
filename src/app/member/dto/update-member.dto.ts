import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateMemberDto extends PartialType(
  OmitType(CreateMemberDto, ['password'] as const),
) {
  avatar: string;
}

export class UpdatePasswordDto extends PickType(CreateMemberDto, [
  'password',
] as const) {
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  newPassword: string;
}
