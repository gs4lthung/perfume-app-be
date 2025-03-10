import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Member } from 'src/app/member/entities/member.entity';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ required: true, min: 1, max: 3 })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true })
  author: Member;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
