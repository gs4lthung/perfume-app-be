import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Brand } from 'src/app/brand/entities/brand.entity';
import { Comment } from 'src/comment/entities/comment.entity';

export type PerfumeDocument = HydratedDocument<Perfume>;

@Schema({ timestamps: true })
export class Perfume {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true })
  brand: Brand;

  @Prop({ required: true, trim: true })
  decription: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, enum: ['EDT', 'EDC', 'EDP', 'Parfum', 'Extrait'] })
  concentration: string;

  @Prop({ required: true, trim: true })
  ingredients: string;

  @Prop({ required: true })
  volume: number;

  @Prop({ required: true, enum: ['Male', 'Female', 'Unisex'] })
  targetAudience: string;

  @Prop()
  uri: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const PerfumeSchema = SchemaFactory.createForClass(Perfume);
