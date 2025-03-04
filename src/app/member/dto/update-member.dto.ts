import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends PartialType(
  OmitType(CreateMemberDto, ['password'] as const),
) {
  avatar: string;
}

export class UpdateMemberPasswordDto extends PickType(CreateMemberDto, [
  'password',
] as const) {}
