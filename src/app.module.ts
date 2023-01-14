import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DrugModule } from './drug/drug.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ipharm'),
    DrugModule
  ]
})
export class AppModule {}
