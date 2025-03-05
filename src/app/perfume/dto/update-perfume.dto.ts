import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfumeDto } from './create-perfume.dto';

export class UpdatePerfumeDto extends PartialType(CreatePerfumeDto) {}
