import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { InsertDrugInput } from '../models';
import { Drug } from '../schema';
import { DrugService } from './drug.service';

@Controller()
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @Get()
  getHello(): string {
    return this.drugService.getHello();
  }

  @Get("drugs")
  async findDrugs(): Promise<Drug[]> {
    return this.drugService.findAll();
  }

  /**
     * Upsert an drug.
     * @param drug
     */
  @Post("drug")
  async createDrug(
    @Body() drug: InsertDrugInput,
  ): Promise<Drug> {
    return this.drugService.create(drug);
  }
}
