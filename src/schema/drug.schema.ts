import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DrugCategory } from '../models';

export type DrugDocument = HydratedDocument<Drug>;

@Schema()
export class Drug {
  @Prop({type: String})
  name: string;

  @Prop({type: String})
  producer: string;

  @Prop({type: Number})
  quantity: number;

  @Prop({type: String, enum: DrugCategory})
  category: DrugCategory;
}

export const DrugSchema = SchemaFactory.createForClass(Drug);
