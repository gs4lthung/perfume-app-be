import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;
}
