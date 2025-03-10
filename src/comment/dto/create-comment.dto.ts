import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsNotEmpty({ message: 'Rating is required' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(3, { message: 'Rating must be at most 3' })
  rating: number;
}
