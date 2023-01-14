import { IsEnum, IsNumber, IsString } from "class-validator";
import { DrugCategory } from "../enum";

export class InsertDrugInput {

    @IsString()
    name: string;

    @IsString()
    producer: string;

    @IsNumber()
    quantity: number;

    @IsEnum(DrugCategory)
    category: DrugCategory;
}
