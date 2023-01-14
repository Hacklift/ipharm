import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Drug, DrugSchema } from '../schema';
import { DrugController } from './drug.controller';
import { DrugRepository } from './drug.repository';
import { DrugService } from './drug.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Drug.name, schema: DrugSchema }])],
  controllers: [DrugController],
  providers: [DrugService, DrugRepository]
})
export class DrugModule {}
