import { Expose, Type } from "class-transformer";
import { DrugCategory } from "../enum";

@Expose()
export class DrugDtoModel {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    producer: string;

    @Expose()
    quantity: number;

    @Expose()
    category: DrugCategory;
}
