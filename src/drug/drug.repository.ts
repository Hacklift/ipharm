import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Drug, DrugDocument } from "../schema";

@Injectable()
export class DrugRepository {
    constructor(@InjectModel(Drug.name) private drugModel: Model<DrugDocument>) {}

    async findOne(drugFilterQuery: FilterQuery<Drug>): Promise<Drug> {
        return this.drugModel.findOne(drugFilterQuery);
    }

    async find(drugFilterQuery: FilterQuery<Drug>): Promise<Drug[]> {
        return this.drugModel.find(drugFilterQuery)
    }

    async create(drug: Drug): Promise<Drug> {
        const newDrug = new this.drugModel(drug);
        return newDrug.save()
    }

    async findOneAndUpdate(drugFilterQuery: FilterQuery<Drug>, drug: Partial<Drug>): Promise<Drug> {
        return this.drugModel.findOneAndUpdate(drugFilterQuery, drug, { new: true });
    }
}
