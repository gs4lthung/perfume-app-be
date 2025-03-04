import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema({ timestamps: true })
export class Member {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ default: 'https://www.gravatar.com/avatar/' })
  avatar: string;

  @Prop({ default: true })
  gender: boolean;

  @Prop()
  yob: number;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isGoogleLogin: boolean;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
