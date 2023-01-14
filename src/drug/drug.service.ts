import { Injectable } from '@nestjs/common';
import { InsertDrugInput } from '../models';
import { Drug } from '../schema';
import { DrugRepository } from './drug.repository';

@Injectable()
export class DrugService {
  constructor(private readonly drugRepository: DrugRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createDrugInput: InsertDrugInput): Promise<Drug> {
    return this.drugRepository.create(createDrugInput);
  }

  async findAll(): Promise<Drug[]> {
    return this.drugRepository.find({});
  }
}
