import { DrugCategory, DrugDtoModel } from "../models";

export const DRUGS: DrugDtoModel[] = [
    {
        id: "Test-Id-1",
        producer: "Test Producer 1",
        name: "Paracetamol",
        quantity: 5,
        category: DrugCategory.PainKiller
    },
    {
        id: "Test-Id-2",
        producer: "Test Producer 2",
        name: "Fensic",
        quantity: 2,
        category: DrugCategory.Anaesthetics
    },
    {
        id: "Test-Id-3",
        producer: "Test Producer 3",
        name: "Tetracyclin",
        quantity: 5,
        category: DrugCategory.Antibacterial
    },
    {
        id: "Test-Id-4",
        producer: "Test Producer 1",
        name: "Paracetamol",
        quantity: 7,
        category: DrugCategory.PainKiller
    },
    {
        id: "Test-Id-5",
        producer: "Test Producer 2",
        name: "Paracetamol",
        quantity: 2,
        category: DrugCategory.PainKiller
    },
    {
        id: "Test-Id-6",
        producer: "Test Producer 3",
        name: "Tetracyclin",
        quantity: 7,
        category: DrugCategory.Antibacterial
    }
]
