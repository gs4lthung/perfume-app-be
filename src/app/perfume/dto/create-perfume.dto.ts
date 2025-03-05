import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePerfumeDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Brand is required' })
  @IsString({ message: 'Brand must be a string' })
  brand: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Price is required' })
  @Min(0, { message: 'Price must be a positive number' })
  @Max(1000000, { message: 'Price must be less than 1000000' })
  price: number;

  @IsNotEmpty({ message: 'Concentration is required' })
  @IsString({ message: 'Concentration must be a string' })
  concentration: string;

  @IsNotEmpty({ message: 'Ingredients is required' })
  @IsString({ message: 'Ingredients must be a string' })
  ingredients: string;

  @IsNotEmpty({ message: 'Volume is required' })
  @Min(0, { message: 'Volume must be a positive number' })
  @Max(10000, { message: 'Volume must be less than 10000' })
  volume: number;

  @IsNotEmpty({ message: 'Target audience is required' })
  @IsString({ message: 'Target audience must be a string' })
  targetAudience: string;

  @IsOptional()
  @IsString({ message: 'URI must be a string' })
  uri: string;
}
